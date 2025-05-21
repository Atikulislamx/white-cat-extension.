# 🐾 White Cat Extension v3.3

> **Private & Tactical Use Only**  
> An elite Chrome/Kiwi Browser extension for *automated* fake Facebook profile reporting using **real session cookies** and stealth mechanisms.

---

## ⚔️ Key Features

- 🧠 **Auto-detect logged-in Facebook accounts** (no manual cookies needed!)
- 🔐 **Multi-account injection** via `accounts.json` (optional fallback)
- ♻️ **Auto-looping** reports with randomized delay
- 🎯 **Targeted fake profile URL reporting**
- 🌐 **Proxy-ready** structure (can inject future proxy/VPN logic)
- 🕵️‍♂️ **Hacker-style terminal UI**
- 🧼 **Auto tab cleanup** after task completion
- ✅ **Session validation** before firing requests
- 📜 **Async logging** for transparency & debugging

---

## ⚙️ Setup Instructions

1. **Clone or download** this repo.
2. Open `chrome://extensions/` (or Kiwi Browser’s extension manager).
3. Toggle **Developer Mode**.
4. Click **Load Unpacked** and select the folder.
5. Use the extension popup to:
   - Paste target **Facebook profile link**
   - Click “Start Reporting”

---

## 💡 How It Works

- On launch, `background.js` attempts to **auto-grab cookies** from any active Facebook sessions.
- If cookies are not found, it **falls back to** reading from `accounts.json` (added manually via `panel.html`).
- It opens the target profile, injects session cookies, and **automates the report**.
- Supports **looped attacks**, **multi-user rotation**, and logs every step.

---

## 📂 File Overview

| File               | Purpose                                      |
|--------------------|----------------------------------------------|
| `manifest.json`    | Extension setup & permissions                 |
| `background.js`    | Core engine: loop, report, cookies, logging   |
| `ui.html / ui.js`  | Main terminal-like control panel              |
| `panel.html / js`  | Manual fallback session manager               |
| `cookieUtils.js`   | Cookie detection, injection, validation       |
| `logger.js`        | Clean & styled logs for easy debugging        |
| `accounts.json`    | Multi-account storage (ignored in Git)        |

---

## ✍️ How to Add Accounts (Optional)

> Already logged in to Facebook? **Skip this step**.

1. Open the extension’s **Mission Control Panel** (`panel.html`).
2. Enter the `c_user` and `xs` cookies for each account.
3. Click “Save Account”.

Stored accounts will rotate during mass-reporting sessions.

---

## ❗ Important Notes

- **Do NOT share or publish this tool publicly.**
- Make sure your use aligns with **Facebook’s Terms of Service**.
- `accounts.json` is **auto-ignored** by Git for safety.
- Designed for internal use by **Cyber Infinity** only.

---

## 🔮 Coming Soon (v4.0+)

- Auto-retry logic for failed reports
- Built-in VPN/Proxy toggling
- Cloud-based multi-user support
- Undetectable DOM observation mode
- Ghost reporting with decoys

---

Made with stealth & strategy by  
**Cyber Infinity & Atikul Islam** | *Defending Digital Truth*
