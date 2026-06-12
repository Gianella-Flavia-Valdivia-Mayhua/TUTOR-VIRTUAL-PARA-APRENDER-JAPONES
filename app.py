from flask import Flask, render_template
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kanjivg_data import get_strokes
from flask import jsonify

























app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/strokes/<char>")
def strokes(char):
    data = get_strokes(char)
    if not data:
        return jsonify({"error": "not found"}), 404
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)

