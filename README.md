# White Cat Extension

**Private-use only**: This Chrome/Kiwi Browser extension automates Facebook fake profile reporting using multiple original sessions via cookies.

## Features
- Multi-account cookie injection
- Session validation
- Proxy support (basic hook)
- Auto-looping reports
- Manual control panel
- Tab cleanup
- Hacker-style terminal UI

## Setup
1. Clone or download this repo.
2. Open `chrome://extensions` (or Kiwi’s extension loader).
3. Enable **Developer Mode**.
4. Click **Load Unpacked** and select this folder.
5. Go to the extension’s options to add accounts in `panel.html`.

## Files
| File            | Purpose                             |
|-----------------|-------------------------------------|
| `manifest.json` | Extension config                    |
| `background.js` | Core logic + account looping        |
| `ui.html/js`    | Main interface                      |
| `panel.html/js` | Mission control panel               |
| `cookieUtils.js`| Cookie injection + validation       |
| `utils/logger.js` | Logging system                    |

## Notes
- **This repo is private** and must remain internal.
- Do not commit `accounts.json`.
