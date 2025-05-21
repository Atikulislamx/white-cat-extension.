// background.js

import { injectCookies, validateSession } from './cookieUtils.js';
import { log, error } from './utils/logger.js';

const REPORT_DELAY = 10000; // 10 seconds delay between reports

async function applyProxy(proxy) {
  // Placeholder for proxy application logic
  if(proxy) {
    log(`Proxy set to ${proxy} (implement proxy handling here)`);
  }
}

async function openTargetAndReport(targetUrl) {
  try {
    const tab = await chrome.tabs.create({ url: targetUrl, active: false });
    log(`Opened target tab: ${targetUrl}`);

    // Wait for page to load fully (simple fixed wait here; can be improved)
    await new Promise(r => setTimeout(r, 5000));

    // TODO: Insert reporting logic here (e.g. content script messaging)
    log(`Reported on target in tabId: ${tab.id}`);

    // Close tab after report
    await chrome.tabs.remove(tab.id);
    log(`Closed tabId: ${tab.id}`);
  } catch (e) {
    error(`Error opening/reporting on target: ${e.message}`);
  }
}

async function launchWhiteCat(targetUrl) {
  try {
    const response = await fetch(chrome.runtime.getURL('accounts.json'));
    const accounts = await response.json();

    for (const account of accounts) {
      log(`--- Testing session for ${account.name} ---`);

      await applyProxy(account.proxy);
      await injectCookies(account.cookies);

      const valid = await validateSession();
      if (!valid) {
        error(`${account.name} has INVALID session. Skipping...`);
        continue;
      }

      log(`Valid session. Launching attack with ${account.name}`);
      await openTargetAndReport(targetUrl);

      await new Promise(r => setTimeout(r, REPORT_DELAY));
    }

    log('Strike cycle completed.');
  } catch (e) {
    error(`Launch failed: ${e.message}`);
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === 'start-attack' && message.targetUrl) {
    launchWhiteCat(message.targetUrl);
    sendResponse({ status: 'started' });
  }
});
