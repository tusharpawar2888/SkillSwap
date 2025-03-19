const PAYMENT_CONFIG = {
    // Razorpay API Keys (Replace with actual keys in production)
    RAZORPAY_KEY_ID: 'YOUR_RAZORPAY_KEY_ID',
    RAZORPAY_KEY_SECRET: 'YOUR_RAZORPAY_KEY_SECRET',
    
    // Commission Rates (in percentage)
    COMMISSION_RATES: {
        BASIC_SELLER: 10, // 10% commission for basic sellers
        PREMIUM_SELLER: 7, // 7% commission for premium sellers
    },
    
    // Transaction Fees (in INR)
    TRANSACTION_FEE: 5, // ₹5 per transaction
    
    // Minimum withdrawal amounts (in INR)
    MIN_WITHDRAWAL: {
        SELLER: 1000, // Minimum ₹1000 for sellers to withdraw
        PLATFORM: 5000, // Minimum ₹5000 for platform owner to withdraw
    },
    
    // Premium Seller Subscription
    PREMIUM_SELLER_FEE: {
        MONTHLY: 999, // ₹999 per month
        YEARLY: 9999, // ₹9999 per year (Save ₹1989)
    },
    
    // Featured Listing Fees
    FEATURED_LISTING_FEE: {
        DAILY: 99, // ₹99 per day
        WEEKLY: 599, // ₹599 per week
        MONTHLY: 1999, // ₹1999 per month
    }
};

export default PAYMENT_CONFIG; 