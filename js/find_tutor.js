document.addEventListener('DOMContentLoaded', function() {
    // View Toggle Functionality
    const viewToggles = document.querySelectorAll('.view-toggle');
    const tutorGrid = document.querySelector('.tutor-grid');

    viewToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            // Remove active class from all toggles
            viewToggles.forEach(t => t.classList.remove('active'));
            // Add active class to clicked toggle
            this.classList.add('active');

            // Toggle grid/list view
            const view = this.dataset.view;
            if (view === 'list') {
                tutorGrid.classList.add('list-view');
            } else {
                tutorGrid.classList.remove('list-view');
            }
        });
    });

    // Filter Functionality
    const filterInputs = document.querySelectorAll('.filter-input, .filter-select');
    const searchSubmit = document.querySelector('.search-submit');

    searchSubmit.addEventListener('click', function() {
        // Collect filter values
        const filters = {};
        filterInputs.forEach(input => {
            filters[input.name] = input.value;
        });

        // Simulate filter application
        applyFilters(filters);
    });

    function applyFilters(filters) {
        // Add loading state
        searchSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
        searchSubmit.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            // Reset button state
            searchSubmit.innerHTML = '<i class="fas fa-search"></i> Search Tutors';
            searchSubmit.disabled = false;

            // You would typically make an API call here and update the results
            console.log('Applying filters:', filters);
        }, 1000);
    }

    // Load More Functionality
    const loadMoreBtn = document.querySelector('.load-more .btn');
    let page = 1;

    loadMoreBtn.addEventListener('click', function() {
        // Add loading state
        loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        loadMoreBtn.disabled = true;

        // Simulate loading delay
        setTimeout(() => {
            // Reset button state
            loadMoreBtn.innerHTML = '<i class="fas fa-spinner"></i> Load More Tutors';
            loadMoreBtn.disabled = false;
            page++;

            // You would typically make an API call here and append new results
            console.log('Loading page:', page);
        }, 1000);
    });

    // Video Preview Functionality
    const playButtons = document.querySelectorAll('.play-intro');

    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoUrl = this.dataset.video;
            openVideoModal(videoUrl);
        });
    });

    function openVideoModal(videoUrl) {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-modal">&times;</button>
                <video controls>
                    <source src="${videoUrl}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        `;

        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .video-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
            }
            .modal-content {
                position: relative;
                width: 90%;
                max-width: 800px;
                background: white;
                border-radius: 1rem;
                overflow: hidden;
            }
            .close-modal {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: white;
                border: none;
                font-size: 1.5rem;
                width: 2rem;
                height: 2rem;
                border-radius: 50%;
                cursor: pointer;
                z-index: 1;
            }
            .modal-content video {
                width: 100%;
                display: block;
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(modal);

        // Close modal functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Availability Status Update
    function updateAvailabilityStatus() {
        const tutors = document.querySelectorAll('.tutor-card');
        
        tutors.forEach(tutor => {
            const status = tutor.querySelector('.tutor-status');
            const availability = tutor.querySelector('.availability span');
            
            // Simulate random availability updates
            if (Math.random() > 0.5) {
                status.className = 'tutor-status online';
                availability.textContent = 'Available Now';
            } else {
                status.className = 'tutor-status busy';
                availability.textContent = 'Next Available: In 2 hours';
            }
        });
    }

    // Update availability status periodically
    setInterval(updateAvailabilityStatus, 30000); // Every 30 seconds

    // Update all Book Now buttons to include tutor information
    const tutorCards = document.querySelectorAll('.tutor-card');
    
    tutorCards.forEach(card => {
        const bookButton = card.querySelector('.btn-primary');
        if (bookButton) {
            const tutorInfo = {
                tutor_id: card.dataset.tutorId || generateTutorId(),
                tutor_name: card.querySelector('h3').textContent,
                specialty: card.querySelector('.specialty').textContent,
                rating: card.querySelector('.tutor-rating span').textContent,
                sessions: card.querySelector('.sessions').textContent.split('+')[0],
                rate: card.dataset.rate || '500', // Default rate if not specified
                premium: card.classList.contains('premium-tutor')
            };
            
            const bookingUrl = `book.html?${new URLSearchParams(tutorInfo).toString()}`;
            bookButton.href = bookingUrl;
        }
    });
});

// Helper function to generate a unique tutor ID if not provided
function generateTutorId() {
    return 'tutor_' + Math.random().toString(36).substr(2, 9);
}

// Function to load more tutors (implement as needed)
async function loadMoreTutors() {
    const loadMoreBtn = document.querySelector('.load-more button');
    
    try {
        loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        
        // Implement your logic to fetch more tutors
        // This is a placeholder for demonstration
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Add new tutor cards to the grid
        const tutorGrid = document.querySelector('.tutor-grid');
        // Add your new tutor cards here
        
        loadMoreBtn.innerHTML = '<i class="fas fa-spinner"></i> Load More Tutors';
    } catch (error) {
        console.error('Failed to load more tutors:', error);
        loadMoreBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error Loading More';
    }
}

// Search functionality
const searchForm = document.querySelector('.advanced-search');
if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const searchData = {
            subject: searchForm.querySelector('input[type="text"]').value,
            category: searchForm.querySelector('select:nth-of-type(1)').value,
            experience: searchForm.querySelector('select:nth-of-type(2)').value,
            priceRange: searchForm.querySelector('select:nth-of-type(3)').value
        };
        
        // Implement your search logic here
        console.log('Search data:', searchData);
    });
}

// Filter functionality
const filters = document.querySelectorAll('.filter-select, .filter-input');
filters.forEach(filter => {
    filter.addEventListener('change', function() {
        // Implement your filter logic here
        console.log('Filter changed:', this.value);
    });
});