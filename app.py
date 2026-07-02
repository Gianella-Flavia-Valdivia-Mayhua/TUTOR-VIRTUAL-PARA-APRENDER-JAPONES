import json
import os
import sys
import tempfile
import urllib.error
import urllib.request

from flask import Flask, jsonify, render_template, request

sys.path.insert(0, os.path.dirname(__file__))
from kanjivg_data import get_strokes


app = Flask(__name__)

OLLAMA_URL = os.environ.get("OLLAMA_URL", "http://localhost:11434")
TEXT_MODEL = os.environ.get("OLLAMA_TEXT_MODEL", "gemma3:1b")
VISION_MODEL = os.environ.get("OLLAMA_VISION_MODEL", "llava-phi3")
WHISPER_MODEL = os.environ.get("WHISPER_MODEL", "base")
_whisper_model = None


@app.errorhandler(Exception)
def json_error(error):
    if request.path.startswith("/api/"):
        return jsonify({"error": str(error)}), 500
    raise error


def ollama_chat(model, messages, images=None):
    payload_messages = list(messages)
    if images:
        payload_messages[-1] = dict(payload_messages[-1])
        payload_messages[-1]["images"] = images

    data = json.dumps({
        "model": model,
        "stream": False,
        "messages": payload_messages,
    }).encode("utf-8")

    req = urllib.request.Request(
        f"{OLLAMA_URL}/api/chat",
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            body = json.loads(resp.read().decode("utf-8"))
            return body.get("message", {}).get("content", "").strip()
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="ignore")
        raise RuntimeError(f"Ollama HTTP {exc.code}: {detail}") from exc
    except urllib.error.URLError as exc:
        raise RuntimeError("No pude conectar con Ollama. Abre Ollama y verifica el modelo local.") from exc


def get_whisper_model():
    global _whisper_model
    if _whisper_model is None:
        try:
            import imageio_ffmpeg
            ffmpeg_dir = os.path.dirname(imageio_ffmpeg.get_ffmpeg_exe())
            os.environ["PATH"] = ffmpeg_dir + os.pathsep + os.environ.get("PATH", "")
        except Exception:
            pass
        import whisper
        _whisper_model = whisper.load_model(WHISPER_MODEL)
    return _whisper_model


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/strokes/<char>")
def strokes(char):
    data = get_strokes(char)
    if not data:
        return jsonify({"error": "not found"}), 404
    return jsonify(data)


@app.route("/api/tutor/chat", methods=["POST"])
def tutor_chat():
    data = request.get_json(force=True) or {}
    user_message = (data.get("message") or "").strip()
    if not user_message:
        return jsonify({"error": "message required"}), 400

    system = (
        "Eres Sensei-AI, tutor de japones para hispanohablantes principiantes. "
        "Responde breve, claro y amable. Usa espanol para explicar, japones para practicar, "
        "romaji cuando ayude, y termina con una pregunta corta para mantener conversacion bidireccional. "
        "No uses emojis ni describas emociones entre palabras como sonrisa, sudor frio, guiño o risa."
    )
    answer = ollama_chat(TEXT_MODEL, [
        {"role": "system", "content": system},
        {"role": "user", "content": user_message},
    ])
    return jsonify({"reply": answer, "model": TEXT_MODEL})


@app.route("/api/tutor/vision", methods=["POST"])
def tutor_vision():
    data = request.get_json(force=True) or {}
    image = data.get("image") or ""
    target = data.get("target") or ""
    if "," in image:
        image = image.split(",", 1)[1]
    if not image:
        return jsonify({"error": "image required"}), 400

    prompt = (
        f"El estudiante intento escribir el hiragana {target}. "
        "Evalua con criterio estricto: si la imagen esta borrosa, vacia, incompleta, tiene otro caracter, "
        "o no se parece claramente al objetivo, marca INCORRECTO. No seas generoso. "
        "Compara forma general, proporcion, ubicacion de trazos y cierre de curvas. "
        "Responde exactamente con:\n"
        "RESULTADO: CORRECTO o INCORRECTO\n"
        "PUNTUACION: 1-10\n"
        "EVALUACION: una linea sobre la forma\n"
        "CORRECCION: consejo concreto en espanol\n"
        "EJEMPLO_JP: frase corta con el caracter\n"
        "EJEMPLO_RM: romaji\n"
        "EJEMPLO_ES: traduccion"
    )
    answer = ollama_chat(VISION_MODEL, [{"role": "user", "content": prompt}], images=[image])
    return jsonify({"reply": answer, "model": VISION_MODEL})


@app.route("/api/tutor/voice", methods=["POST"])
def tutor_voice():
    if "audio" not in request.files:
        return jsonify({"error": "audio required"}), 400

    audio = request.files["audio"]
    suffix = os.path.splitext(audio.filename or "voice.webm")[1] or ".webm"
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        audio.save(tmp.name)
        tmp_path = tmp.name

    try:
        result = get_whisper_model().transcribe(
            tmp_path,
            language=None,
            task="transcribe",
            fp16=False,
        )
        return jsonify({
            "text": (result.get("text") or "").strip(),
            "language": result.get("language"),
            "model": WHISPER_MODEL,
        })
    except ModuleNotFoundError:
        return jsonify({
            "error": "Whisper no esta instalado en este Python. Ejecuta: python -m pip install openai-whisper",
        }), 500
    except Exception as exc:
        return jsonify({
            "error": f"No pude transcribir con Whisper: {exc}. Verifica ffmpeg y el modelo local.",
        }), 500
    finally:
        try:
            os.remove(tmp_path)
        except OSError:
            pass


if __name__ == "__main__":
    app.run(debug=True)
