
fetch("https://some-api-compat-thing.onrender.com/api/status")
  .then(res => res.json())
  .then(data => {
    if (!data.access) {
      document.body.innerHTML = `
        <style>
          body {
            background-color: black;
            color: white;
            font-family: 'Press Start 2P', monospace;
            text-align: center;
            padding-top: 20vh;
          }
        </style>
        <h1>🚫 ACCESS DENIED</h1>
        <p>This page is currently unavailable.</p>
      `;
    } else if (data.message) {
      const banner = document.createElement("div");
      banner.style.cssText = "background: #ff4444; color: white; font-family: 'Press Start 2P'; padding: 1em; position: fixed; top: 0; left: 0; right: 0; z-index: 999;";
      banner.textContent = data.message;
      document.body.prepend(banner);
    }
  });

setInterval(async () => {
  try {
    const res = await fetch("https://some-api-compat-thing.onrender.com/api/client-poll");
    const data = await res.json();
    if (data.refresh) location.reload();
  } catch (err) {
    console.error("Poll failed:", err);
  }
}, 3000);
