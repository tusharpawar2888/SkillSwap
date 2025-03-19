document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            this.classList.toggle('active');
        });
    });

    // Intersection Observer for animations
    const animatedElements = document.querySelectorAll('.benefit-card, .step, .testimonial-card, .faq-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    animatedElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });

    // Smooth scroll for CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add hover effect to benefit cards
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    benefitCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    let ticking = false;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.5;
                
                if (hero) {
                    hero.style.backgroundPosition = `center ${rate}px`;
                }
                
                ticking = false;
            });

            ticking = true;
        }
    });

    const form = document.getElementById('tutorRegistrationForm');
    const premiumToggle = document.getElementById('premiumOption');

    // Initialize file input styling
    initializeFileInputs();
    
    // Initialize FAQ accordion
    initializeFAQ();

    // Form validation and submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Processing...';
        submitButton.disabled = true;

        try {
            // Create FormData object
            const formData = new FormData(form);
            
            // Add premium status
            formData.append('isPremium', premiumToggle.checked);

            // Simulate API call (replace with actual API endpoint)
            await submitTutorApplication(formData);

            // Show success message
            showNotification('Application submitted successfully! We will review your application and get back to you soon.', 'success');
            
            // Reset form
            form.reset();

        } catch (error) {
            showNotification('There was an error submitting your application. Please try again.', 'error');
        } finally {
            // Reset button state
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });

    // File input preview
    document.getElementById('profilePhoto').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                showNotification('Please select an image file.', 'error');
                this.value = '';
                return;
            }
            // You can add image preview functionality here if needed
        }
    });

    // Documents validation
    document.getElementById('documents').addEventListener('change', function(e) {
        const files = e.target.files;
        const maxSize = 5 * 1024 * 1024; // 5MB limit
        
        for (let file of files) {
            if (file.size > maxSize) {
                showNotification('Each document must be less than 5MB.', 'error');
                this.value = '';
                return;
            }
        }
    });
});

function validateForm() {
    const requiredFields = document.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            showFieldError(field, 'This field is required');
        } else {
            field.classList.remove('error');
            removeFieldError(field);
        }
    });

    // Validate email format
    const emailField = document.getElementById('email');
    if (emailField.value && !isValidEmail(emailField.value)) {
        isValid = false;
        emailField.classList.add('error');
        showFieldError(emailField, 'Please enter a valid email address');
    }

    // Validate phone format
    const phoneField = document.getElementById('phone');
    if (phoneField.value && !isValidPhone(phoneField.value)) {
        isValid = false;
        phoneField.classList.add('error');
        showFieldError(phoneField, 'Please enter a valid phone number');
    }

    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^[0-9]{10}$/.test(phone.replace(/[^0-9]/g, ''));
}

function showFieldError(field, message) {
    const errorDiv = field.parentElement.querySelector('.error-message') || 
                    document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    if (!field.parentElement.querySelector('.error-message')) {
        field.parentElement.appendChild(errorDiv);
    }
}

function removeFieldError(field) {
    const errorDiv = field.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

async function submitTutorApplication(formData) {
    // Replace with your actual API endpoint
    const response = await fetch('/api/tutor/register', {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error('Failed to submit application');
    }

    return await response.json();
}

function initializeFileInputs() {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        const wrapper = document.createElement('div');
        wrapper.className = 'file-input-wrapper';
        
        const label = document.createElement('label');
        label.className = 'file-input-label';
        label.innerHTML = `<i class="fas fa-upload"></i> Choose File`;
        
        const fileInfo = document.createElement('span');
        fileInfo.className = 'file-info';
        fileInfo.textContent = 'No file chosen';
        
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);
        wrapper.appendChild(label);
        wrapper.appendChild(fileInfo);
        
        input.addEventListener('change', function() {
            const fileName = this.files.length > 0 ? 
                           (this.files.length > 1 ? `${this.files.length} files selected` : this.files[0].name) : 
                           'No file chosen';
            fileInfo.textContent = fileName;
        });
    });
}

function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Toggle clicked item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}