const LINKS = [
    "https://app.powerbi.com/groups/me/reports/7e9d3785-efd4-4ba6-86b2-e6890eaf9efc/ReportSection020b3c6bb1de02141e39?ctid=9d6555ab-db4f-4ab0-8e7e-39efc4dc6730&chromeless=true&experience=power-bi",
    "https://app.powerbi.com/groups/me/reports/88b3d9cb-4e34-46b3-8f05-4e2776595a03/ReportSection598b87c7344b73973402?ctid=9d6555ab-db4f-4ab0-8e7e-39efc4dc6730&chromeless=true&experience=power-bi",
    "https://app.powerbi.com/groups/me/reports/82b9efd6-ed22-472f-95e9-336547f995f1/7494775d5c4c11eddb1d?ctid=9d6555ab-db4f-4ab0-8e7e-39efc4dc6730&chromeless=true&experience=power-bi"
];

const PING_URL = "https://script.google.com/macros/s/AKfycbXXXX/exec";
const INTERVALO_ROTACION = 20 * 1000;

let index = 0;
let ventana = null;
let intervalo = null;
let tiempoRestante = INTERVALO_ROTACION;

const timerEl = document.getElementById("timer");
const btnReanudar = document.getElementById("btnReanudar");
const btnDetener = document.getElementById("btnDetener");

function abrirTablero() {
    if (LINKS.length === 0) return;

    if (ventana && !ventana.closed) ventana.close();

    const url = LINKS[index];
    ventana = window.open(url, "_blank");

    enviarPing(url);
    index = (index + 1) % LINKS.length;
    tiempoRestante = INTERVALO_ROTACION;
}

function enviarPing(url) {
    fetch(PING_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            origen: "Landing Tableros GSP",
            tablero: url,
            timestamp: new Date().toISOString()
        })
    }).then(() => console.log("✅ Ping enviado")).catch(err => console.warn("❌ Error de ping:", err));
}

function actualizarTimer() {
    tiempoRestante -= 1000;
    const segundos = Math.max(0, Math.floor(tiempoRestante / 1000));
    const min = String(Math.floor(segundos / 60)).padStart(2, "0");
    const sec = String(segundos % 60).padStart(2, "0");
    timerEl.textContent = `${min}:${sec}`;
    if (tiempoRestante <= 0) abrirTablero();
}

function iniciarRotacion() {
    if (intervalo) clearInterval(intervalo);
    abrirTablero();
    intervalo = setInterval(actualizarTimer, 1000);
}

function detenerRotacion() {
    clearInterval(intervalo);
    intervalo = null;
}

btnReanudar.addEventListener("click", iniciarRotacion);
btnDetener.addEventListener("click", detenerRotacion);

// Iniciar por defecto
iniciarRotacion();
