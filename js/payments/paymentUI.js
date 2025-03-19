import paymentService from './paymentService.js';

class PaymentUI {
    constructor() {
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Listen for payment button clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('.payment-button')) {
                this.handlePaymentButtonClick(e);
            }
        });
    }

    async handlePaymentButtonClick(event) {
        event.preventDefault();
        const button = event.target;
        const amount = parseFloat(button.dataset.amount);
        const sellerId = button.dataset.sellerId;
        const serviceId = button.dataset.serviceId;
        const buyerId = this.getCurrentUserId(); // Implement this method

        try {
            // Show loading state
            this.showLoadingState(button);

            // Initiate payment
            const paymentDetails = await paymentService.initiatePayment({
                amount,
                seller_id: sellerId,
                buyer_id: buyerId,
                service_id: serviceId
            });

            // Configure Razorpay options
            const options = {
                key: PAYMENT_CONFIG.RAZORPAY_KEY_ID,
                amount: paymentDetails.payment_details.amount,
                currency: paymentDetails.payment_details.currency,
                name: 'SkillSwap',
                description: 'Service Payment',
                order_id: paymentDetails.order_id,
                handler: (response) => this.handlePaymentSuccess(response),
                prefill: {
                    name: this.getCurrentUserName(), // Implement this method
                    email: this.getCurrentUserEmail(), // Implement this method
                    contact: this.getCurrentUserPhone() // Implement this method
                },
                theme: {
                    color: '#2563eb'
                }
            };

            // Open Razorpay payment form
            const razorpayInstance = new Razorpay(options);
            razorpayInstance.open();

        } catch (error) {
            this.handlePaymentError(error);
        } finally {
            this.hideLoadingState(button);
        }
    }

    async handlePaymentSuccess(response) {
        try {
            // Process the successful payment
            const result = await paymentService.processPayment(response);
            
            // Show success message
            this.showSuccessMessage('Payment successful! Your order has been confirmed.');
            
            // Update UI elements
            this.updateUIAfterPayment(result);
            
        } catch (error) {
            this.handlePaymentError(error);
        }
    }

    handlePaymentError(error) {
        console.error('Payment failed:', error);
        this.showErrorMessage('Payment failed. Please try again.');
    }

    showLoadingState(button) {
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    }

    hideLoadingState(button) {
        button.disabled = false;
        button.innerHTML = 'Pay Now';
    }

    showSuccessMessage(message) {
        // Implement your success message UI
        const toast = document.createElement('div');
        toast.className = 'toast toast-success';
        toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 5000);
    }

    showErrorMessage(message) {
        // Implement your error message UI
        const toast = document.createElement('div');
        toast.className = 'toast toast-error';
        toast.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 5000);
    }

    updateUIAfterPayment(result) {
        // Update any UI elements that need to reflect the payment
        // This could include order status, balance, etc.
    }

    getCurrentUserId() {
        // Implement getting current user ID from your auth system
        return localStorage.getItem('userId');
    }

    getCurrentUserName() {
        // Implement getting current user name
        return localStorage.getItem('userName');
    }

    getCurrentUserEmail() {
        // Implement getting current user email
        return localStorage.getItem('userEmail');
    }

    getCurrentUserPhone() {
        // Implement getting current user phone
        return localStorage.getItem('userPhone');
    }
}

export default new PaymentUI(); 