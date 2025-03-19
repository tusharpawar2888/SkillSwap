document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const userMenu = document.querySelector('.user-menu');
    const authButtons = document.querySelector('.auth-buttons');
    const avatar = document.querySelector('.avatar');
    const userDropdown = document.querySelector('.user-dropdown');
    const logoutButton = document.querySelector('.logout');
    const profileEmail = document.querySelector('.profile-email');

    // Check login status on page load
    checkLoginStatus();

    // Toggle dropdown when clicking on avatar
    if (avatar) {
        avatar.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            userDropdown.classList.toggle('show');
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (userDropdown && userDropdown.classList.contains('show') && !userMenu.contains(e.target)) {
            userDropdown.classList.remove('show');
        }
    });

    // Handle logout
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }

    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userEmail = localStorage.getItem('userEmail');

        if (isLoggedIn && userEmail) {
            // Show user menu
            if (userMenu) userMenu.classList.remove('hidden');
            // Hide auth buttons
            if (authButtons) authButtons.classList.add('hidden');
            // Update email display
            if (profileEmail) profileEmail.textContent = userEmail;
        } else {
            // Hide user menu
            if (userMenu) userMenu.classList.add('hidden');
            // Show auth buttons
            if (authButtons) authButtons.classList.remove('hidden');
        }
    }

    function logout() {
        // Clear login state
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        
        // Update UI
        checkLoginStatus();
        
        // Close dropdown if open
        if (userDropdown) {
            userDropdown.classList.remove('show');
        }
        
        // Redirect to home page
        window.location.href = 'index.html';
    }
});