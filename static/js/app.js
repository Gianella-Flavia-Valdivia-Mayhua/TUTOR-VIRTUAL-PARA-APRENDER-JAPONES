/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   NIHONGO TUTOR â€” LÃ³gica principal de la aplicaciÃ³n
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

// â”€â”€ Estado global â”€â”€
let STUDENT_NAME = "";
let currentQuiz  = 0;
let done         = JSON.parse(localStorage.getItem("nihongo_done_modules") || "{}");
let paperStream  = null;
let activeKanaIndex = 0;
let drawing        = false;
let currentStroke  = [];
let drawnStrokes   = [];
let overlayActive  = false;
let strokeAnimTimer = null;
let tutorRecorder = null;
let tutorChunks = [];
let tutorLastReply = "";
let tutorConversationMode = false;
let tutorRecordingTimer = null;

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// INICIO DE SESIÃ“N / MODAL
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function iniciarApp() {
  const name = document.getElementById("modal-name").value.trim();
  if (!name) { alert("Por favor ingresa tu nombre."); return; }
  STUDENT_NAME = name;
  localStorage.setItem("nihongo_student", name);
  document.getElementById("welcome-modal").classList.add("hidden");
  document.getElementById("student-name").value = name;
  const kataMeta = document.getElementById("katakana-meta-result");
  if (kataMeta) kataMeta.innerHTML = `ã‚ãŸã— ã¯ ${name} ã§ã™<br>ãƒšãƒ«ãƒ¼ã˜ã‚“ ã§ã™`;
  renderPhraseList();
}

