
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

// Registration demonstration
if (registerForm) {
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("fullName").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value;
        const confirm = document.getElementById("confirmPassword").value;

        const message = document.getElementById("registerMessage");

        if (password.length < 8) {
            message.textContent = "Password must have at least 8 characters.";
            message.style.color = "red";
            return;
        }

        if (password !== confirm) {
            message.textContent = "Your passwords do not match.";
            message.style.color = "red";
            return;
        }

        message.textContent =
            "Form validated! Real account registration is not connected yet.";
        message.style.color = "green";

        console.log("Registration form checked for:", name, email);
    });
}

// Login demonstration
if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;
        const message = document.getElementById("loginMessage");

        if (!email || !password) {
            message.textContent = "Please complete all fields.";
            message.style.color = "red";
            return;
        }

        message.textContent =
            "Form validated! Secure sign-in is not connected yet.";
        message.style.color = "green";

        console.log("Login form checked for:", email);
    });
}
