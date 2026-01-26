'use client';

import React, { useState, useCallback } from 'react';
import './PaymentGateway.scss';
import PaymentForm from './PaymentForm/PaymentForm';

/**
 * PaymentGateway Component
 * Main container that manages state and coordinates between
 * CreditCard visualization and PaymentForm input components
 */
const PaymentGateway = () => {
    // State Management
    const [cardNumber, setCardNumber] = useState('');
    const [holderName, setHolderName] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvv, setCvv] = useState('');

    /**
     * Handle form submission
     */
    const handleSubmit = useCallback((formData) => {
        console.log('Payment submitted:', formData);
        alert('Payment processing... (Demo only)');
    }, []);

    return (
        <div className="payment-gateway">
            {/* Animated Background Particles */}
            <div className="payment-gateway__particles">
                {Array.from({ length: 20 }).map((_, index) => (
                    <div key={index} className="payment-gateway__particle" />
                ))}
            </div>

            {/* Decorative Gradient Orbs */}
            <div className="payment-gateway__decoration payment-gateway__decoration--left" />
            <div className="payment-gateway__decoration payment-gateway__decoration--right" />

            {/* Header Section */}
            <header className="payment-gateway__header">
                <h1 className="payment-gateway__title">
                    <span>Secure</span> Payment Gateway
                </h1>
                <p className="payment-gateway__subtitle">
                    Complete your transaction with confidence
                </p>
            </header>

            {/* Main Content */}
            <main className="payment-gateway__content">
                {/* Payment Form Section */}
                <section className="payment-gateway__form-section">
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