window.addEventListener("DOMContentLoaded", () => {
  const savedName = localStorage.getItem("nihongo_student");
  if (savedName) {
    STUDENT_NAME = savedName;
    document.getElementById("welcome-modal").classList.add("hidden");
    document.getElementById("student-name").value = savedName;
  } else {
    if (savedName) document.getElementById("modal-name").value = savedName;
  }
  // Inicializar la app
  renderNav();
  renderPhraseList();
  renderQuiz();
  renderSpeechTargets();
  setupDrawingCanvas();
  renderKana();
  convertRomaji();
});

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SÃNTESIS DE VOZ
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function speak(text, lang = "ja-JP") {
  if (!("speechSynthesis" in window)) {
    alert("Tu navegador no tiene lectura por voz.");
    return;
  }
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang  = lang;
  utterance.rate  = 0.78;
  utterance.pitch = 1;
  speechSynthesis.speak(utterance);
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// NAVEGACIÃ“N Y PROGRESO
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function renderNav() {
  const nav = document.getElementById("nav");
  nav.innerHTML = modules.map(([id, label], index) => `
    <button class="nav-btn ${index === 0 ? "active" : ""} ${done[id] ? "done" : ""}" onclick="showModule('${id}')">
      <span class="num">${done[id] ? "OK" : index + 1}</span>
      <span>${label}</span>
    </button>
  `).join("");
  updateProgress();
}

function showModule(id) {
  document.querySelectorAll("section").forEach(s => s.classList.toggle("active", s.id === id));
  document.querySelectorAll(".nav-btn").forEach((btn, i) => {
    btn.classList.toggle("active", modules[i][0] === id);
  });
  done[id] = true;
  localStorage.setItem("nihongo_done_modules", JSON.stringify(done));
  renderNav();
}

function updateProgress() {
  const total = modules.length;
  const count = modules.filter(([id]) => done[id]).length;
  document.getElementById("progress-pill").textContent = `${count} de ${total} modulos`;
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// MÃ“DULO 1 â€” PRESENTACIÃ“N
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function renderPhraseList() {
  document.getElementById("presentation-list").innerHTML = phrases.map(p => phraseCard(p)).join("");
  document.getElementById("greetings-list").innerHTML = greetings.map(g => phraseCard({
    jp: g[0], romaji: g[1], es: g[2], speak: g[0], parts: [g[3]]
  })).join("");
}

function phraseCard(p) {
  return `
    <div class="phrase">
      <div>
        <div class="jp">${p.jp}</div>
        <div class="romaji">${p.romaji}</div>
        <div class="es">${p.es}</div>
        <div class="breakdown">${p.parts.map(part => `<span class="chip">${part}</span>`).join("")}</div>
      </div>
      <button class="listen-btn" onclick="speak('${p.speak.replaceAll("'", "\\'")}')">Escuchar</button>
    </div>
  `;
}

function buildIntro() {
  const name        = document.getElementById("student-name").value.trim() || STUDENT_NAME || "ãŒãã›ã„";
  const nationality = document.getElementById("nationality").value;
  const text        = `Hajimemashite. Watashi wa ${name} desu. ${nationality} desu. Douzo yoroshiku onegaishimasu.`;
  const kanaText    = `わたし は  ${name} です。${nationality} です。どうぞ よろしく お願いします。`;
  document.getElementById("intro-output").innerHTML = `
    <strong>Romaji:</strong><br>${text}<br><br>
    <strong>Idea:</strong><br>Mucho gusto. Yo soy ${name}. Soy ${nationality}. Encantado de conocerlo.
  `;
  speak(kanaText);
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// MÃ“DULO 2 â€” QUIZ
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function renderQuiz() {
  const item = quizItems[currentQuiz % quizItems.length];
  document.getElementById("quiz-question").textContent = item.q;
  document.getElementById("quiz-options").innerHTML = item.options.map(opt =>
    `<button class="mini-btn" onclick="checkQuiz('${opt}')">${opt}</button>`
  ).join("");
}

function checkQuiz(answer) {
  const item = quizItems[currentQuiz % quizItems.length];
  const ok   = answer === item.a;
  document.getElementById("quiz-result").textContent = ok
    ? `Correcto: ${answer}.`
    : `Casi. Para esta situacion conviene decir: ${item.a}.`;
  if (ok) {
    currentQuiz += 1;
    setTimeout(renderQuiz, 850);
  }
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// MÃ“DULO 3 â€” PRONUNCIACIÃ“N
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function renderSpeechTargets() {
  const select = document.getElementById("speech-target");
  const all    = phrases.map(p => [p.romaji, p.speak]).concat(greetings.map(g => [g[1], g[0]]));
  select.innerHTML = all.map(([romaji, jp]) => `<option value="${jp}">${romaji}</option>`).join("");
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  document.getElementById("speech-support").textContent = Recognition
    ? "Reconocimiento de voz disponible en este navegador."
    : "Reconocimiento de voz no disponible aqui. Aun puedes usar Escuchar.";
}

function speakSelected() {
  speak(document.getElementById("speech-target").value);
}

function startRecognition() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) {
    document.getElementById("speech-result").textContent = "Este navegador no permite reconocimiento de voz desde esta pagina.";
    return;
  }
  const recog = new Recognition();
  recog.lang            = "ja-JP";
  recog.interimResults  = false;
  recog.maxAlternatives = 3;
  document.getElementById("speech-result").textContent = "Escuchando...";
  recog.onresult = (event) => {
    const heard = Array.from(event.results[0]).map(r => r.transcript).join(" / ");
    document.getElementById("speech-result").textContent = `El navegador entendio: ${heard}`;
  };
  recog.onerror = (event) => {
    document.getElementById("speech-result").textContent = `No se pudo reconocer la voz: ${event.error}`;
  };
  recog.start();
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// MÃ“DULO 4 â€” HIRAGANA
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function renderKana() {
  document.getElementById("kana-sequence").innerHTML = kana.map((k, index) => `
    <button class="seq-chip ${index === activeKanaIndex ? "active" : ""}" onclick="selectKana(${index})">${k.h}<br>${k.r}</button>
  `).join("");

  document.getElementById("hiragana-grid").innerHTML = kana.map(k => `
    <div class="kana-card">
      <div class="kana-char">${k.h}</div>
      <div class="romaji">${k.r}</div>
      <div class="memo">${k.memo}</div>
      <div class="example">${k.ex}</div>
      <button class="mini-btn" onclick="speak('${k.h}')">Escuchar</button>
    </div>
  `).join("");

  document.getElementById("katakana-table").innerHTML = kata.map(row => `
    <tr>
      <td>${row[0]}</td>
      <td class="large-kana">${row[1]}</td>
      <td class="large-kana">${row[2]}</td>
      <td>${row[3]}</td>
    </tr>
  `).join("");

  renderActiveKana();
}

function renderActiveKana() {
  const k = kana[activeKanaIndex];
  document.getElementById("active-kana").textContent    = k.h;
  document.getElementById("ghost-kana").textContent     = k.h;
  document.getElementById("active-romaji").textContent  = k.r;
  document.getElementById("active-memo").textContent    = k.memo;
  document.getElementById("active-example").textContent = k.ex;
  document.getElementById("paper-target").textContent   = k.h;
  document.getElementById("paper-romaji").textContent   = k.r;
  document.getElementById("stroke-list").innerHTML = k.strokes.map((s, i) =>
    `<div class="stroke-step">${i + 1}. ${s}</div>`
  ).join("");
  document.querySelectorAll(".seq-chip").forEach((btn, index) => {
    btn.classList.toggle("active", index === activeKanaIndex);
  });
  // Reiniciar video si estaba mostrando captura
  const video  = document.getElementById("paper-video");
  const canvas = document.getElementById("paper-canvas");
  if (canvas.style.display === "block") {
    canvas.style.display = "none";
    video.style.display  = "block";
  }
  document.getElementById("paper-result").textContent = "Escribe en papel, enciende la cÃ¡mara y presiona Capturar.";
  clearDrawing();
  renderStrokeSVG(k.h);
  if (overlayActive) updateOverlay();
  // Botones de animaciÃ³n
  const animRow = document.getElementById("anim-btns-row");
  if (animRow) {
    animRow.innerHTML = `
      <button class="anim-btn" onclick="animateStrokes('${k.h}')">â–¶ Ver animaciÃ³n de trazos</button>
      <button class="anim-btn" onclick="renderStrokeSVG('${k.h}')">â†º Mostrar guÃ­a</button>`;
  }
}

function selectKana(index) {
  activeKanaIndex = index;
  renderActiveKana();
}

function nextKana() {
  activeKanaIndex = (activeKanaIndex + 1) % kana.length;
  renderActiveKana();
}

function speakActiveKana() {
  speak(kana[activeKanaIndex].h);
}

function convertRomaji() {
  let text = document.getElementById("romaji-input").value;
  const sorted = [...romajiMap].sort((a, b) => b[0].length - a[0].length);
  for (const [from, to] of sorted) {
    const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    text = text.replace(new RegExp(`\\b${escaped}\\b`, "gi"), to);
  }
  document.getElementById("hiragana-output").textContent = text;
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SVG STROKE GUIDES â€” animaciÃ³n de trazos
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

async function renderStrokeSVG(char) {
  const container = document.querySelector(".draw-wrap");
  if (!container) return;
  const old = container.querySelector(".stroke-guide-svg");
  if (old) old.remove();

  const res  = await fetch(`/api/strokes/${encodeURIComponent(char)}`);
  if (!res.ok) return;
  const data = await res.json();

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 109 109");   // KanjiVG usa 109x109
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  svg.classList.add("stroke-guide-svg");

  data.strokes.forEach((d, i) => {
    const m = d.match(/M([\d.]+),([\d.]+)/);
    if (m) {
      const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
      t.setAttribute("x", parseFloat(m[1]) - 6);
      t.setAttribute("y", parseFloat(m[2]) - 3);
      t.setAttribute("fill", data.colors[i]);
      t.setAttribute("opacity", "0.75");
      t.setAttribute("font-size", "9");
      t.setAttribute("font-weight", "bold");
      t.textContent = i + 1;
      svg.appendChild(t);
    }
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    path.setAttribute("stroke", data.colors[i]);
    path.setAttribute("stroke-width", "3.5");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("opacity", "0.6");
    path.classList.add("stroke-path");
    svg.appendChild(path);
  });

  container.insertBefore(svg, container.firstChild);
}


function animateStrokes(char) {
  const svg = document.querySelector(".stroke-guide-svg");
  if (!svg) { renderStrokeSVG(char).then(() => animateStrokes(char)); return; }
  const paths = svg.querySelectorAll(".stroke-path");
  paths.forEach(p => p.classList.remove("animate"));
  clearTimeout(strokeAnimTimer);
  paths.forEach((p, i) => {
    strokeAnimTimer = setTimeout(() => {
      p.style.opacity = "0.95";
      p.classList.add("animate");
    }, i * 1400);
  });
}
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// MODO SUPERPOSICIÃ“N â€” video en vivo + guÃ­a encima
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function toggleOverlay() {
  overlayActive = !overlayActive;
  const wrap = document.getElementById("video-wrap");
  const btn  = document.getElementById("overlay-toggle-btn");
  wrap.classList.toggle("overlay-mode", overlayActive);
  btn.classList.toggle("active", overlayActive);
  btn.textContent = overlayActive ? "âœ… GuÃ­a superpuesta activa" : "ðŸ”² Superponer guÃ­a al video";
  if (overlayActive) updateOverlay();
}

function updateOverlay() {
  const k = kana[activeKanaIndex];
  document.getElementById("overlay-char-guide").textContent = k.h;
  const svgEl = document.getElementById("overlay-svg-guide");
  svgEl.innerHTML = "";
  const data = STROKE_SVG[k.h];
  if (!data) return;
  data.strokes.forEach((s, i) => {
    const m = s.d.match(/M([\d.]+),([\d.]+)/);
    if (m) {
      const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
      t.setAttribute("x", parseFloat(m[1]) - 7);
      t.setAttribute("y", parseFloat(m[2]) - 4);
      t.setAttribute("fill", s.color);
      t.setAttribute("font-size", "8");
      t.setAttribute("font-weight", "bold");
      t.setAttribute("opacity", "0.95");
      t.textContent = i + 1;
      svgEl.appendChild(t);
    }
    const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttribute("d", s.d);
    p.setAttribute("stroke", s.color);
    p.setAttribute("stroke-width", "3.5");
    p.setAttribute("fill", "none");
    p.setAttribute("stroke-linecap", "round");
    p.setAttribute("stroke-linejoin", "round");
    p.setAttribute("opacity", "0.82");
    svgEl.appendChild(p);
  });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// CANVAS DE DIBUJO
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function setupDrawingCanvas() {
  const canvas = document.getElementById("draw-canvas");
  if (!canvas) return;
  const resize = () => {
    const rect    = canvas.getBoundingClientRect();
    canvas.width  = Math.max(320, Math.floor(rect.width));
    canvas.height = 320;
    redrawCanvas();
  };
  resize();
  window.addEventListener("resize", resize);
  canvas.addEventListener("pointerdown", startDraw);
  canvas.addEventListener("pointermove", moveDraw);
  canvas.addEventListener("pointerup",   endDraw);
  canvas.addEventListener("pointerleave", endDraw);
}

function pointFromEvent(event) {
  const canvas = document.getElementById("draw-canvas");
  const rect   = canvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * (canvas.width  / rect.width),
    y: (event.clientY - rect.top)  * (canvas.height / rect.height)
  };
}

function startDraw(event) {
  event.preventDefault();
  drawing       = true;
  currentStroke = [pointFromEvent(event)];
}

function moveDraw(event) {
  if (!drawing) return;
  event.preventDefault();
  currentStroke.push(pointFromEvent(event));
  redrawCanvas();
}

function endDraw() {
  if (!drawing) return;
  drawing = false;
  if (currentStroke.length > 2) drawnStrokes.push(currentStroke);
  currentStroke = [];
  redrawCanvas();
}

function redrawCanvas() {
  const canvas = document.getElementById("draw-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const all = currentStroke.length ? drawnStrokes.concat([currentStroke]) : drawnStrokes;
  all.forEach((stroke, index) => {
    if (stroke.length < 2) return;
    ctx.beginPath();
    ctx.lineWidth   = 9;
    ctx.lineCap     = "round";
    ctx.lineJoin    = "round";
    ctx.strokeStyle = index === 0 ? "#00f5d4"
                    : index === 1 ? "#ffd166"
                    : index === 2 ? "#ff4fd8"
                    : "#5d8cff";
    ctx.moveTo(stroke[0].x, stroke[0].y);
    for (const p of stroke.slice(1)) ctx.lineTo(p.x, p.y);
    ctx.stroke();
  });
}

function clearDrawing() {
  drawnStrokes  = [];
  currentStroke = [];
  const result = document.getElementById("draw-result");
  if (result) result.textContent = "Dibuja encima de la silueta. La app registra cada trazo.";
  redrawCanvas();
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// CÃMARA â€” PAPEL
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

async function startPaperCamera() {
  const status = document.getElementById("paper-status");
  try {
    paperStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } }
    });
    document.getElementById("paper-video").srcObject  = paperStream;
    document.getElementById("paper-video").style.display  = "block";
    document.getElementById("paper-canvas").style.display = "none";
    status.textContent = "ðŸ“· camara encendida";
    status.classList.add("status-ok");
    if (!overlayActive) toggleOverlay();
  } catch {
    try {
      paperStream = await navigator.mediaDevices.getUserMedia({ video: true });
      document.getElementById("paper-video").srcObject  = paperStream;
      document.getElementById("paper-video").style.display  = "block";
      document.getElementById("paper-canvas").style.display = "none";
      status.textContent = "ðŸ“· camara encendida";
      status.classList.add("status-ok");
    } catch {
      status.textContent = "sin acceso a camara";
      document.getElementById("paper-result").textContent =
        "No pude abrir la camara. En celular suele funcionar mejor desde Chrome y con permisos activados.";
    }
  }
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// EVALUACION LOCAL CON OLLAMA VISION - LIENZO DIGITAL
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

async function checkDrawing() {
  const k        = kana[activeKanaIndex];
  const expected = k.strokes.length;
  const got      = drawnStrokes.length;
  const resultEl = document.getElementById("draw-result");

  if (got === 0) { resultEl.textContent = "Dibuja la letra primero."; return; }

  let countMsg = got === expected
    ? `âœ“ Cantidad correcta: ${got} trazo(s).`
    : got < expected
      ? `âš  Faltan trazos: hiciste ${got}, ${k.h} necesita ${expected}.`
      : `âš  Trazos de mÃ¡s: hiciste ${got}, ${k.h} necesita ${expected}.`;

  resultEl.innerHTML = `<span class="eval-loading">${countMsg} Analizando el lienzo con llava-phi3...</span>`;
  const image = document.getElementById("draw-canvas").toDataURL("image/png");

  try {
    const localScore = await scoreDrawingSimilarity(k.h);
    if (localScore.score < 6.5) {
      const txt = [
        "RESULTADO: INCORRECTO",
        `PUNTUACION: ${Math.max(1, Math.round(localScore.score))}`,
        "ORDEN: Revisa la cantidad y ubicacion de los trazos.",
        `DIRECCION: La forma esta lejos de la guia de ${k.h}.`,
        `CONSEJO: Dibuja mas cerca de la silueta. Diferencia estimada: ${localScore.distance.toFixed(2)}.`,
        `EJEMPLO_JP: ${k.h}`,
        `EJEMPLO_RM: ${k.r}`,
        "EJEMPLO_ES: caracter practicado"
      ].join("\n");
      mostrarEvalDigital(txt, got, expected);
      showVisionText(txt);
      return;
    }
    const txt = await askVisionTutor(image, k.h);
    mostrarEvalDigital(txt, got, expected);
    showVisionText(txt);
  } catch(e) {
    resultEl.textContent = countMsg + " | Error con Ollama Vision: " + e.message;
  }
}

function mostrarEvalDigital(txt, got, expected) {
  const el    = document.getElementById("draw-result");
  const r     = parsearRespuesta(txt);
  const marca = r.correcto ? "âœ…" : "âŒ";
  el.innerHTML = `
    <div class="${r.correcto ? 'eval-ok' : 'eval-fail'}">${marca} <strong>${r.correcto ? "Trazos correctos" : "Revisar trazos"}</strong></div>
    <div class="eval-score">Puntaje: ${r.puntuacion}/10 Â· ${got}/${expected} trazos</div>
    <div class="stroke-order-feedback">
      <b>Orden:</b> ${r.orden || "â€”"}<br>
      <b>DirecciÃ³n:</b> ${r.direccion || "â€”"}<br>
      <b>Consejo:</b> ${r.consejo || "â€”"}
    </div>
    <div class="example-3line">
      <div class="jp">${r.ejJp}</div>
      <div class="rm">${r.ejRm}</div>
      <div class="es">${r.ejEs}</div>
    </div>`;
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// EVALUACION LOCAL CON OLLAMA VISION - CAMARA
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

async function capturePaper() {
  const video  = document.getElementById("paper-video");
  const canvas = document.getElementById("paper-canvas");
  const result = document.getElementById("paper-result");
  if (!video.srcObject) { result.textContent = "Primero enciende la cÃ¡mara."; return; }

  canvas.width  = video.videoWidth  || 640;
  canvas.height = video.videoHeight || 480;
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  canvas.style.display = "block";
  video.style.display  = "none";

  const k = kana[activeKanaIndex];
  result.innerHTML = `<span class="eval-loading">Analizando tu trazo en papel con llava-phi3...</span>`;

  try {
    const txt = await askVisionTutor(canvas.toDataURL("image/jpeg", 0.82), k.h);
    mostrarEvalCamara(txt);
    showVisionText(txt);
  } catch(e) {
    result.textContent = "Error con Ollama Vision: " + e.message;
  }
}

function mostrarEvalCamara(txt) {
  const el    = document.getElementById("paper-result");
  const r     = parsearRespuesta(txt);
  const marca = r.correcto ? "âœ…" : "âŒ";
  el.innerHTML = `
    <div class="${r.correcto ? 'eval-ok' : 'eval-fail'}">${marca} <strong>${r.evaluacion}</strong></div>
    <div class="eval-score">Puntaje: ${r.puntuacion}/10</div>
    <div class="stroke-order-feedback">${r.consejo || r.correccion || "â€”"}</div>
    <div class="example-3line">
      <div class="jp">${r.ejJp}</div>
      <div class="rm">${r.ejRm}</div>
      <div class="es">${r.ejEs}</div>
    </div>`;
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// PARSER DE RESPUESTA DE IA
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

// Tutor lateral: chat, voz local y vision con Ollama

function setTutorTab(tab) {
  document.querySelectorAll(".tutor-tab").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tab);
  });
  document.querySelectorAll(".tutor-pane").forEach(pane => {
    pane.classList.toggle("active", pane.id === `tutor-${tab}-pane`);
  });
}

function setTutorStatus(text) {
  const el = document.getElementById("tutor-status");
  if (el) el.textContent = text;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function addTutorMessage(role, text) {
  const log = document.getElementById("tutor-chat-log");
  if (!log) return;
  const msg = document.createElement("div");
  msg.className = `chat-msg ${role}`;
  msg.innerHTML = `<strong>${role === "user" ? "Tu" : "Sensei-AI"}</strong><span>${escapeHtml(text)}</span>`;
  log.appendChild(msg);
  log.scrollTop = log.scrollHeight;
}

async function readJsonResponse(resp) {
  const text = await resp.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(text.startsWith("<")
      ? "El servidor devolvio HTML. Revisa la consola Flask; normalmente falta Whisper, ffmpeg u Ollama."
      : text);
  }
}

function normalizePoints(points) {
  if (!points.length) return [];
  const xs = points.map(p => p.x);
  const ys = points.map(p => p.y);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const w = Math.max(1, maxX - minX);
  const h = Math.max(1, maxY - minY);
  return points.map(p => ({x: (p.x - minX) / w, y: (p.y - minY) / h}));
}

function nearestDistance(point, points) {
  let best = Infinity;
  for (const p of points) {
    const d = Math.hypot(point.x - p.x, point.y - p.y);
    if (d < best) best = d;
  }
  return best;
}

async function scoreDrawingSimilarity(char) {
  const res = await fetch(`/api/strokes/${encodeURIComponent(char)}`);
  const data = await readJsonResponse(res);
  const guide = normalizePoints((data.points || []).flat().map(([x, y]) => ({x, y})));
  const drawn = normalizePoints(drawnStrokes.flat().map(p => ({x: p.x, y: p.y})));

  if (!guide.length || !drawn.length) return {score: 1, distance: 1};

  const sample = drawn.filter((_, i) => i % Math.max(1, Math.floor(drawn.length / 80)) === 0);
  const avgDistance = sample.reduce((sum, p) => sum + nearestDistance(p, guide), 0) / sample.length;
  const strokePenalty = Math.abs(drawnStrokes.length - (data.points || []).length) * 0.9;
  const score = Math.max(1, Math.min(10, 10 - avgDistance * 18 - strokePenalty));
  return {score, distance: avgDistance};
}

async function sendTutorMessage(messageOverride) {
  const input = document.getElementById("tutor-input");
  const message = (messageOverride || input?.value || "").trim();
  if (!message) return;
  if (input) input.value = "";
  addTutorMessage("user", message);
  setTutorStatus("Pensando con gemma3:1b...");

  try {
    const resp = await fetch("/api/tutor/chat", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({message})
    });
    const data = await readJsonResponse(resp);
    if (!resp.ok) throw new Error(data.error || "No se pudo consultar al tutor.");
    tutorLastReply = data.reply || "";
    addTutorMessage("ai", tutorLastReply);
    setTutorStatus(`Respuesta generada con ${data.model}.`);
    return tutorLastReply;
  } catch(e) {
    setTutorStatus("Error en el tutor de texto.");
    addTutorMessage("ai", e.message);
    return "";
  }
}

async function toggleTutorRecording() {
  const btn = document.getElementById("voice-record-btn");
  const result = document.getElementById("voice-result");

  if (tutorRecorder && tutorRecorder.state === "recording") {
    clearTimeout(tutorRecordingTimer);
    tutorRecorder.stop();
    if (btn) btn.textContent = "Grabar";
    setTutorStatus("Procesando audio con Whisper...");
    return;
  }

  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    if (result) result.textContent = "Tu navegador no permite grabar audio desde esta pagina.";
    return;
  }

  const stream = await navigator.mediaDevices.getUserMedia({audio: true});
  tutorChunks = [];
  tutorRecorder = new MediaRecorder(stream);
  tutorRecorder.ondataavailable = event => {
    if (event.data.size > 0) tutorChunks.push(event.data);
  };
  tutorRecorder.onstop = () => sendTutorAudio(stream);
  tutorRecorder.start();
  if (tutorConversationMode) {
    tutorRecordingTimer = setTimeout(() => {
      if (tutorRecorder?.state === "recording") tutorRecorder.stop();
    }, 6500);
  }
  if (btn) btn.textContent = "Detener";
  if (result) result.textContent = "Escuchando...";
  setTutorStatus("Escuchando tu voz...");
}

