const LINKS = [
  "https://app.powerbi.com/groups/647f43d9-54a1-47ee-9e78-604bb84ac9ff/reports/01661e10-0139-4bee-bf88-1b96ba9d7f2e/44f3f26abe0a6fb92b24?experience=power-bi&chromeless=true", //Empleados - Altas y bajas
        "https://app.powerbi.com/groups/647f43d9-54a1-47ee-9e78-604bb84ac9ff/reports/01661e10-0139-4bee-bf88-1b96ba9d7f2e/ReportSectionf9fe292b4b0b2244a793?experience=power-bi&chromeless=true", //Edad y Sexo
        "https://app.powerbi.com/groups/647f43d9-54a1-47ee-9e78-604bb84ac9ff/reports/01661e10-0139-4bee-bf88-1b96ba9d7f2e/ReportSection7b34db0f300b875c8c1b?experience=power-bi&chromeless=true", //Antiguedad
"https://app.powerbi.com/groups/647f43d9-54a1-47ee-9e78-604bb84ac9ff/reports/01661e10-0139-4bee-bf88-1b96ba9d7f2e/ReportSection1554dd7e053a66979e0b?experience=powerbi&chromeless=true", //empleados Dotacion
];



const ROTATION_TIME = 20; // segundos
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
