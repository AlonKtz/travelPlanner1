// /js/weather.js
document.addEventListener("DOMContentLoaded", () => {
	const input = document.getElementById("cityInput");
	const btn = document.getElementById("cityBtn");
	const reset = document.getElementById("resetBtn");
	const msg = document.getElementById("weatherMsg");
	const card = document.getElementById("weatherCard");
	const table = document.getElementById("weatherTable");

	function onReset() {
		input.value = "";
		msg.textContent = "";
		msg.style.color = "";
		card.innerHTML = "";
		table.innerHTML = "";
		input.focus();
	}
	if (reset) reset.addEventListener("click", onReset);

	btn.addEventListener("click", async () => {
		const q = input.value.trim();
		if (!q) {
			showMsg("Type a city name.", "warning");
			return;
		}

		showMsg("Loading…", "info");
		card.innerHTML = "";
		table.innerHTML = "";

		try {
			// 1) Geocode (Open-Meteo Geocoding)
			const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
				q
			)}&count=1&language=en&format=json`;
			const gRes = await fetch(geoUrl);
			if (!gRes.ok) throw new Error(`Geo HTTP ${gRes.status}`);
			const gData = await gRes.json();
			const place = gData?.results?.[0];
			if (!place) {
				showMsg("No matching place found.", "error");
				return;
			}

			const { latitude, longitude, name, country, timezone } = place;

			// 2) Forecast (Open-Meteo Weather)
			const wUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=${encodeURIComponent(
				timezone
			)}`;
			const wRes = await fetch(wUrl);
			if (!wRes.ok) throw new Error(`WX HTTP ${wRes.status}`);
			const w = await wRes.json();

			// 3) Render current card
			const cw = w.current_weather || {};
			const unitTemp =
				(w.daily_units && w.daily_units.temperature_2m_max) || "°C";
			const unitWind =
				(w.current_weather_units && w.current_weather_units.windspeed) ||
				"km/h";

			card.innerHTML = `
        <div style="border:1px solid #ccc;border-radius:10px;padding:15px;background:#f9f9f9;">
          <div style="font-weight:bold;color:#0a520a;font-size:18px;margin-bottom:6px;">
            ${esc(name)}${country ? `, ${esc(country)}` : ""} 
          </div>
          <div style="font-size:14px;line-height:1.6;">
            <div><strong>Now:</strong> ${
							cw.temperature ?? "–"
						} ${unitTemp}, wind ${cw.windspeed ?? "–"} ${unitWind}, dir ${
				cw.winddirection ?? "–"
			}°</div>
            <div><strong>Timezone:</strong> ${esc(timezone)}</div>
            <div><small>Lat/Lon: ${latitude.toFixed(3)}, ${longitude.toFixed(
				3
			)}</small></div>
            <div><small>Updated: ${new Date().toLocaleString()}</small></div>
          </div>
        </div>
      `;

			// 4) Render 7-day table (max/min & precip prob)
			const days = w.daily?.time || [];
			const tmax = w.daily?.temperature_2m_max || [];
			const tmin = w.daily?.temperature_2m_min || [];
			const ppop = w.daily?.precipitation_probability_max || [];

			if (days.length) {
				let rows = "";
				for (let i = 0; i < days.length; i++) {
					rows += `
            <tr>
              <td style="padding:8px 10px;border-bottom:1px solid #eee;">${fmtDate(
								days[i]
							)}</td>
              <td style="padding:8px 10px;border-bottom:1px solid #eee;text-align:center;">${val(
								tmin[i]
							)} / ${val(tmax[i])} ${unitTemp}</td>
              <td style="padding:8px 10px;border-bottom:1px solid #eee;text-align:center;">${val(
								ppop[i]
							)}%</td>
            </tr>
          `;
				}
				table.innerHTML = `
          <div style="margin-top:8px;font-weight:bold;">Next 7 days</div>
          <div style="overflow:auto;">
            <table style="width:100%;max-width:480px;border-collapse:collapse;font-size:14px;">
              <thead>
                <tr>
                  <th style="text-align:left;padding:8px 10px;border-bottom:1px solid #ccc;">Date</th>
                  <th style="text-align:center;padding:8px 10px;border-bottom:1px solid #ccc;">Min / Max</th>
                  <th style="text-align:center;padding:8px 10px;border-bottom:1px solid #ccc;">Rain chance</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        `;
			} else {
				table.innerHTML = `<p>No daily forecast available.</p>`;
			}

			showMsg("Done.", "ok");
		} catch (err) {
			console.error(err);
			showMsg("Failed to load weather. Try another place.", "error");
		}
	});

	// helpers
	function showMsg(text, type) {
		const colors = {
			info: "#555",
			ok: "#0a520a",
			warning: "#8a5200",
			error: "#a10000",
		};
		msg.textContent = text;
		msg.style.color = colors[type] || "#333";
	}
	function esc(s) {
		return String(s ?? "").replace(
			/[&<>"']/g,
			(m) =>
				({
					"&": "&amp;",
					"<": "&lt;",
					">": "&gt;",
					'"': "&quot;",
					"'": "&#39;",
				}[m])
		);
	}
	function val(v) {
		return v === null || v === undefined || Number.isNaN(v) ? "–" : v;
	}
	function fmtDate(iso) {
		try {
			return new Date(iso + "T00:00:00").toLocaleDateString();
		} catch {
			return iso;
		}
	}
});