async function sendTutorAudio(stream) {
  stream.getTracks().forEach(track => track.stop());
  const result = document.getElementById("voice-result");
  const blob = new Blob(tutorChunks, {type: tutorChunks[0]?.type || "audio/webm"});
  const form = new FormData();
  form.append("audio", blob, "voz.webm");

  try {
    const resp = await fetch("/api/tutor/voice", {method: "POST", body: form});
    const data = await readJsonResponse(resp);
    if (!resp.ok) throw new Error(data.error || "No se pudo transcribir.");
    const text = data.text || "";
    if (result) result.textContent = text ? `Whisper entendio: ${text}` : "Whisper no detecto texto claro.";
    setTutorStatus(`Audio transcrito con Whisper ${data.model}.`);
    if (text) {
      setTutorTab("chat");
      const reply = await sendTutorMessage(`Responde como tutor de japones a esta frase que dije: ${text}`);
      if (tutorConversationMode && reply) {
        speak(reply, /[\u3040-\u30ff\u3400-\u9fff]/.test(reply) ? "ja-JP" : "es-ES");
        setTimeout(() => {
          if (tutorConversationMode) toggleTutorRecording();
        }, 1800);
      }
    } else if (tutorConversationMode) {
      setTimeout(() => toggleTutorRecording(), 900);
    }
  } catch(e) {
    if (result) result.textContent = e.message;
    setTutorStatus("Error procesando audio.");
    tutorConversationMode = false;
    updateConversationButton();
  }
}

