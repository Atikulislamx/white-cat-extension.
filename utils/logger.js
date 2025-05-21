// File: utils/logger.js

export function log(message) {
  const time = new Date().toLocaleTimeString();
  console.log(`[WhiteCat][${time}] ${message}`);
  chrome.runtime.sendMessage({ type: 'log', message });
}
