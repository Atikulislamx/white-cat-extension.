// ui.js

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const logEl = document.getElementById('log');
const targetUrlInput = document.getElementById('targetUrl');

let running = false;

function log(msg) {
  const time = new Date().toLocaleTimeString();
  logEl.textContent += `[${time}] ${msg}\n`;
  logEl.scrollTop = logEl.scrollHeight;
}

startBtn.onclick = () => {
  const url = targetUrlInput.value.trim();
  if (!url) {
    alert("Please enter a valid Facebook profile URL.");
    return;
  }
  if (running) {
    log("Already running...");
    return;
  }

  running = true;
  startBtn.disabled = true;
  stopBtn.disabled = false;

  log(`Starting report cycle on: ${url}`);

  chrome.runtime.sendMessage({ action: 'startReporting', profileUrl: url });
};

stopBtn.onclick = () => {
  running = false;
  startBtn.disabled = false;
  stopBtn.disabled = true;
  log("Reporting stopped.");
  chrome.runtime.sendMessage({ action: 'stopReporting' });
};