function updateConversationButton() {
  const btn = document.getElementById("voice-conversation-btn");
  if (btn) btn.textContent = tutorConversationMode ? "Pausar conversacion" : "Conversacion continua";
}

async function toggleTutorConversation() {
  tutorConversationMode = !tutorConversationMode;
  updateConversationButton();
  if (tutorConversationMode) {
    setTutorTab("voice");
    setTutorStatus("Modo conversacion: escucha por turnos cortos.");
    if (!tutorRecorder || tutorRecorder.state !== "recording") await toggleTutorRecording();
  } else {
    clearTimeout(tutorRecordingTimer);
    if (tutorRecorder?.state === "recording") tutorRecorder.stop();
    setTutorStatus("Conversacion pausada.");
  }
}

function speakTutorLast() {
  if (!tutorLastReply) {
    setTutorStatus("Aun no hay respuesta del tutor para escuchar.");
    return;
  }
  const hasJapanese = /[\u3040-\u30ff\u3400-\u9fff]/.test(tutorLastReply);
  speak(tutorLastReply, hasJapanese ? "ja-JP" : "es-ES");
}

async function askVisionTutor(image, target) {
  setTutorStatus("Analizando imagen con llava-phi3...");
  const resp = await fetch("/api/tutor/vision", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({image, target})
  });
  const data = await readJsonResponse(resp);
  if (!resp.ok) throw new Error(data.error || "No se pudo analizar la imagen.");
  setTutorStatus(`Vision generada con ${data.model}.`);
  return data.reply || "";
}

