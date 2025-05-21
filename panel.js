// File: panel.js

const accountsData = document.getElementById('accountsData');
const saveBtn = document.getElementById('saveBtn');

function loadAccounts() {
  chrome.storage.local.get(['accounts'], (result) => {
    if (result.accounts) {
      accountsData.value = JSON.stringify(result.accounts, null, 2);
    }
  });
}

function saveAccounts() {
  try {
    const parsed = JSON.parse(accountsData.value);
    if (!Array.isArray(parsed)) throw new Error("Not an array");
    chrome.storage.local.set({ accounts: parsed }, () => {
      alert("Accounts saved successfully!");
    });
  } catch (e) {
    alert("Invalid JSON format. Fix and try again.");
  }
}

saveBtn.addEventListener('click', saveAccounts);
window.onload = loadAccounts;
