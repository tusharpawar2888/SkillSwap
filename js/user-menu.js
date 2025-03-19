document.addEventListener('DOMContentLoaded', function() {
    const userMenu = document.querySelector('.user-menu');
    const loginButton = document.querySelector('.login-button');
    const avatar = document.querySelector('.avatar');
    
    // Check login status on page load
    checkLoginStatus();

    // Toggle dropdown when clicking on avatar
    if (avatar) {
        avatar.addEventListener('click', function() {
            const dropdown = document.querySelector('.user-dropdown');
            dropdown.classList.toggle('show');
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!userMenu.contains(e.target)) {
            const dropdown = document.querySelector('.user-dropdown');
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        }
    });

    // Handle logout
    const logoutButton = document.querySelector('.logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Clear login state
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            
            // Redirect to home page
            window.location.href = 'index.html';
        });
    }

    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        
        if (isLoggedIn) {
            if (userMenu) userMenu.classList.remove('hidden');
            if (loginButton) loginButton.classList.add('hidden');
            
            // Update user email in the menu if available
            const userEmail = localStorage.getItem('userEmail');
            const profileLink = document.querySelector('.user-dropdown .profile-email');
            if (profileLink && userEmail) {
                profileLink.textContent = userEmail;
            }
        } else {
            if (userMenu) userMenu.classList.add('hidden');
            if (loginButton) loginButton.classList.remove('hidden');
        }
    }
});