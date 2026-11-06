
// ===================================
// KENYA LOCATION TRACKER
// SHARED JAVASCRIPT
// ===================================

// Update the footer year automatically.
document.querySelectorAll(".current-year").forEach(function (element) {
    element.textContent = new Date().getFullYear();
});

// Mobile navigation toggle.
// Add a button with id="menuToggle" and a nav with id="mainNav"
// if you want to use this feature.
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
        const isOpen = mainNav.classList.toggle("show");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
}

// FAQ accordion.
// Give each FAQ question the class "faq-question"
// and its answer the class "faq-answer".
document.querySelectorAll(".faq-question").forEach(function (question) {
    question.addEventListener("click", function () {
        const answer = question.nextElementSibling;

        if (!answer || !answer.classList.contains("faq-answer")) {
            return;
        }

        const isOpen = answer.classList.toggle("show");
        question.setAttribute("aria-expanded", String(isOpen));
    });
});

// Display a friendly message in the browser console.
console.log("Kenya Location Tracker is ready!");
