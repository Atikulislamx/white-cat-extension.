// File: cookieUtils.js

export async function injectCookies(cookieString) {
  const cookies = cookieString.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    await chrome.cookies.set({
      url: "https://www.facebook.com",
      name,
      value,
      domain: ".facebook.com",
      path: "/",
      secure: true,
      httpOnly: false,
      sameSite: "Lax"
    });
    await sleep(100); // Avoid rate limits
  }
}

export async function validateSession() {
  const checkUrl = "https://www.facebook.com/me";
  try {
    const resp = await fetch(checkUrl, { credentials: "include" });
    const text = await resp.text();
    return text.includes("id=\"pagelet_timeline_main_column\"") || text.includes("/profile_picture/");
  } catch (e) {
    return false;
  }
}

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}
