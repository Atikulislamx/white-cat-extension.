// cookieUtils.js

function error(msg) {
  console.error('[WhiteCat ERROR] ' + msg);
}

async function injectCookies(account) {
  if (!account.cookies || !Array.isArray(account.cookies)) {
    error('No cookies found for account: ' + account.username);
    return;
  }
  for (const cookie of account.cookies) {
    try {
      await chrome.cookies.set({
        url: 'https://facebook.com',
        name: cookie.name,
        value: cookie.value,
        domain: '.facebook.com',
        path: '/',
        secure: true,
        httpOnly: false,
        sameSite: 'Lax'
      });
    } catch (e) {
      error(`Failed to set cookie ${cookie.name}: ${e.message}`);
    }
  }
}

async function validateSession(account) {
  try {
    await injectCookies(account);
    const response = await fetch('https://www.facebook.com/me', {
      credentials: 'include',
      cache: 'no-store'
    });
    const html = await response.text();
    return html.includes('Logout') || html.includes('log out');
  } catch (e) {
    error('Validation failed: ' + e.message);
    return false;
  }
}
