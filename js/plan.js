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

// Dates Manipulation
window.addEventListener("DOMContentLoaded", () => {
	const startInput = document.getElementById("start");
	const endInput = document.getElementById("end");
	const startResult = document.getElementById("startResult");
	const endResult = document.getElementById("endResult");
	const checkBtn = document.getElementById("checkBtn");

	function checkDates() {
		const today = new Date().setHours(0, 0, 0, 0);

		if (!startInput.value) {
			startResult.textContent = "❗ Pick a start date first!";
			startResult.style.color = "orange";
			return false;
		}

		if (!endInput.value) {
			endResult.textContent = "❗ Pick an end date!";
			endResult.style.color = "orange";
			return false;
		}

		const startDate = new Date(startInput.value).setHours(0, 0, 0, 0);
		const endDate = new Date(endInput.value).setHours(0, 0, 0, 0);

		// check start date input (if)
		if (startDate >= today) {
			startResult.textContent = "Good";
			return true;
		} else {
			startResult.textContent = "Please Use Future Dates Only";
		}

		// check end date input (if)

		return true;
	}

	checkBtn.addEventListener("click", checkDates);
});
