import PAYMENT_CONFIG from './config.js';

class PaymentService {
    constructor() {
        this.razorpay = null;
        this.initRazorpay();
    }

    async initRazorpay() {
        // Initialize Razorpay
        this.razorpay = new Razorpay({
            key_id: PAYMENT_CONFIG.RAZORPAY_KEY_ID,
        });
    }

    calculateCommission(amount, sellerType = 'BASIC_SELLER') {
        const commissionRate = PAYMENT_CONFIG.COMMISSION_RATES[sellerType];
        const commission = (amount * commissionRate) / 100;
        const transactionFee = PAYMENT_CONFIG.TRANSACTION_FEE;
        
        return {
            totalAmount: amount,
            commission: commission,
            transactionFee: transactionFee,
            sellerEarnings: amount - commission - transactionFee,
            platformEarnings: commission + transactionFee
        };
    }

    async initiatePayment(orderDetails) {
        try {
            const { amount, currency = 'INR', seller_id, buyer_id, service_id } = orderDetails;
            
            // Calculate commission and fees
            const calculations = this.calculateCommission(amount, orderDetails.sellerType);
            
            // Create order in Razorpay
            const order = await this.razorpay.orders.create({
                amount: calculations.totalAmount * 100, // Amount in paise
                currency: currency,
                notes: {
                    seller_id,
                    buyer_id,
                    service_id,
                    commission: calculations.commission,
                    transaction_fee: calculations.transactionFee
                }
            });

            return {
                order_id: order.id,
                calculations,
                payment_details: order
            };
        } catch (error) {
            console.error('Payment initiation failed:', error);
            throw new Error('Failed to initiate payment');
        }
    }

    async processPayment(paymentResponse) {
        try {
            // Verify payment signature
            const isValid = this.verifyPaymentSignature(paymentResponse);
            
            if (!isValid) {
                throw new Error('Invalid payment signature');
            }

            // Record transaction in database
            await this.recordTransaction(paymentResponse);

            // Update seller's balance
            await this.updateSellerBalance(paymentResponse);

            return {
                success: true,
                message: 'Payment processed successfully',
                transaction_id: paymentResponse.razorpay_payment_id
            };
        } catch (error) {
            console.error('Payment processing failed:', error);
            throw new Error('Payment processing failed');
        }
    }

    verifyPaymentSignature(paymentResponse) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentResponse;
        
        // Generate signature verification hash
        const generatedSignature = crypto
            .createHmac('sha256', PAYMENT_CONFIG.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');
        
        return generatedSignature === razorpay_signature;
    }

    async recordTransaction(paymentResponse) {
        // Implementation for recording transaction in database
        // This would typically involve your database operations
    }

    async updateSellerBalance(paymentResponse) {
        // Implementation for updating seller's balance
        // This would typically involve your database operations
    }

    async processSellerWithdrawal(sellerId, amount) {
        try {
            // Check minimum withdrawal amount
            if (amount < PAYMENT_CONFIG.MIN_WITHDRAWAL.SELLER) {
                throw new Error(`Minimum withdrawal amount is ₹${PAYMENT_CONFIG.MIN_WITHDRAWAL.SELLER}`);
            }

            // Process withdrawal (implement your bank transfer logic here)
            // This is a placeholder for actual bank transfer implementation
            const withdrawal = await this.initiateSellerBankTransfer(sellerId, amount);

            return {
                success: true,
                message: 'Withdrawal processed successfully',
                withdrawal_id: withdrawal.id
            };
        } catch (error) {
            console.error('Withdrawal processing failed:', error);
            throw new Error('Withdrawal processing failed');
        }
    }

    async initiateSellerBankTransfer(sellerId, amount) {
        // Implementation for bank transfer
        // This would typically involve your payment gateway's payout API
    }
}

export default new PaymentService(); 