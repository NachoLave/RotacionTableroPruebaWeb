const LINKS = [
   "https://app.powerbi.com/groups/me/reports/7e9d3785-efd4-4ba6-86b2-e6890eaf9efc/ReportSection020b3c6bb1de02141e39?ctid=9d6555ab-db4f-4ab0-8e7e-39efc4dc6730&chromeless=true&experience=power-bi", // resumen ejecutivo
        "https://app.powerbi.com/groups/me/reports/82b9efd6-ed22-472f-95e9-336547f995f1/7494775d5c4c11eddb1d?ctid=9d6555ab-db4f-4ab0-8e7e-39efc4dc6730&chromeless=true&experience=power-bi", // portal gsp
        "https://app.powerbi.com/groups/me/reports/79f67593-bef4-4cdf-a865-11e92d41571b/ReportSection?ctid=9d6555ab-db4f-4ab0-8e7e-39efc4dc6730&chromeless=true&experience=power-bi", //Riesgos grc
        "https://app.powerbi.com/groups/me/reports/3d207542-1bcb-4557-a2e1-4a195a66ebef/ReportSection?ctid=9d6555ab-db4f-4ab0-8e7e-39efc4dc6730&chromeless=true&experience=power-bi", //status backups

        "https://app.powerbi.com/groups/me/reports/481e7a55-3d56-4b5f-a736-de466a672cb7/3f59c63e62ec2e696753?experience=power-bi&chromeless=true",// geolocalizacio
        "https://app.powerbi.com/groups/me/reports/cb45d594-defe-448d-a218-1ff6ad03172f/ReportSection1554dd7e053a66979e0b?experience=power-bi&chromeless=true", //empleados, altas, bajas
        "https://app.powerbi.com/groups/me/reports/f542c10d-bc0a-41be-8983-9a6b9f25ccb2/56ad26d522ccc2e3b89c?ctid=9d6555ab-db4f-4ab0-8e7e-39efc4dc6730&experience=power-bi&chromeless=true", //Recaudaciones 2024
        "https://app.powerbi.com/groups/me/reports/f542c10d-bc0a-41be-8983-9a6b9f25ccb2/39641eae0b32fe7ea9da?ctid=9d6555ab-db4f-4ab0-8e7e-39efc4dc6730&experience=power-bi&chromeless=true" //Recaudaciones 2025
        
];



const ROTATION_TIME = 1200; // segundos
let intervalId = null;
let countdown = ROTATION_TIME;
let currentIndex = 0;
let secondaryTab = null;

function updateTimer() {
    const timer = document.getElementById("timer");
    timer.textContent = `00:${String(countdown).padStart(2, "0")}`;
}

function openOrUpdateTab(url) {
    if (secondaryTab == null || secondaryTab.closed) {
        secondaryTab = window.open(url, "_blank");
    } else {
        secondaryTab.location.href = url;
    }
}

function rotate() {
    openOrUpdateTab(LINKS[currentIndex]);
    currentIndex = (currentIndex + 1) % LINKS.length;
}

function tick() {
    countdown--;
    updateTimer();

    if (countdown <= 0) {
        countdown = ROTATION_TIME;
        rotate();
    }
}

function startRotation() {
    if (intervalId) return;
    intervalId = setInterval(tick, 1000);
}

function pauseRotation() {
    clearInterval(intervalId);
    intervalId = null;
}

updateTimer();
startRotation();
