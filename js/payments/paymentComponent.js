class PaymentComponent {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            amount: 0,
            sellerId: '',
            serviceId: '',
            sellerType: 'BASIC_SELLER',
            tutorName: '',
            sessionDuration: 60,
            sessionType: 'online',
            sessionDateTime: '',
            subject: '',
            ...options
        };
        this.render();
    }

    calculateBreakdown() {
        const amount = this.options.amount;
        const commissionRate = this.options.sellerType === 'PREMIUM_SELLER' ? 7 : 10;
        const commission = (amount * commissionRate) / 100;
        const transactionFee = 5; // ₹5 fixed fee
        const gst = (amount * 18) / 100; // 18% GST

        return {
            subtotal: amount,
            commission: commission,
            transactionFee: transactionFee,
            gst: gst,
            total: amount + commission + transactionFee + gst
        };
    }

    formatDateTime(dateTimeStr) {
        if (!dateTimeStr) return '';
        const dt = new Date(dateTimeStr);
        return dt.toLocaleString('en-IN', {
            dateStyle: 'full',
            timeStyle: 'short'
        });
    }

    render() {
        const breakdown = this.calculateBreakdown();
        
        this.container.innerHTML = `
            <div class="payment-summary">
                <!-- Session Summary Section -->
                <div class="session-summary">
                    <h3>Session Summary</h3>
                    <div class="session-details">
                        <div class="session-detail-row">
                            <i class="fas fa-user-graduate"></i>
                            <div>
                                <strong>Tutor</strong>
                                <span>${this.options.tutorName}</span>
                            </div>
                        </div>
                        <div class="session-detail-row">
                            <i class="fas fa-clock"></i>
                            <div>
                                <strong>Duration</strong>
                                <span>${this.options.sessionDuration} minutes</span>
                            </div>
                        </div>
                        <div class="session-detail-row">
                            <i class="fas fa-video"></i>
                            <div>
                                <strong>Session Type</strong>
                                <span>${this.options.sessionType === 'online' ? 'Online Session' : 'In-Person Session'}</span>
                            </div>
                        </div>
                        ${this.options.sessionDateTime ? `
                            <div class="session-detail-row">
                                <i class="fas fa-calendar-alt"></i>
                                <div>
                                    <strong>Schedule</strong>
                                    <span>${this.formatDateTime(this.options.sessionDateTime)}</span>
                                </div>
                            </div>
                        ` : ''}
                        ${this.options.subject ? `
                            <div class="session-detail-row">
                                <i class="fas fa-book"></i>
                                <div>
                                    <strong>Subject</strong>
                                    <span>${this.options.subject}</span>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>

                <!-- Payment Breakdown Section -->
                <div class="payment-breakdown">
                    <h3>Payment Breakdown</h3>
                    <div class="payment-details">
                        <div class="payment-detail-row">
                            <span>Base Amount</span>
                            <span>₹${breakdown.subtotal.toFixed(2)}</span>
                        </div>
                        <div class="payment-detail-row">
                            <span>Platform Fee (${this.options.sellerType === 'PREMIUM_SELLER' ? '7' : '10'}%)</span>
                            <span>₹${breakdown.commission.toFixed(2)}</span>
                        </div>
                        <div class="payment-detail-row">
                            <span>Transaction Fee</span>
                            <span>₹${breakdown.transactionFee.toFixed(2)}</span>
                        </div>
                        <div class="payment-detail-row">
                            <span>GST (18%)</span>
                            <span>₹${breakdown.gst.toFixed(2)}</span>
                        </div>
                        <div class="payment-detail-row total-row">
                            <strong>Total Amount</strong>
                            <strong>₹${breakdown.total.toFixed(2)}</strong>
                        </div>
                    </div>
                </div>

                ${this.options.sellerType === 'PREMIUM_SELLER' ? `
                    <div class="premium-seller-badge">
                        <i class="fas fa-star"></i>
                        Premium Seller
                    </div>
                ` : ''}

                <div class="commission-info">
                    <h4>Fee Breakdown</h4>
                    <p class="commission-rate">
                        This tutor is charged a ${this.options.sellerType === 'PREMIUM_SELLER' ? '7' : '10'}% platform fee 
                        ${this.options.sellerType !== 'PREMIUM_SELLER' ? 
                            `<br><small>(Premium tutors are charged only 7%)</small>` : 
                            ''}
                    </p>
                </div>

                <!-- Payment Actions -->
                <div class="payment-actions">
                    <button class="payment-button" 
                            data-amount="${breakdown.total}"
                            data-seller-id="${this.options.sellerId}"
                            data-service-id="${this.options.serviceId}">
                        <i class="fas fa-lock"></i>
                        Pay Securely
                    </button>
                    <div class="secure-payment-info">
                        <i class="fas fa-shield-alt"></i>
                        <span>Secure payment powered by Razorpay</span>
                    </div>
                </div>

                <!-- Cancellation Policy -->
                <div class="cancellation-policy">
                    <h4><i class="fas fa-info-circle"></i> Cancellation Policy</h4>
                    <ul>
                        <li>Free cancellation up to 24 hours before the session</li>
                        <li>50% refund for cancellations between 24 and 12 hours before the session</li>
                        <li>No refund for cancellations less than 12 hours before the session</li>
                    </ul>
                </div>
            </div>
        `;
    }

    static init(containerId, options) {
        return new PaymentComponent(containerId, options);
    }
}

export default PaymentComponent; 