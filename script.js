const LINKS = [
  "https://app.powerbi.com/groups/me/reports/7e9d3785-efd4-4ba6-86b2-e6890eaf9efc/ReportSection020b3c6bb1de02141e39?chromeless=true&experience=power-bi",
  "https://app.powerbi.com/groups/me/reports/82b9efd6-ed22-472f-95e9-336547f995f1/7494775d5c4c11eddb1d?chromeless=true&experience=power-bi"
];

const PING_URL = "https://script.google.com/macros/s/AKfycbxxx/exec"; // tu webhook Apps Script
const ROTATION_INTERVAL = 20 * 1000;

let index = 0;
let timer = null;
let countdown = ROTATION_INTERVAL;
let paused = false;

function rotar() {
  if (paused) return;
  location.href = LINKS[index];
  enviarPing();
  index = (index + 1) % LINKS.length;
}

function enviarPing() {
  fetch(PING_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      origen: "Landing Tableros GSP",
      tablero: LINKS[index],
      timestamp: new Date().toISOString()
    })
  }).then(() => console.log("✅ Ping enviado")).catch(e => console.warn("❌ Ping fallido", e));
}

function actualizarContador() {
  if (!paused) {
    countdown -= 1000;
    if (countdown <= 0) countdown = 0;
  }

  const min = String(Math.floor(countdown / 60000)).padStart(2, "0");
  const sec = String(Math.floor((countdown % 60000) / 1000)).padStart(2, "0");
  document.getElementById("timer").textContent = `${min}:${sec}`;
}

function iniciarTimer() {
  paused = false;
  countdown = ROTATION_INTERVAL;
  timer = setInterval(() => {
    actualizarContador();
    if (countdown <= 0) rotar();
  }, 1000);
}

function detenerTimer() {
  paused = true;
  clearInterval(timer);
}

document.getElementById("startBtn").onclick = () => iniciarTimer();
document.getElementById("stopBtn").onclick = () => detenerTimer();

iniciarTimer(); // empieza automáticamente
