document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-container input');
    const searchButton = document.querySelector('.search-container button');
    const faqQuestions = document.querySelectorAll('.faq-question h3');
    const topicCards = document.querySelectorAll('.topic-card');

    function performSearch(searchTerm) {
        searchTerm = searchTerm.toLowerCase();

        // Search in FAQ questions
        faqQuestions.forEach(question => {
            const questionText = question.textContent.toLowerCase();
            const faqItem = question.closest('.faq-item');
            
            if (questionText.includes(searchTerm)) {
                faqItem.style.display = 'block';
                // Highlight matching text
                const regex = new RegExp(searchTerm, 'gi');
                question.innerHTML = question.textContent.replace(
                    regex,
                    match => `<span class="highlight">${match}</span>`
                );
            } else {
                faqItem.style.display = 'none';
            }
        });

        // Search in topic cards
        topicCards.forEach(card => {
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardDesc = card.querySelector('p').textContent.toLowerCase();
            
            if (cardTitle.includes(searchTerm) || cardDesc.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Show no results message if needed
        const noResults = document.querySelector('.no-results');
        const hasVisibleResults = [...faqQuestions].some(q => 
            q.closest('.faq-item').style.display !== 'none'
        ) || [...topicCards].some(c => c.style.display !== 'none');

        if (!hasVisibleResults) {
            if (!noResults) {
                const message = document.createElement('div');
                message.className = 'no-results';
                message.innerHTML = `
                    <p>No results found for "${searchTerm}"</p>
                    <p>Try different keywords or browse our popular topics</p>
                `;
                document.querySelector('.help-content').insertBefore(
                    message,
                    document.querySelector('.popular-topics')
                );
            }
        } else if (noResults) {
            noResults.remove();
        }
    }

    // Search on button click
    searchButton.addEventListener('click', () => {
        performSearch(searchInput.value.trim());
    });

    // Search on enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value.trim());
        }
    });

    // Live search (optional, for better user experience)
    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(searchInput.value.trim());
        }, 300);
    });

    // Support buttons functionality
    const supportButtons = document.querySelectorAll('.support-btn');
    
    supportButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const action = e.target.textContent.toLowerCase();
            
            switch(action) {
                case 'contact support':
                    window.location.href = 'mailto:support@skillswap.com';
                    break;
                case 'start chat':
                    initializeChat();
                    break;
                case 'call support':
                    showPhoneNumber();
                    break;
            }
        });
    });

    function initializeChat() {
        // Create chat widget
        const chatWidget = document.createElement('div');
        chatWidget.className = 'chat-widget';
        chatWidget.innerHTML = `
            <div class="chat-header">
                <h4>Live Chat Support</h4>
                <button class="close-chat">&times;</button>
            </div>
            <div class="chat-messages">
                <p class="system-message">Connecting to support...</p>
            </div>
            <div class="chat-input">
                <input type="text" placeholder="Type your message..." disabled>
                <button disabled>Send</button>
            </div>
        `;
        
        document.body.appendChild(chatWidget);

        // Add chat widget styles
        const style = document.createElement('style');
        style.textContent = `
            .chat-widget {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 300px;
                height: 400px;
                background: white;
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(0,0,0,0.2);
                display: flex;
                flex-direction: column;
                z-index: 1000;
            }
            .chat-header {
                padding: 15px;
                background: #0066cc;
                color: white;
                border-radius: 10px 10px 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .close-chat {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
            }
            .chat-messages {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
            }
            .system-message {
                text-align: center;
                color: #666;
                font-style: italic;
            }
            .chat-input {
                padding: 15px;
                display: flex;
                gap: 10px;
            }
            .chat-input input {
                flex: 1;
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 5px;
            }
            .chat-input button {
                padding: 8px 15px;
                background: #0066cc;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            .chat-input button:disabled {
                background: #ccc;
            }
        `;
        document.head.appendChild(style);

        // Close chat functionality
        const closeButton = chatWidget.querySelector('.close-chat');
        closeButton.addEventListener('click', () => {
            chatWidget.remove();
        });

        // Simulate connecting to support
        setTimeout(() => {
            const messages = chatWidget.querySelector('.chat-messages');
            messages.innerHTML = `
                <p class="system-message">Connected to support</p>
                <p class="system-message">A support agent will be with you shortly...</p>
            `;
        }, 2000);
    }

    function showPhoneNumber() {
        const phoneOverlay = document.createElement('div');
        phoneOverlay.className = 'phone-overlay';
        phoneOverlay.innerHTML = `
            <div class="phone-modal">
                <h3>Contact Support</h3>
                <p>Call us at: <strong>1-800-SKILLSWAP</strong></p>
                <p class="hours">Available Monday-Friday, 9AM-5PM EST</p>
                <button class="close-modal">Close</button>
            </div>
        `;
        
        document.body.appendChild(phoneOverlay);

        // Add overlay styles
        const style = document.createElement('style');
        style.textContent = `
            .phone-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            .phone-modal {
                background: white;
                padding: 30px;
                border-radius: 10px;
                text-align: center;
            }
            .phone-modal h3 {
                margin-bottom: 15px;
                color: #333;
            }
            .phone-modal .hours {
                color: #666;
                font-size: 0.9em;
                margin-top: 10px;
            }
            .close-modal {
                margin-top: 20px;
                padding: 8px 20px;
                background: #0066cc;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            .close-modal:hover {
                background: #0052a3;
            }
        `;
        document.head.appendChild(style);

        // Close modal functionality
        const closeButton = phoneOverlay.querySelector('.close-modal');
        closeButton.addEventListener('click', () => {
            phoneOverlay.remove();
        });

        // Close on overlay click
        phoneOverlay.addEventListener('click', (e) => {
            if (e.target === phoneOverlay) {
                phoneOverlay.remove();
            }
        });
    }
});