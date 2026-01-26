'use client';

import React from 'react';
import styles from './CreditCard.module.scss';

/**
 * CreditCard Component
 * Visual representation of a credit card that updates based on user input
 * 
 * @param {Object} props
 * @param {string} props.cardNumber - The card number entered by user
 * @param {string} props.holderName - The cardholder's name
 * @param {string} props.expiryMonth - Expiry month (MM)
 * @param {string} props.expiryYear - Expiry year (YY)
 * @param {string} props.cvv - Card CVV (not displayed for security)
 */
const CreditCard = ({
    cardNumber = '',
    holderName = '',
    expiryMonth = '',
    expiryYear = ''
}) => {
    /**
     * Determine card brand based on card number prefix using official IIN ranges
     * @returns {Object} Card brand info with name and style class
     * 
     * Card Brand Ranges:
     * - Visa: Starts with 4
     * - Mastercard: 51-55 or 2221-2720
     * - Amex: 34 or 37
     * - Discover: 6011, 65, or 644-649
     */
    const getCardBrand = () => {
        const cleanNumber = cardNumber.replace(/\s/g, '');

        // Visa - starts with 4
        if (/^4/.test(cleanNumber)) {
            return { name: 'VISA', className: styles.visa };
        }

        // Mastercard - 51-55 range OR 2221-2720 range (new BIN range)
        if (/^5[1-5]/.test(cleanNumber) || /^2[2-7]/.test(cleanNumber)) {
            return { name: 'MASTERCARD', className: styles.mastercard };
        }

        // American Express - 34 or 37
        if (/^3[47]/.test(cleanNumber)) {
            return { name: 'AMEX', className: styles.amex };
        }

        // Discover - 6011, 65, or 644-649
        if (/^6(?:011|5|4[4-9])/.test(cleanNumber)) {
            return { name: 'DISCOVER', className: styles.discover };
        }

        return { name: '', className: styles.default };
    };

    /**
     * Format card number with spaces for readability
     * Shows masked format when empty
     * @returns {string} Formatted card number
     */
    const formatCardNumber = () => {
        const cleanNumber = cardNumber.replace(/\s/g, '');
        const paddedNumber = cleanNumber.padEnd(16, '•');

        // Format as groups of 4
        return paddedNumber.match(/.{1,4}/g)?.join(' ') || '•••• •••• •••• ••••';
    };

    /**
     * Format expiry date display
     * @returns {string} Formatted expiry date MM/YY
     */
    const formatExpiry = () => {
        const month = expiryMonth || 'MM';
        const year = expiryYear || 'YY';
        return `${month}/${year}`;
    };

    const cardBrand = getCardBrand();

    return (
        <div className={`${styles.creditCard} ${cardBrand.className}`}>
            {/* Contactless payment indicator */}
            <div className={styles.contactless} aria-hidden="true" />

            {/* Top section: Chip and Brand */}
            <div className={styles.cardTop}>
                <div className={styles.chip} aria-hidden="true" />
                <div className={styles.cardBrand} aria-label={`Card type: ${cardBrand.name || 'Unknown'}`}>
                    {cardBrand.name}
                </div>
            </div>

            {/* Middle section: Card Number */}
            <div className={styles.cardMiddle}>
                <div className={styles.cardNumber} aria-label="Card number">
                    {formatCardNumber()}
                </div>
            </div>

            {/* Bottom section: Holder Name and Expiry */}
            <div className={styles.cardBottom}>
                <div className={styles.cardInfo}>
                    <span className={styles.label}>Card Holder</span>
                    <span className={styles.holderName}>
                        {holderName || 'YOUR NAME HERE'}
                    </span>
                </div>
                <div className={styles.expiryInfo}>
                    <span className={styles.label}>Expires</span>
                    <span className={styles.expiry}>
                        {formatExpiry()}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CreditCard;
