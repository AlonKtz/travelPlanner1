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

// /js/saved.js — super simple render
document.addEventListener("DOMContentLoaded", () => {
  const LS_KEY = "trips_v1";
  const listEl = document.getElementById("tripsList");
  const trips = JSON.parse(localStorage.getItem(LS_KEY) || "[]");

  if (!trips.length) {
    listEl.innerHTML = "<li>No trips yet. Plan one first.</li>";
    return;
  }

  // Build plain <li> items
  listEl.innerHTML = trips.map(t => {
    const period = `${fmt(t.startDate)} → ${fmt(t.endDate)}`;
    const notes = t.notes ? ` — ${escapeHtml(t.notes)}` : "";
    return `<li><strong>${escapeHtml(t.destination)}</strong> (${escapeHtml(t.tripType)}) · ${period}${notes}</li>`;
  }).join("");

  function fmt(d){ try { return new Date(d).toLocaleDateString(); } catch { return d; } }
  function escapeHtml(s){ return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
});

// /js/saved.js
document.addEventListener("DOMContentLoaded", () => {
  const LS_KEY = "trips_v1";
  const listEl = document.getElementById("tripsList");
  const clearBtn = document.getElementById("clearTripsBtn");

  render();

  clearBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all saved trips?")) {
      localStorage.removeItem(LS_KEY);
      render();
    }
  });

  function render() {
    const trips = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    if (!trips.length) {
      listEl.innerHTML = "<li>No trips yet. Plan one first.</li>";
      return;
    }
    listEl.innerHTML = trips.map(t => {
      const period = `${fmt(t.startDate)} → ${fmt(t.endDate)}`;
      const notes = t.notes ? ` — ${escapeHtml(t.notes)}` : "";
      return `<li><strong>${escapeHtml(t.destination)}</strong> (${escapeHtml(t.tripType)}) · ${period}${notes}</li>`;
    }).join("");
  }

  function fmt(d){ try { return new Date(d).toLocaleDateString(); } catch { return d; } }
  function escapeHtml(s){ return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
});

