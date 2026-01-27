'use client';

import React from 'react';
import './CreditCard.scss';


const CreditCard = ({
    cardNumber = '',
    holderName = '',
    expiryMonth = '',
    expiryYear = ''
}) => {

    const getCardBrand = () => {
        const cleanNumber = cardNumber.replace(/\s/g, '');

        if (/^4/.test(cleanNumber)) {
            return { name: 'VISA', className: 'credit-card--visa' };
        }

        if (/^5[1-5]/.test(cleanNumber) || /^2[2-7]/.test(cleanNumber)) {
            return { name: 'MASTERCARD', className: 'credit-card--mastercard' };
        }

        if (/^3[47]/.test(cleanNumber)) {
            return { name: 'AMEX', className: 'credit-card--amex' };
        }

        if (/^6(?:011|5|4[4-9])/.test(cleanNumber)) {
            return { name: 'DISCOVER', className: 'credit-card--discover' };
        }

        return { name: '', className: 'credit-card--default' };
    };


    const formatCardNumber = () => {
        const cleanNumber = cardNumber.replace(/\s/g, '');
        const paddedNumber = cleanNumber.padEnd(16, '•');
        return paddedNumber.match(/.{1,4}/g)?.join(' ') || '•••• •••• •••• ••••';
    };

    const formatExpiry = () => {
        const month = expiryMonth || 'MM';
        const year = expiryYear || 'YY';
        return `${month}/${year}`;
    };

    const cardBrand = getCardBrand();

    return (
        <div className={`credit-card ${cardBrand.className}`}>
            <div className="credit-card__contactless" aria-hidden="true" />

            <div className="credit-card__top">
                <div className="credit-card__chip" aria-hidden="true" />
                <div className="credit-card__brand" aria-label={`Card type: ${cardBrand.name || 'Unknown'}`}>
                    {cardBrand.name}
                </div>
            </div>

            <div className="credit-card__middle">
                <div className="credit-card__number" aria-label="Card number">
                    {formatCardNumber()}
                </div>
            </div>

            <div className="credit-card__bottom">
                <div className="credit-card__info">
                    <span className="credit-card__label">Card Holder</span>
                    <span className="credit-card__holder-name">
                        {holderName || 'YOUR NAME HERE'}
                    </span>
                </div>
                <div className="credit-card__expiry-info">
                    <span className="credit-card__label">Expires</span>
                    <span className="credit-card__expiry">
                        {formatExpiry()}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CreditCard;
