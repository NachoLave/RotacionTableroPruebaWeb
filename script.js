// === CONFIGURACIÓN ===
const LINKS = [
    "https://app.powerbi.com/groups/me/reports/7e9d3785-efd4-4ba6-86b2-e6890eaf9efc/ReportSection020b3c6bb1de02141e39?ctid=9d6555ab-db4f-4ab0-8e7e-39efc4dc6730&chromeless=true&experience=power-bi",
    "https://app.powerbi.com/groups/me/reports/88b3d9cb-4e34-46b3-8f05-4e2776595a03/ReportSection598b87c7344b73973402?ctid=9d6555ab-db4f-4ab0-8e7e-39efc4dc6730&chromeless=true&experience=power-bi",
    "https://app.powerbi.com/groups/me/reports/82b9efd6-ed22-472f-95e9-336547f995f1/7494775d5c4c11eddb1d?ctid=9d6555ab-db4f-4ab0-8e7e-39efc4dc6730&chromeless=true&experience=power-bi"
];

const PING_URL = "https://script.google.com/macros/s/AKfycbxxxx/exec"; // reemplazar por tu webhook real
const ROTATION_INTERVAL = 20 * 1000; // 20 segundos

// === FUNCIONALIDAD ===
let index = 0;
let ventana = null;

function rotarTablero() {
    const url = LINKS[index];

    // Abre nueva ventana o reutiliza la existente
    if (!ventana || ventana.closed) {
        ventana = window.open(url, "_blank");
    } else {
        ventana.location.href = url;
    }

    // Enviar ping
    fetch(PING_URL, {
        method: "POST",
        mode: "no-cors", // necesario para evitar errores CORS
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            origen: "Landing Tableros GSP",
            tablero: url,
            timestamp: new Date().toISOString()
        })
    })
    .then(() => console.log("✅ Ping enviado"))
    .catch(err => console.warn("❌ Error de ping:", err));

    index = (index + 1) % LINKS.length;
}

rotarTablero(); // inicial
setInterval(rotarTablero, ROTATION_INTERVAL);
