document.addEventListener("DOMContentLoaded", function () {
  // Load navbar
  const navbar = document.getElementById("navbar");
  if (navbar) {
    fetch("/pages/nav.html")
      .then(response => response.text())
      .then(html => {
        navbar.innerHTML = html;
      })
      .catch(error => console.log("Error loading navbar:", error));
  }

  // Load footer
  const footer = document.getElementById("footer");
  if (footer) {
    fetch("/pages/footer.html")
      .then(response => response.text())
      .then(html => {
        footer.innerHTML = html;
      })
      .catch(error => console.log("Error loading footer:", error));
  }
});
