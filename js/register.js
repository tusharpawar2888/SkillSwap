document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.querySelector('.register-form');
    const messageContainer = document.querySelector('.message-container');
    const profileInput = document.getElementById('profile-pic');
    const previewContainer = document.querySelector('.preview-container');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const strengthMeter = document.querySelector('.strength-meter');
    const strengthText = document.querySelector('.strength-text');
    const passwordToggles = document.querySelectorAll('.password-toggle');

    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const firstName = document.querySelector('input[placeholder="First Name"]').value.trim();
        const lastName = document.querySelector('input[placeholder="Last Name"]').value.trim();
        const email = document.querySelector('input[type="email"]').value.trim();
        const password = document.querySelector('input[placeholder="Password"]').value.trim();
        const confirmPassword = document.querySelector('input[placeholder="Confirm Password"]').value.trim();
        const role = document.querySelector('select').value;
        const termsChecked = document.querySelector('input[type="checkbox"]').checked;

        // Clear previous messages
        messageContainer.innerHTML = '';

        // Validate First Name
        if (firstName === '') {
            showMessage('First Name is required.', 'error');
            return;
        }

        // Validate Last Name
        if (lastName === '') {
            showMessage('Last Name is required.', 'error');
            return;
        }

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

        // Validate Confirm Password
        if (password !== confirmPassword) {
            showMessage('Passwords do not match.', 'error');
            return;
        }

        // Validate Role
        if (role === '') {
            showMessage('Please select your role.', 'error');
            return;
        }

        // Validate Terms Agreement
        if (!termsChecked) {
            showMessage('You must agree to the Terms of Service and Privacy Policy.', 'error');
            return;
        }

        // Simulate successful registration
        showMessage('Registration successful! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'index.html'; // Redirect to home page
        }, 1500);
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

    // Profile Picture Preview
    profileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                showMessage('Image size should be less than 5MB', 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                previewContainer.innerHTML = `<img src="${e.target.result}" alt="Profile Preview">`;
            }
            reader.readAsDataURL(file);
        }
    });

    // Password Strength Checker
    function checkPasswordStrength(password) {
        let strength = 0;
        const feedback = [];

        // Length check
        if (password.length >= 8) {
            strength += 1;
        } else {
            feedback.push('at least 8 characters');
        }

        // Uppercase check
        if (/[A-Z]/.test(password)) {
            strength += 1;
        } else {
            feedback.push('uppercase letter');
        }

        // Lowercase check
        if (/[a-z]/.test(password)) {
            strength += 1;
        } else {
            feedback.push('lowercase letter');
        }

        // Number check
        if (/[0-9]/.test(password)) {
            strength += 1;
        } else {
            feedback.push('number');
        }

        // Special character check
        if (/[^A-Za-z0-9]/.test(password)) {
            strength += 1;
        } else {
            feedback.push('special character');
        }

        return {
            strength: strength,
            feedback: feedback
        };
    }

    // Password Input Event Handler
    passwordInput.addEventListener('input', function() {
        const result = checkPasswordStrength(this.value);
        const percentage = (result.strength / 5) * 100;

        strengthMeter.innerHTML = `<div style="width: ${percentage}%; background-color: ${getStrengthColor(result.strength)}"></div>`;

        if (result.feedback.length > 0) {
            strengthText.textContent = `Add: ${result.feedback.join(', ')}`;
        } else {
            strengthText.textContent = 'Strong password!';
        }
    });

    function getStrengthColor(strength) {
        switch(strength) {
            case 1: return '#ff4444';
            case 2: return '#ffbb33';
            case 3: return '#ffeb3b';
            case 4: return '#00C851';
            case 5: return '#007E33';
            default: return '#ff4444';
        }
    }

    // Password Visibility Toggle
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type');
            input.setAttribute('type', type === 'password' ? 'text' : 'password');
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });

    // Real-time validation
    const inputs = registerForm.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#ff4444';
            } else {
                this.style.borderColor = '#2575fc';
            }
        });
    });

    // Language multi-select enhancement
    const languageSelect = document.getElementById('language');
    languageSelect.addEventListener('change', function() {
        const selectedOptions = Array.from(this.selectedOptions);
        if (selectedOptions.length > 3) {
            showMessage('You can select up to 3 languages', 'error');
            for (let i = 3; i < selectedOptions.length; i++) {
                selectedOptions[i].selected = false;
            }
        }
    });
});