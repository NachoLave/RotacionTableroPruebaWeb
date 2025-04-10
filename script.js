const LINKS = [
  "https://app.powerbi.com/view?r=eyJrIjoiYzEyMzQ1NjctZGVmZC00YWFiLTk0ZjktY2MzZTBiNzEyYzA2IiwidCI6Ijg2ZjJmMTgwLWRiZTMtNGY5NC05ZTIzLTliYmI4OWRkMWY2YiIsImMiOjR9", // ejemplo 1
  "https://app.powerbi.com/view?r=eyJrIjoiYmNiY2QwM2QtYjhkYS00ZGM4LWFkYzYtYzE1ODhkYjdmNjAzIiwidCI6Ijg2ZjJmMTgwLWRiZTMtNGY5NC05ZTIzLTliYmI4OWRkMWY2YiIsImMiOjR9", // ejemplo 2
  "https://app.powerbi.com/view?r=eyJrIjoiZjY1NTU2YjYtYzVmYy00ZTJlLWIxYWQtZTM1MzY1YjY2YTVkIiwidCI6Ijg2ZjJmMTgwLWRiZTMtNGY5NC05ZTIzLTliYmI4OWRkMWY2YiIsImMiOjR9"  // ejemplo 3
];


const ROTATION_INTERVAL = 20000; // 20 segundos
let index = 0;
let timer = null;
let remainingTime = ROTATION_INTERVAL;
let startTime = 0;
let paused = false;
let otherTab = null;

function openTablero(index) {
  const url = LINKS[index];
  if (!otherTab || otherTab.closed) {
    otherTab = window.open(url, '_blank');
  } else {
    otherTab.location.href = url;
  }
}

function rotate() {
  clearInterval(timer);
  index = (index + 1) % LINKS.length;
  openTablero(index);
  startCountdown();
}

function startCountdown() {
  paused = false;
  startTime = Date.now();
  timer = setInterval(() => {
    const elapsed = Date.now() - startTime;
    remainingTime = ROTATION_INTERVAL - elapsed;

    if (remainingTime <= 0) {
      rotate();
    } else {
      updateTimerDisplay();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const seconds = Math.floor(remainingTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const display = `${String(minutes).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  document.getElementById("timer").textContent = display;
}

function pause() {
  if (!paused) {
    clearInterval(timer);
    paused = true;
  }
}

function resume() {
  if (paused) {
    startCountdown();
  }
}

// === INICIO ===
openTablero(index);
startCountdown();
