document.addEventListener('DOMContentLoaded', function() {
    const requestForm = document.getElementById('request-form');
    const fileUpload = document.querySelector('.file-upload input[type="file"]');
    const fileLabel = document.querySelector('.file-upload-label span');

    // File Upload Handling
    fileUpload.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const fileNames = files.map(file => file.name).join(', ');
            fileLabel.textContent = `Selected files: ${fileNames}`;
        } else {
            fileLabel.textContent = 'Drop files here or click to upload';
        }
    });

    // Drag and Drop Functionality
    const dropZone = document.querySelector('.file-upload');

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        dropZone.classList.add('highlight');
    }

    function unhighlight(e) {
        dropZone.classList.remove('highlight');
    }

    dropZone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        fileUpload.files = files;
        
        const fileNames = Array.from(files).map(file => file.name).join(', ');
        fileLabel.textContent = `Selected files: ${fileNames}`;
    }

    // Form Validation
    requestForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous error states
        clearErrors();

        // Validate required fields
        let isValid = true;
        const requiredFields = requestForm.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                showError(field, 'This field is required');
                isValid = false;
            }
        });

        // Validate file size
        const files = fileUpload.files;
        if (files.length > 0) {
            for (let file of files) {
                if (file.size > 5 * 1024 * 1024) { // 5MB limit
                    showError(fileUpload, 'File size should not exceed 5MB');
                    isValid = false;
                    break;
                }
            }
        }

        if (isValid) {
            // Show loading state
            const submitBtn = requestForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Posting...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                // Reset form and show success message
                requestForm.reset();
                fileLabel.textContent = 'Drop files here or click to upload';
                showSuccessMessage();

                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    });

    // Save as Draft Functionality
    window.saveAsDraft = function() {
        const formData = new FormData(requestForm);
        const draftData = {};

        formData.forEach((value, key) => {
            draftData[key] = value;
        });

        // Save to localStorage
        localStorage.setItem('requestDraft', JSON.stringify(draftData));

        // Show confirmation
        showMessage('Draft saved successfully!', 'success');
    };

    // Load draft if exists
    const savedDraft = localStorage.getItem('requestDraft');
    if (savedDraft) {
        const draftData = JSON.parse(savedDraft);
        Object.keys(draftData).forEach(key => {
            const field = requestForm.querySelector(`[name="${key}"]`);
            if (field) {
                field.value = draftData[key];
            }
        });
    }

    // Helper Functions
    function showError(field, message) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    function clearErrors() {
        requestForm.querySelectorAll('.error').forEach(field => {
            field.classList.remove('error');
        });
        requestForm.querySelectorAll('.error-message').forEach(message => {
            message.remove();
        });
    }

    function showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.innerHTML = `
            <div class="alert alert-success">
                <i class="fas fa-check-circle"></i>
                Your request has been posted successfully!
            </div>
        `;
        requestForm.parentNode.insertBefore(message, requestForm);

        // Remove message after 5 seconds
        setTimeout(() => {
            message.remove();
        }, 5000);
    }

    function showMessage(text, type) {
        const message = document.createElement('div');
        message.className = `alert alert-${type}`;
        message.innerHTML = `<i class="fas fa-info-circle"></i> ${text}`;
        requestForm.parentNode.insertBefore(message, requestForm);

        setTimeout(() => {
            message.remove();
        }, 3000);
    }
});