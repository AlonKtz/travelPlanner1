document.addEventListener("DOMContentLoaded", async () => {
  // NAVBAR
  const navbar = document.getElementById("navbar");
  if (navbar) {
    try {
      const res = await fetch("/pages/nav.html");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      navbar.innerHTML = await res.text();
    } catch (err) {
      console.error("Failed to load nav:", err);
    }
  }

  // FOOTER
  const footer = document.getElementById("footer");
  if (footer) {
    try {
      const res = await fetch("/pages/footer.html");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      footer.innerHTML = await res.text();
    } catch (err) {
      console.error("Failed to load footer:", err);
    }
  }
});