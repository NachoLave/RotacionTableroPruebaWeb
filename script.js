const LINKS = [
  "https://app.powerbi.com/view?r=eyJrIjoiYzEyMzQ1NjctZGVmZC00YWFiLTk0ZjktY2MzZTBiNzEyYzA2IiwidCI6Ijg2ZjJmMTgwLWRiZTMtNGY5NC05ZTIzLTliYmI4OWRkMWY2YiIsImMiOjR9", // ejemplo 1
  "https://app.powerbi.com/view?r=eyJrIjoiYmNiY2QwM2QtYjhkYS00ZGM4LWFkYzYtYzE1ODhkYjdmNjAzIiwidCI6Ijg2ZjJmMTgwLWRiZTMtNGY5NC05ZTIzLTliYmI4OWRkMWY2YiIsImMiOjR9", // ejemplo 2
  "https://app.powerbi.com/view?r=eyJrIjoiZjY1NTU2YjYtYzVmYy00ZTJlLWIxYWQtZTM1MzY1YjY2YTVkIiwidCI6Ijg2ZjJmMTgwLWRiZTMtNGY5NC05ZTIzLTliYmI4OWRkMWY2YiIsImMiOjR9"  // ejemplo 3
];

const INTERVALO = 20000; // 20 segundos
let index = 0;
let timer = null;
let startTime = Date.now();
let timeLeft = INTERVALO;

const iframe = document.getElementById("tableroFrame");
const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

function cargarTablero() {
  iframe.src = LINKS[index];
  index = (index + 1) % LINKS.length;
  startTime = Date.now();
  timeLeft = INTERVALO;
}

function actualizarContador() {
  const elapsed = Date.now() - startTime;
  timeLeft = INTERVALO - elapsed;
  if (timeLeft <= 0) {
    cargarTablero();
  } else {
    const seg = Math.floor(timeLeft / 1000);
    const min = Math.floor(seg / 60);
    const segRestantes = seg % 60;
    timerDisplay.textContent = `${String(min).padStart(2, "0")}:${String(segRestantes).padStart(2, "0")}`;
  }
}

function iniciarRotacion() {
  if (timer) return;
  startTime = Date.now();
  timer = setInterval(actualizarContador, 500);
}

function detenerRotacion() {
  clearInterval(timer);
  timer = null;
}

startBtn.addEventListener("click", iniciarRotacion);
stopBtn.addEventListener("click", detenerRotacion);

cargarTablero();
iniciarRotacion();
