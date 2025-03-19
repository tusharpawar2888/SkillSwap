document.addEventListener('DOMContentLoaded', function() {
    // View Toggle Functionality
    const viewToggles = document.querySelectorAll('.view-toggle');
    const skillsGrid = document.querySelector('.skills-grid');

    viewToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            // Remove active class from all toggles
            viewToggles.forEach(t => t.classList.remove('active'));
            // Add active class to clicked toggle
            this.classList.add('active');

            // Change view based on selected option
            const view = this.dataset.view;
            if (view === 'list') {
                skillsGrid.style.gridTemplateColumns = '1fr';
            } else {
                skillsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
            }
        });
    });

    // Search Functionality
    const searchInput = document.querySelector('.filter-input');
    const categorySelect = document.querySelector('.filter-select');
    const searchSubmit = document.querySelector('.search-submit');

    searchSubmit.addEventListener('click', function() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value;

        // Get all skill cards
        const skillCards = document.querySelectorAll('.skill-card');

        skillCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const category = card.dataset.category;

            const matchesSearch = searchTerm === '' || title.includes(searchTerm);
            const matchesCategory = selectedCategory === '' || category === selectedCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Load More Functionality
    const loadMoreBtn = document.querySelector('.load-more .btn');
    let currentPage = 1;

    loadMoreBtn.addEventListener('click', function() {
        currentPage++;
        // Simulate loading more items
        loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';

        // Simulated API call delay
        setTimeout(() => {
            // Add new items to the grid (this would normally come from an API)
            for (let i = 0; i < 3; i++) {
                const newCard = createSkillCard();
                skillsGrid.appendChild(newCard);
            }

            loadMoreBtn.innerHTML = '<i class="fas fa-spinner"></i> Load More Skills';

            // Hide load more button after certain number of pages
            if (currentPage >= 3) {
                loadMoreBtn.style.display = 'none';
            }
        }, 1000);
    });

    // Helper function to create a new skill card
    function createSkillCard() {
        const card = document.createElement('div');
        card.className = 'skill-card';
        // Add sample content (this would normally come from the backend)
        card.innerHTML = `
            <div class="skill-header">
                <img src="images/sample-skill.jpg" alt="Sample Skill">
                <div class="skill-rating">
                    <i class="fas fa-star"></i>
                    <span>4.8</span>
                </div>
            </div>
            <div class="skill-info">
                <h3>Sample Skill</h3>
                <p class="skill-description">This is a sample skill description</p>
                <div class="skill-meta">
                    <span><i class="fas fa-user-graduate"></i> 30+ Tutors</span>
                    <span><i class="fas fa-users"></i> 500+ Students</span>
                </div>
                <div class="skill-level">
                    <span class="level beginner">Beginner</span>
                    <span class="level intermediate">Intermediate</span>
                </div>
                <a href="#" class="btn btn-primary">Learn More</a>
            </div>
        `;
        return card;
    }

    // Category Card Hover Effects
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Topic Tags Click Handler
    const topicTags = document.querySelectorAll('.topic-tag');
    topicTags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            const topic = this.textContent;
            searchInput.value = topic;
            // Trigger search
            searchSubmit.click();
        });
    });
});