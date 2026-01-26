'use client';

import React from 'react';
import styles from './PaymentForm.module.scss';
import CreditCard from '../CreditCard/CreditCard';

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



    // Personal info state
    const [fullName, setFullName] = React.useState('');
    const [email, setEmail] = React.useState('');
    // Address info state
    const [address, setAddress] = React.useState('');
    const [city, setCity] = React.useState('');
    const [zip, setZip] = React.useState('');
    const [country, setCountry] = React.useState('');
    // Validation and status
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [submitStatus, setSubmitStatus] = React.useState(''); // '', 'success', 'error'
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

 
    const handleCardNumberChange = (e) => {
        const formatted = formatCardNumber(e.target.value);
        onCardNumberChange(formatted);
    };

   
    const handleHolderNameChange = (e) => {
        const value = e.target.value.toUpperCase().replace(/[^A-Z\s]/g, '').slice(0, 26);
        onHolderNameChange(value);
    };


    const handleCvvChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 4);
        onCvvChange(value);
    };


    const validate = () => {
        const newErrors = {};
        // Personal info
        if (!fullName.trim()) newErrors.fullName = 'Full name is required.';
        if (!email.trim()) newErrors.email = 'Email is required.';
        else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) newErrors.email = 'Invalid email address.';
        // Address info
        if (!address.trim()) newErrors.address = 'Address is required.';
        if (!city.trim()) newErrors.city = 'City is required.';
        if (!zip.trim()) newErrors.zip = 'ZIP/Postal code is required.';
        if (!country.trim()) newErrors.country = 'Country is required.';
        // Payment info
        if (!cardNumber.replace(/\s/g, '')) newErrors.cardNumber = 'Card number is required.';
        if (!holderName.trim()) newErrors.holderName = 'Cardholder name is required.';
        if (!expiryMonth) newErrors.expiryMonth = 'Expiry month is required.';
        if (!expiryYear) newErrors.expiryYear = 'Expiry year is required.';
        if (!cvv) newErrors.cvv = 'CVV is required.';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus('');
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;
        setLoading(true);
        try {
            // Simulate async payment
            await new Promise((res) => setTimeout(res, 1500));
            setLoading(false);
            setSubmitStatus('success');
            if (onSubmit) {
                onSubmit({
                    cardNumber: cardNumber.replace(/\s/g, ''),
                    holderName,
                    expiryMonth,
                    expiryYear,
                    cvv,
                    fullName,
                    email,
                    address,
                    city,
                    zip,
                    country
                });
            }
        } catch {
            setLoading(false);
            setSubmitStatus('error');
        }
    };

 
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

            {/* Personal Information */}
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="fullName">Full Name</label>
                <input
                    id="fullName"
                    type="text"
                    className={styles.input}
                    placeholder="Full Name"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    autoComplete="name"
                />
                {errors.fullName && <span style={{color: '#ef4444', fontSize: 12}}>{errors.fullName}</span>}
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    className={styles.input}
                    placeholder="you@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="email"
                />
                {errors.email && <span style={{color: '#ef4444', fontSize: 12}}>{errors.email}</span>}
            </div>

            {/* Address Information */}
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="address">Address</label>
                <input
                    id="address"
                    type="text"
                    className={styles.input}
                    placeholder="Street Address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    autoComplete="address-line1"
                />
                {errors.address && <span style={{color: '#ef4444', fontSize: 12}}>{errors.address}</span>}
            </div>
            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="city">City</label>
                    <input
                        id="city"
                        type="text"
                        className={styles.input}
                        placeholder="City"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        autoComplete="address-level2"
                    />
                    {errors.city && <span style={{color: '#ef4444', fontSize: 12}}>{errors.city}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="zip">ZIP/Postal Code</label>
                    <input
                        id="zip"
                        type="text"
                        className={styles.input}
                        placeholder="ZIP/Postal Code"
                        value={zip}
                        onChange={e => setZip(e.target.value)}
                        autoComplete="postal-code"
                    />
                    {errors.zip && <span style={{color: '#ef4444', fontSize: 12}}>{errors.zip}</span>}
                </div>
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="country">Country</label>
                <input
                    id="country"
                    type="text"
                    className={styles.input}
                    placeholder="Country"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    autoComplete="country"
                />
                {errors.country && <span style={{color: '#ef4444', fontSize: 12}}>{errors.country}</span>}
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
                        className={`${styles.input} ${styles.cardNumber}${errors.cardNumber ? ' error' : ''}`}
                        placeholder="0000 0000 0000 0000"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength={19}
                        autoComplete="cc-number"
                        inputMode="numeric"
                    />
                </div>
                {errors.cardNumber && <span style={{color: '#ef4444', fontSize: 12}}>{errors.cardNumber}</span>}
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
                {errors.holderName && <span style={{color: '#ef4444', fontSize: 12}}>{errors.holderName}</span>}
            </div>

            {/* Expiry Date and CVV Row */}
            <div className={styles.formRowThree}>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="expiryMonth">
                        Month
                    </label>
                    <select
                        id="expiryMonth"
                        className={`${styles.input} ${styles.select}${errors.expiryMonth ? ' error' : ''}`}
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
                    {errors.expiryMonth && <span style={{color: '#ef4444', fontSize: 12}}>{errors.expiryMonth}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="expiryYear">
                        Year
                    </label>
                    <select
                        id="expiryYear"
                        className={`${styles.input} ${styles.select}${errors.expiryYear ? ' error' : ''}`}
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
                    {errors.expiryYear && <span style={{color: '#ef4444', fontSize: 12}}>{errors.expiryYear}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="cvv">
                        CVV
                    </label>
                    <input
                        id="cvv"
                        type="password"
                        className={`${styles.input} ${styles.cvvInput}${errors.cvv ? ' error' : ''}`}
                        placeholder="•••"
                        value={cvv}
                        onChange={handleCvvChange}
                        maxLength={4}
                        autoComplete="cc-csc"
                        inputMode="numeric"
                    />
                    {errors.cvv && <span style={{color: '#ef4444', fontSize: 12}}>{errors.cvv}</span>}
                </div>
            </div>

                {/* Credit Card Visual Preview */}
                <section className={styles.cardPreview}>
                    <span className={styles.previewLabel}>Card Preview</span>
                    <CreditCard
                        cardNumber={cardNumber}
                        holderName={holderName}
                        expiryMonth={expiryMonth}
                        expiryYear={expiryYear}
                    />
                </section>

            {/* Submit Button */}
            <button type="submit" className={styles.submitButton} disabled={loading}>
                {loading ? 'Processing...' : 'Pay Now'}
            </button>

            {/* Submission Status */}
            {submitStatus === 'success' && (
                <div style={{ color: '#22c55e', textAlign: 'center', marginTop: 8 }}>Payment successful!</div>
            )}
            {submitStatus === 'error' && (
                <div style={{ color: '#ef4444', textAlign: 'center', marginTop: 8 }}>Payment failed. Please try again.</div>
            )}

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
