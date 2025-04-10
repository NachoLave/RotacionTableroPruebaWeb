const LINKS = [
  "https://app.powerbi.com/view?r=eyJrIjoiM2UyY2UwOTMtMjg4Yi00ODI1LWIxYmQtZmNkMzQ2ZDkwYmVhIiwidCI6IjhlMzQ0NGVmLWIzMzUtNDgxYS05OTVjLTZkOWMyMjEwMjhkOSJ9", // tablero embebido
  "https://app.powerbi.com/view?r=eyJrIjoiYTRjZThkMjctNzAzZi00ZTI3LTk0YTUtOGRhZjk4ZjAzZDIyIiwidCI6IjhlMzQ0NGVmLWIzMzUtNDgxYS05OTVjLTZkOWMyMjEwMjhkOSJ9"
];

const ROTATION_INTERVAL = 20000; // 20 segundos
const iframe = document.getElementById("iframeContainer");
const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

let index = 0;
let remainingTime = ROTATION_INTERVAL;
let timer = null;
let countdown = null;
let isPaused = false;

function updateTimerDisplay(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function startRotation() {
  if (timer) clearTimeout(timer);
  if (countdown) clearInterval(countdown);

  isPaused = false;
  updateTimerDisplay(remainingTime);

  countdown = setInterval(() => {
    if (!isPaused) {
      remainingTime -= 1000;
      if (remainingTime <= 0) remainingTime = 0;
      updateTimerDisplay(remainingTime);
    }
  }, 1000);

  timer = setTimeout(() => {
    index = (index + 1) % LINKS.length;
    iframe.src = LINKS[index];
    remainingTime = ROTATION_INTERVAL;
    startRotation(); // restart cycle
  }, remainingTime);
}

function stopRotation() {
  isPaused = true;
  clearTimeout(timer);
  clearInterval(countdown);
}

startBtn.onclick = () => {
  if (isPaused) {
    remainingTime = remainingTime || ROTATION_INTERVAL;
    startRotation();
  }
};

stopBtn.onclick = stopRotation;

// Comienza con el primer tablero
iframe.src = LINKS[index];
startRotation();
