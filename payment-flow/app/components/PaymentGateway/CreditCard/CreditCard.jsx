'use client';

import React from 'react';
import './CreditCard.scss';

const CreditCard = ({
    cardNumber = '',
    onCardNumberChange,
    holderName = '',
    onHolderNameChange,
    expiryMonth = '',
    onExpiryMonthChange,
    expiryYear = '',
    onExpiryYearChange,
    cvv = '',
    onCvvChange,
    errors = {}
}) => {

    return (
        <div className="credit-card-form">
            <h3 className="credit-card-form__title">Credit Card Information</h3>
            
            <div className="credit-card-form__group">
                <label className="credit-card-form__label">Card Number</label>
                <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={onCardNumberChange}
                    maxLength="19"
                    className={`credit-card-form__input ${errors.cardNumber ? 'credit-card-form__input--error' : ''}`}
                />
                {errors.cardNumber && <span className="credit-card-form__error">{errors.cardNumber}</span>}
            </div>

            <div className="credit-card-form__group">
                <label className="credit-card-form__label">Cardholder Name</label>
                <input
                    type="text"
                    placeholder="John Doe"
                    value={holderName}
                    onChange={onHolderNameChange}
                    maxLength="26"
                    className={`credit-card-form__input ${errors.holderName ? 'credit-card-form__input--error' : ''}`}
                />
                {errors.holderName && <span className="credit-card-form__error">{errors.holderName}</span>}
            </div>

            <div className="credit-card-form__row">
                <div className="credit-card-form__group">
                    <label className="credit-card-form__label">Expiry Month</label>
                    <select
                        value={expiryMonth}
                        onChange={onExpiryMonthChange}
                        className={`credit-card-form__input ${errors.expiryMonth ? 'credit-card-form__input--error' : ''}`}
                    >
                        <option value="">Select Month</option>
                        {Array.from({ length: 12 }, (_, i) => {
                            const month = String(i + 1).padStart(2, '0');
                            return (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            );
                        })}
                    </select>
                    {errors.expiryMonth && <span className="credit-card-form__error">{errors.expiryMonth}</span>}
                </div>

                <div className="credit-card-form__group">
                    <label className="credit-card-form__label">Expiry Year</label>
                    <select
                        value={expiryYear}
                        onChange={onExpiryYearChange}
                        className={`credit-card-form__input ${errors.expiryYear ? 'credit-card-form__input--error' : ''}`}
                    >
                        <option value="">Select Year</option>
                        {Array.from({ length: 20 }, (_, i) => {
                            const year = new Date().getFullYear() + i;
                            return (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            );
                        })}
                    </select>
                    {errors.expiryYear && <span className="credit-card-form__error">{errors.expiryYear}</span>}
                </div>

                <div className="credit-card-form__group">
                    <label className="credit-card-form__label">CVV</label>
                    <input
                        type="text"
                        placeholder="123"
                        value={cvv}
                        onChange={onCvvChange}
                        maxLength="4"
                        className={`credit-card-form__input ${errors.cvv ? 'credit-card-form__input--error' : ''}`}
                    />
                    {errors.cvv && <span className="credit-card-form__error">{errors.cvv}</span>}
                </div>
            </div>
        </div>
    );
};

export default CreditCard;
