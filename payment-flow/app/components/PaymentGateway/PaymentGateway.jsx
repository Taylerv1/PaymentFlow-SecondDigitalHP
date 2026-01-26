'use client';

import React, { useState, useCallback } from 'react';
import styles from './PaymentGateway.module.scss';
import CreditCard from './CreditCard/CreditCard';
import PaymentForm from './PaymentForm/PaymentForm';

/**
 * PaymentGateway Component
 * Main container that manages state and coordinates between
 * CreditCard visualization and PaymentForm input components
 */
const PaymentGateway = () => {
    // ═══════════════════════════════════════════════════════════
    // State Management
    // ═══════════════════════════════════════════════════════════
    const [cardNumber, setCardNumber] = useState('');
    const [holderName, setHolderName] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvv, setCvv] = useState('');

    // ═══════════════════════════════════════════════════════════
    // Event Handlers
    // ═══════════════════════════════════════════════════════════

    /**
     * Handle form submission
     * @param {Object} formData - The submitted form data
     */
    const handleSubmit = useCallback((formData) => {
        console.log('Payment submitted:', formData);
        // In a real application, this would send data to a payment processor
        alert('Payment processing... (Demo only)');
    }, []);

    // ═══════════════════════════════════════════════════════════
    // Render
    // ═══════════════════════════════════════════════════════════
    return (
        <div className={styles.paymentGateway}>
            {/* Animated Background Particles */}
            <div className={styles.particles}>
                {Array.from({ length: 20 }).map((_, index) => (
                    <div key={index} className={styles.particle} />
                ))}
            </div>

            {/* Decorative Gradient Orbs */}
            <div className={`${styles.decoration} ${styles.left}`} />
            <div className={`${styles.decoration} ${styles.right}`} />

            {/* Header Section */}
            <header className={styles.header}>
                <h1 className={styles.title}>
                    <span>Secure</span> Payment Gateway
                </h1>
                <p className={styles.subtitle}>
                    Complete your transaction with confidence
                </p>
            </header>

            {/* Main Content */}
            <main className={styles.content}>

                {/* Payment Form Section */}
                <section className={styles.formSection}>
                    <PaymentForm
                        cardNumber={cardNumber}
                        onCardNumberChange={setCardNumber}
                        holderName={holderName}
                        onHolderNameChange={setHolderName}
                        expiryMonth={expiryMonth}
                        onExpiryMonthChange={setExpiryMonth}
                        expiryYear={expiryYear}
                        onExpiryYearChange={setExpiryYear}
                        cvv={cvv}
                        onCvvChange={setCvv}
                        onSubmit={handleSubmit}
                    />
                </section>
            </main>
        </div>
    );
};

export default PaymentGateway;
