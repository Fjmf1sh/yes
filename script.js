const banner = document.createElement("div");
banner.id = "live-banner";
banner.style.background = "#bb88ff";
banner.style.color = "white";
banner.style.fontFamily = "'Press Start 2P', monospace";
banner.style.padding = "1em";
banner.style.position = "fixed";
banner.style.top = "0";
banner.style.left = "0";
banner.style.right = "0";
banner.style.zIndex = "9999";
banner.style.textAlign = "center";
banner.style.display = "none";
banner.style.textShadow = "0 0 8px white";
banner.style.boxShadow = "0 0 20px #bb88ff";

document.body.prepend(banner);

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
  } catch (err) {
    console.error("Status check failed:", err);
  }
}

checkStatus();
setInterval(checkStatus, 3000);

setInterval(() => {
  fetch('https://some-api-compat-thing.onrender.com/api/client-poll')
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Fetch failed with status: " + res.status);
      }
    })
    .then((json) => {
      if (json.message.trim().length >= 1) {
        banner.innerText = json.message.trim();
        banner.style.display = 'block';
      } else {
        banner.innerText = "";
        banner.style.display = 'none';
      }
    })
    .catch((err) => {
      console.error("Error during fetch:", err);
    });
}, 3000);
