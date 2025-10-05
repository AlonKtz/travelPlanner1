// Nav Bar & Footer

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

function resetTripForm() {
	document.getElementById("destination").value = "";
	document.getElementById("startResult").textContent = "";
	document.getElementById("endResult").textContent = "";
}

// reseting the check button result

document.addEventListener("DOMContentLoaded", () => {
	const form = document.querySelector(".tripForm");
	const startResult = document.getElementById("startResult");
	const endResult = document.getElementById("endResult");

	form.addEventListener("reset", () => {
		startResult.textContent = "";
		endResult.textContenttent = "";
	});
});

// Dates Rules

window.addEventListener("DOMContentLoaded", () => {
	const startInput = document.getElementById("start");
	const endInput = document.getElementById("end");
	const startResult = document.getElementById("startResult");
	const endResult = document.getElementById("endResult");
	const checkBtn = document.getElementById("checkBtn");

	function checkDates() {
		const today = new Date().setHours(0, 0, 0, 0);
		startResult.textContent = "";
		endResult.textContent = "";

		if (startInput.value === "") {
			startResult.textContent = " Pick a start date first❗";
			startResult.style.color = "orange";
			return false;
		}

		if (endInput.value === "") {
			endResult.textContent = " Pick an end date❗";
			endResult.style.color = "orange";
			return false;
		}

		const startDate = new Date(startInput.value).setHours(0, 0, 0, 0);
		const endDate = new Date(endInput.value).setHours(0, 0, 0, 0);

		// Checks Start date
		let valid = true;
		if (startDate < today){
			startResult.textContent = "Please Use Future Dates Only";
			startResult.style.color = "red";
			valid = false;
		}

		// Checks End date
		if (endDate < startDate) {
			endResult.textContent = "End Date must be after the start date";
			endResult.style.color = "red";
			valid = false;
		}

		if (startDate === endDate) {
			endResult.textContent = "We plan minimum 2-day trips";
			endResult.style.color = "red";
			valid = false;
		}

		// if both are good
		if (valid) {
			startResult.textContent = "Ready";
			startResult.style.color = "green";
			endResult.textContent = "";
		}


	}

	// This line should ALWAYS run after DOM content is loaded
	if (checkBtn) {
		checkBtn.addEventListener("click", checkDates);
	}
});

// local storage

document.addEventListener("DOMContentLoaded", () => {
  const LS_KEY = "trips_v1";
  const form = document.getElementById("tripForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Read the fields that already exist in your HTML:
    const trip = {
      destination: document.getElementById("destination").value.trim(),
      tripType: document.getElementById("tripType").value,
      startDate: document.getElementById("start").value,
      endDate: document.getElementById("end").value,
      notes: document.getElementById("notes").value.trim(),
      createdAt: new Date().toISOString(),
    };

    // Tiny guard so we don't save empties
    if (!trip.destination || !trip.startDate || !trip.endDate) {
      alert("Please fill destination and dates.");
      return;
    }

    // Load -> push -> save (one line each)
    const list = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    list.push(trip);
    localStorage.setItem(LS_KEY, JSON.stringify(list));

    alert("Trip saved. Check Saved Trips page.");
    form.reset();
  });
});



