let currentMessage = "";

async function checkStatus() {
  try {
    const res = await fetch("https://some-api-compat-thing.onrender.com/api/status");
    const data = await res.json();
    
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
      return;
    }

    if (data.message && data.message !== currentMessage) {
      currentMessage = data.message;

      const oldBanner = document.getElementById("live-banner");
      if (oldBanner) oldBanner.remove();

      const banner = document.createElement("div");
      banner.id = "live-banner";
      banner.style.cssText = "background: #ff4444; color: white; font-family: 'Press Start 2P'; padding: 1em; position: fixed; top: 0; left: 0; right: 0; z-index: 999;";
      banner.textContent = currentMessage;
      document.body.prepend(banner);

      setTimeout(() => {
        const b = document.getElementById("live-banner");
        if (b) b.remove();
        currentMessage = "";
      }, 7000);
    }

  } catch (err) {
    console.error("Status check failed:", err);
  }
}

checkStatus();
setInterval(checkStatus, 3000);
