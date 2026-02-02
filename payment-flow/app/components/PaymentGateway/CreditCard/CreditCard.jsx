'use client';

import React from 'react';
import './CreditCard.scss';

const CreditCard = ({
    cardNumber = '',
    holderName = '',
    expiryMonth = '',
    expiryYear = ''
}) => {

    const getCardType = (number) => {
        const cleanNumber = number.replace(/\D/g, '');
        if (/^4/.test(cleanNumber)) return 'visa';
        if (/^5[1-5]/.test(cleanNumber)) return 'mastercard';
        if (/^3[47]/.test(cleanNumber)) return 'amex';
        if (/^(?:6011|65|64[4-9])/.test(cleanNumber)) return 'discover';
        return 'default';
    };

    const cardType = getCardType(cardNumber);

    return (
        <div className={`credit-card credit-card--${cardType}`}>
            <div className="credit-card__top">
                <div className="credit-card__chip"></div>
                
                <div className="credit-card__contactless"></div>

                <div className="credit-card__brand">
                    {cardType !== 'default' ? cardType : 'BANK'}
                </div>
            </div>

            <div className="credit-card__middle">
                <div className="credit-card__number">
                    {cardNumber || '•••• •••• •••• ••••'}
                </div>
            </div>

            <div className="credit-card__bottom">
                <div className="credit-card__info">
                    <span className="credit-card__label">Card Holder</span>
                    <div className="credit-card__holder-name">
                        {holderName || 'FULL NAME'}
                    </div>
                </div>

                <div className="credit-card__expiry-info">
                    <span className="credit-card__label">Expires</span>
                    <div className="credit-card__expiry">
                        {expiryMonth || 'MM'}/{expiryYear || 'YY'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreditCard;
