(() => {
  const target = Date.parse("2028-01-17T22:00:00Z");
  const ids = ["days", "hours", "minutes", "seconds"];

  function tick() {
    const remaining = Math.max(0, target - Date.now());
    const values = [
      Math.floor(remaining / 86400000),
      Math.floor(remaining / 3600000) % 24,
      Math.floor(remaining / 60000) % 60,
      Math.floor(remaining / 1000) % 60
    ];

    ids.forEach((id, i) => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = String(values[i]).padStart(i === 0 ? 3 : 2, "0");
      }
    });

    if (remaining === 0) {
      const title = document.getElementById("eventTitle");
      if (title) title.textContent = "THE DAY IS HERE";
    }
  }

  tick();
  setInterval(tick, 1000);

  const form = document.getElementById("settingsForm");
  const input = document.getElementById("ytUrl");
  const storageKey = "jan18-youtube-video";

  function videoId(value) {
    value = (value || "").trim();
    if (/^[\w-]{11}$/.test(value)) return value;

    try {
      const url = new URL(value);
      if (url.hostname.endsWith("youtu.be")) return url.pathname.slice(1).split("/")[0];
      if (url.searchParams.get("v")) return url.searchParams.get("v");
      const match = url.pathname.match(/\/(?:live|embed|shorts)\/([\w-]{11})/);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  }

  const saved = localStorage.getItem(storageKey);
  if (input && saved) input.value = saved;

  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const id = videoId(input.value);
      const message = document.getElementById("saveMessage");

      if (!id) {
        message.textContent = "That doesn't look like a YouTube video URL or ID.";
        return;
      }

      localStorage.setItem(storageKey, id);
      message.textContent = "Saved. Watch Live will use this video.";
    });
  }

  const player = document.getElementById("ytPlayer");
  const placeholder = document.getElementById("playerPlaceholder");

  if (player) {
    const id = localStorage.getItem(storageKey);
    if (id) {
      player.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id);
      player.hidden = false;
      if (placeholder) placeholder.hidden = true;
    }
  }
})();
