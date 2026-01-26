'use client';

import React from 'react';
import styles from './PaymentForm.module.scss';

/**
 * PaymentForm Component
 * Form for collecting credit card payment information
 * 
 * @param {Object} props
 * @param {string} props.cardNumber - Current card number value
 * @param {Function} props.onCardNumberChange - Handler for card number changes
 * @param {string} props.holderName - Current holder name value
 * @param {Function} props.onHolderNameChange - Handler for holder name changes
 * @param {string} props.expiryMonth - Current expiry month value
 * @param {Function} props.onExpiryMonthChange - Handler for expiry month changes
 * @param {string} props.expiryYear - Current expiry year value
 * @param {Function} props.onExpiryYearChange - Handler for expiry year changes
 * @param {string} props.cvv - Current CVV value
 * @param {Function} props.onCvvChange - Handler for CVV changes
 * @param {Function} props.onSubmit - Handler for form submission
 */
const PaymentForm = ({
    cardNumber,
    onCardNumberChange,
    holderName,
    onHolderNameChange,
    expiryMonth,
    onExpiryMonthChange,
    expiryYear,
    onExpiryYearChange,
    cvv,
    onCvvChange,
    onSubmit
}) => {
    /**
     * Format card number input with spaces
     * @param {string} value - Raw input value
     * @returns {string} Formatted card number
     */
    const formatCardNumber = (value) => {
        const digits = value.replace(/\D/g, '').slice(0, 16);
        const groups = digits.match(/.{1,4}/g);
        return groups ? groups.join(' ') : '';
    };

    /**
     * Handle card number input change
     * @param {Event} e - Input change event
     */
    const handleCardNumberChange = (e) => {
        const formatted = formatCardNumber(e.target.value);
        onCardNumberChange(formatted);
    };

    /**
     * Handle holder name input - uppercase only
     * @param {Event} e - Input change event
     */
    const handleHolderNameChange = (e) => {
        const value = e.target.value.toUpperCase().replace(/[^A-Z\s]/g, '').slice(0, 26);
        onHolderNameChange(value);
    };

    /**
     * Handle CVV input - numbers only, max 4 digits
     * @param {Event} e - Input change event
     */
    const handleCvvChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 4);
        onCvvChange(value);
    };

    /**
     * Handle form submission
     * @param {Event} e - Form submit event
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit({
                cardNumber: cardNumber.replace(/\s/g, ''),
                holderName,
                expiryMonth,
                expiryYear,
                cvv
            });
        }
    };

    /**
     * Determine active card brand for highlighting using official IIN ranges
     * @returns {string} Brand name or empty
     */
    const getActiveCardBrand = () => {
        const cleanNumber = cardNumber.replace(/\s/g, '');

        // Visa - starts with 4
        if (/^4/.test(cleanNumber)) return 'visa';

        // Mastercard - 51-55 range OR 2221-2720 range
        if (/^5[1-5]/.test(cleanNumber) || /^2[2-7]/.test(cleanNumber)) return 'mastercard';

        // American Express - 34 or 37
        if (/^3[47]/.test(cleanNumber)) return 'amex';

        // Discover - 6011, 65, or 644-649
        if (/^6(?:011|5|4[4-9])/.test(cleanNumber)) return 'discover';

        return '';
    };

    const activeBrand = getActiveCardBrand();

    // Generate month options
    const months = Array.from({ length: 12 }, (_, i) => {
        const month = (i + 1).toString().padStart(2, '0');
        return { value: month, label: month };
    });

    // Generate year options (current year + 10)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 11 }, (_, i) => {
        const year = (currentYear + i).toString().slice(-2);
        return { value: year, label: year };
    });

    return (
        <form className={styles.paymentForm} onSubmit={handleSubmit}>
            <div>
                <h2 className={styles.formTitle}>Payment Details</h2>
                <p className={styles.formSubtitle}>Enter your card information securely</p>
            </div>

            {/* Card Number Field */}
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="cardNumber">
                    Card Number
                </label>
                <div className={styles.inputWrapper}>
                    <input
                        id="cardNumber"
                        type="text"
                        className={`${styles.input} ${styles.cardNumber}`}
                        placeholder="0000 0000 0000 0000"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength={19}
                        autoComplete="cc-number"
                        inputMode="numeric"
                    />
                </div>
            </div>

            {/* Card Holder Name Field */}
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="holderName">
                    Cardholder Name
                </label>
                <input
                    id="holderName"
                    type="text"
                    className={styles.input}
                    placeholder="JOHN DOE"
                    value={holderName}
                    onChange={handleHolderNameChange}
                    autoComplete="cc-name"
                />
            </div>

            {/* Expiry Date and CVV Row */}
            <div className={styles.formRowThree}>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="expiryMonth">
                        Month
                    </label>
                    <select
                        id="expiryMonth"
                        className={`${styles.input} ${styles.select}`}
                        value={expiryMonth}
                        onChange={(e) => onExpiryMonthChange(e.target.value)}
                        autoComplete="cc-exp-month"
                    >
                        <option value="">MM</option>
                        {months.map(({ value, label }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="expiryYear">
                        Year
                    </label>
                    <select
                        id="expiryYear"
                        className={`${styles.input} ${styles.select}`}
                        value={expiryYear}
                        onChange={(e) => onExpiryYearChange(e.target.value)}
                        autoComplete="cc-exp-year"
                    >
                        <option value="">YY</option>
                        {years.map(({ value, label }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="cvv">
                        CVV
                    </label>
                    <input
                        id="cvv"
                        type="password"
                        className={`${styles.input} ${styles.cvvInput}`}
                        placeholder="•••"
                        value={cvv}
                        onChange={handleCvvChange}
                        maxLength={4}
                        autoComplete="cc-csc"
                        inputMode="numeric"
                    />
                </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className={styles.submitButton}>
                Pay Now
            </button>

            {/* Security Note */}
            <div className={styles.securityNote}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Your payment is secure and encrypted</span>
            </div>

            {/* Card Brands */}
            <div className={styles.cardBrands}>
                <div className={`${styles.brandIcon} ${activeBrand === 'visa' ? styles.active : ''}`}>
                    VISA
                </div>
                <div className={`${styles.brandIcon} ${activeBrand === 'mastercard' ? styles.active : ''}`}>
                    MC
                </div>
                <div className={`${styles.brandIcon} ${activeBrand === 'amex' ? styles.active : ''}`}>
                    AMEX
                </div>
                <div className={`${styles.brandIcon} ${activeBrand === 'discover' ? styles.active : ''}`}>
                    DISC
                </div>
            </div>
        </form>
    );
};

export default PaymentForm;
