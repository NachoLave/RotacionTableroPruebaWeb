const LINKS = [
  "https://app.powerbi.com/groups/647f43d9-54a1-47ee-9e78-604bb84ac9ff/reports/01661e10-0139-4bee-bf88-1b96ba9d7f2e/44f3f26abe0a6fb92b24?experience=power-bi&chromeless=true", //Empleados - Altas y bajas
        "https://app.powerbi.com/groups/647f43d9-54a1-47ee-9e78-604bb84ac9ff/reports/01661e10-0139-4bee-bf88-1b96ba9d7f2e/ReportSectionf9fe292b4b0b2244a793?experience=power-bi&chromeless=true", //Edad y Sexo
        "https://app.powerbi.com/groups/647f43d9-54a1-47ee-9e78-604bb84ac9ff/reports/01661e10-0139-4bee-bf88-1b96ba9d7f2e/ReportSection7b34db0f300b875c8c1b?experience=power-bi&chromeless=true", //Antiguedad
"https://app.powerbi.com/groups/647f43d9-54a1-47ee-9e78-604bb84ac9ff/reports/01661e10-0139-4bee-bf88-1b96ba9d7f2e/ReportSection1554dd7e053a66979e0b?experience=powerbi&chromeless=true", //empleados Dotacion
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
