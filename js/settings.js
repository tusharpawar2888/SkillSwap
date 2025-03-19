document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const menuItems = document.querySelectorAll('.settings-menu li');
    const sections = document.querySelectorAll('.settings-section');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all menu items and sections
            menuItems.forEach(i => i.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked item and corresponding section
            item.classList.add('active');
            const tabId = item.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Profile picture upload
    const uploadButton = document.querySelector('.profile-picture-upload button');
    const fileInput = document.querySelector('.profile-picture-upload input[type="file"]');
    const profileImage = document.querySelector('.profile-picture-upload img');

    if (uploadButton && fileInput) {
        uploadButton.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profileImage.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Skills tags functionality
    const skillsInput = document.querySelector('.skills-input input');
    const skillsTags = document.querySelector('.skills-tags');

    if (skillsInput) {
        skillsInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && skillsInput.value.trim() !== '') {
                e.preventDefault();
                addSkillTag(skillsInput.value.trim());
                skillsInput.value = '';
            }
        });
    }

    // Remove skill tag
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-times')) {
            e.target.parentElement.remove();
        }
    });

    function addSkillTag(skill) {
        const span = document.createElement('span');
        span.innerHTML = `${skill}<i class="fas fa-times"></i>`;
        skillsTags.appendChild(span);
    }

    // Form submission handling
    const forms = document.querySelectorAll('.settings-form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Show success message
            showNotification('Changes saved successfully!');
        });
    });

    // Password validation
    const newPasswordInput = document.querySelector('input[placeholder="New Password"]');
    const confirmPasswordInput = document.querySelector('input[placeholder="Confirm New Password"]');

    if (newPasswordInput && confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', () => {
            if (newPasswordInput.value !== confirmPasswordInput.value) {
                confirmPasswordInput.setCustomValidity('Passwords do not match');
            } else {
                confirmPasswordInput.setCustomValidity('');
            }
        });
    }

    // Payment method functionality
    const addPaymentButton = document.querySelector('.add-payment-method');
    if (addPaymentButton) {
        addPaymentButton.addEventListener('click', () => {
            // Implement payment method addition logic
            showNotification('Payment method addition will be implemented with backend integration');
        });
    }

    // Remove payment method
    const removeCardButtons = document.querySelectorAll('.remove-card');
    removeCardButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (confirm('Are you sure you want to remove this payment method?')) {
                button.closest('.payment-card').remove();
                showNotification('Payment method removed successfully');
            }
        });
    });

    // Notification system
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.5s ease-out;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }

    // Add necessary styles for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Dark mode toggle
    const darkModeToggle = document.querySelector('input[type="checkbox"][checked]');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            document.body.classList.toggle('dark-mode');
            showNotification(darkModeToggle.checked ? 'Dark mode enabled' : 'Dark mode disabled');
        });
    }
});