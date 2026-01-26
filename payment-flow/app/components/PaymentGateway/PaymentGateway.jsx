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

            {/* Footer with Security Badges */}
            <footer className={styles.footer}>
                <p className={styles.footerText}>
                    Powered by <a href="#">SecondDigitalHP</a>
                </p>
                <div className={styles.securityBadges}>
                    <div className={styles.badge}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        <span>SSL Secured</span>
                    </div>
                    <div className={styles.badge}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <span>PCI Compliant</span>
                    </div>
                    <div className={styles.badge}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <span>Verified</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PaymentGateway;
