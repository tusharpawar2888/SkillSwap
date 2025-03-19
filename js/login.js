document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('.login-form');
    const messageContainer = document.querySelector('.message-container');
    const passwordToggle = document.querySelector('.password-toggle');
    const passwordInput = document.getElementById('password');

    // Form Submission
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value.trim();

        // Clear previous messages
        messageContainer.innerHTML = '';

        // Validate Email
        if (!validateEmail(email)) {
            showMessage('Please enter a valid email.', 'error');
            return;
        }

        // Validate Password
        if (password.length < 6) {
            showMessage('Password must be at least 6 characters.', 'error');
            return;
        }

        // Simulate successful login
        showMessage('Login successful! Redirecting...', 'success');

        // Save login state
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);

        setTimeout(() => {
            window.location.href = 'index.html'; // Redirect to home page
        }, 1500);
    });

    // Password Toggle
    passwordToggle.addEventListener('click', function () {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        this.classList.toggle('fa-eye-slash');
    });

    // Email Validation Function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Show Message Function
    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `${type}-message`;
        messageDiv.textContent = message;
        messageContainer.appendChild(messageDiv);

        // Remove message after 3 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
});