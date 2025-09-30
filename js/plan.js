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

		let ok = true;
		if (startDate >= today) {
			startResult.textContent = "Good";
			startResult.style.color = "green";
		} else {
			startResult.textContent = "Please Use Future Dates Only";
			startResult.style.color = "red";
		}

		if (endDate >= startDate) {
			endResult.textContent = "Good";
			endResult.style.color = "green";
		} else {
			endResult.textContent = "End date must be after the start date";
			endResult.style.color = "red";
		}
	}

	// This line should ALWAYS run after DOM content is loaded
	if (checkBtn) {
		checkBtn.addEventListener("click", checkDates);
	}
});
