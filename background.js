const VALID_SAMESITE = ["no_restriction", "lax", "strict", "unspecified"];

// Helper: Sanitize cookie for Manifest V3
function sanitizeCookie(cookie) {
  const clean = { ...cookie };
  if (!VALID_SAMESITE.includes(clean.sameSite)) {
    console.warn(`[WhiteCat FIX] Invalid sameSite "${clean.sameSite}" for cookie "${clean.name}", defaulting to "no_restriction".`);
    clean.sameSite = "no_restriction";
  }
  return clean;
}

// Inject cookies for each account
function setCookiesForAllAccounts() {
  chrome.storage.local.get("accounts", (data) => {
    const accounts = data.accounts || [];
    if (accounts.length === 0) {
      console.log("[WhiteCat] No accounts stored.");
      return;
    }

    accounts.forEach((account, index) => {
      if (!Array.isArray(account.cookies)) return;

      account.cookies.forEach((cookie) => {
        const c = sanitizeCookie(cookie);
        chrome.cookies.set(c, () => {
          if (chrome.runtime.lastError) {
            console.error(`[WhiteCat ERROR] Failed to set cookie ${c.name}:`, chrome.runtime.lastError.message);
          } else {
            console.log(`[WhiteCat] Set cookie for Account #${index + 1}: ${c.name}`);
          }
        });
      });
    });
  });
}

// Auto-detect logged-in Facebook account and store it
function autoDetectAndStoreActiveFacebookSession() {
  chrome.cookies.getAll({ domain: ".facebook.com" }, (cookies) => {
    const required = ["c_user", "xs", "fr"];
    const hasAll = required.every(name => cookies.some(c => c.name === name));
    if (!hasAll) {
      console.log("[WhiteCat] No active Facebook session found.");
      return;
    }

    const structuredCookies = cookies.map(cookie => sanitizeCookie({
      domain: cookie.domain,
      expirationDate: cookie.expirationDate,
      hostOnly: cookie.hostOnly,
      httpOnly: cookie.httpOnly,
      name: cookie.name,
      path: cookie.path,
      sameSite: VALID_SAMESITE.includes(cookie.sameSite) ? cookie.sameSite : "no_restriction",
      secure: cookie.secure,
      session: cookie.session,
      storeId: cookie.storeId,
      value: cookie.value
    }));

    const newAccount = { cookies: structuredCookies };

    chrome.storage.local.get("accounts", (data) => {
      const accounts = data.accounts || [];
      const isDuplicate = accounts.some(acc =>
        acc.cookies.some(c => c.name === "c_user" && structuredCookies.find(sc => sc.name === "c_user" && sc.value === c.value))
      );

      if (!isDuplicate) {
        accounts.push(newAccount);
        chrome.storage.local.set({ accounts }, () => {
          console.log("[WhiteCat] Active Facebook account auto-saved to accounts.");
        });
      } else {
        console.log("[WhiteCat] Facebook session already in accounts.");
      }
    });
  });
}

// Event: on installed
chrome.runtime.onInstalled.addListener(() => {
  console.log("[WhiteCat] Extension installed.");
});

// Event: on startup
chrome.runtime.onStartup.addListener(() => {
  console.log("[WhiteCat] Extension started.");
  setCookiesForAllAccounts();
  autoDetectAndStoreActiveFacebookSession();
});
