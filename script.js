// === CONFIGURACIÓN ===
const LINKS = [
  "https://app.powerbi.com/groups/me/reports/7e9d3785-efd4-4ba6-86b2-e6890eaf9efc/ReportSection020b3c6bb1de02141e39?ctid=9d6555ab-db4f-4ab0-8e7e-39efc4dc6730&chromeless=true&experience=power-bi",
  "https://app.powerbi.com/groups/me/reports/88b3d9cb-4e34-46b3-8f05-4e2776595a03/ReportSection598b87c7344b73973402?ctid=9d6555ab-db4f-4ab0-8e7e-39efc4dc6730&chromeless=true&experience=power-bi",
  "https://app.powerbi.com/groups/me/reports/82b9efd6-ed22-472f-95e9-336547f995f1/7494775d5c4c11eddb1d?ctid=9d6555ab-db4f-4ab0-8e7e-39efc4dc6730&chromeless=true&experience=power-bi"
];

const PING_URL = "https://script.google.com/macros/s/AKfycbxxxxxxx/exec"; // REEMPLAZAR por tu URL real
const ROTATION_INTERVAL = 20 * 1000;

let index = 0;
let tableroVentana = null;

function rotarTablero() {
  const url = LINKS[index];

  // Enviar ping
  fetch(PING_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      origen: "Landing Tableros GSP",
      tablero: url,
      timestamp: new Date().toISOString()
    })
  }).then(() => {
    console.log("✅ Ping enviado");
  }).catch(err => {
    console.warn("❌ Error al enviar ping:", err);
  });

  // Abrir o actualizar la ventana
  if (!tableroVentana || tableroVentana.closed) {
    tableroVentana = window.open(url, "_blank");
  } else {
    tableroVentana.location.href = url;
  }

  document.getElementById("status").textContent = `Mostrando tablero ${index + 1} de ${LINKS.length}`;

  index = (index + 1) % LINKS.length;
}

// === INICIO ===
rotarTablero(); // primero al cargar
setInterval(rotarTablero, ROTATION_INTERVAL);