function showVisionText(text) {
  const el = document.getElementById("vision-result");
  if (el) el.textContent = text || "Sin respuesta visual.";
}

async function analyzeCanvasWithTutor() {
  const canvas = document.getElementById("draw-canvas");
  const k = kana[activeKanaIndex];
  if (!canvas) return;
  setTutorTab("vision");
  try {
    const txt = await askVisionTutor(canvas.toDataURL("image/png"), k.h);
    showVisionText(txt);
  } catch(e) {
    showVisionText(e.message);
  }
}

async function analyzePaperWithTutor() {
  const canvas = document.getElementById("paper-canvas");
  const k = kana[activeKanaIndex];
  if (!canvas || canvas.style.display !== "block") {
    showVisionText("Primero captura una foto del papel.");
    return;
  }
  setTutorTab("vision");
  try {
    const txt = await askVisionTutor(canvas.toDataURL("image/jpeg", 0.82), k.h);
    showVisionText(txt);
  } catch(e) {
    showVisionText(e.message);
  }
}

function parsearRespuesta(txt) {
  const r = {
    correcto: false, puntuacion: 5, evaluacion: "", correccion: "",
    orden: "", direccion: "", consejo: "", ejJp: "", ejRm: "", ejEs: ""
  };
  for (const ln of txt.split("\n")) {
    const l = ln.trim();
    if (l.startsWith("RESULTADO:")) {
      const value = l.replace("RESULTADO:", "").trim().toUpperCase();
      r.correcto = value === "CORRECTO";
    }
    if (l.startsWith("PUNTUACION:")) { try { r.puntuacion = parseInt(l.replace(/\D/g, "")) || 5; } catch {} }
    if (l.startsWith("EVALUACION:")) r.evaluacion = l.replace("EVALUACION:", "").trim();
    if (l.startsWith("CORRECCION:")) r.correccion = l.replace("CORRECCION:", "").trim();
    if (l.startsWith("ORDEN:"))      r.orden      = l.replace("ORDEN:",      "").trim();
    if (l.startsWith("DIRECCION:"))  r.direccion  = l.replace("DIRECCION:",  "").trim();
    if (l.startsWith("CONSEJO:"))    r.consejo    = l.replace("CONSEJO:",    "").trim();
    if (l.startsWith("EJEMPLO_JP:")) r.ejJp       = l.replace("EJEMPLO_JP:", "").trim();
    if (l.startsWith("EJEMPLO_RM:")) r.ejRm       = l.replace("EJEMPLO_RM:", "").trim();
    if (l.startsWith("EJEMPLO_ES:")) r.ejEs       = l.replace("EJEMPLO_ES:", "").trim();
  }
  if (r.puntuacion < 8) r.correcto = false;
  return r;
}
