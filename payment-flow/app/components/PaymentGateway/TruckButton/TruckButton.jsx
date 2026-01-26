'use client';

import React, { useState, useRef, useCallback } from 'react';
import './TruckButton.scss';

/**
 * TruckButton Component
 * An animated submit button with a truck delivery animation
 * Converted from GSAP to pure React/CSS animations
 */
const TruckButton = ({ onClick, disabled, loading }) => {
    const [animationState, setAnimationState] = useState('idle'); // 'idle' | 'animating' | 'done'
    const buttonRef = useRef(null);
    const truckRef = useRef(null);

    /**
     * Handle button click - triggers the animation sequence
     */
    const handleClick = useCallback(async (e) => {
        e.preventDefault();

        if (disabled || loading) return;

        if (animationState === 'done') {
            // Reset animation
            setAnimationState('idle');
            if (buttonRef.current) {
                buttonRef.current.style.setProperty('--progress', '0');
                buttonRef.current.style.setProperty('--box-s', '0.5');
                buttonRef.current.style.setProperty('--box-o', '0');
                buttonRef.current.style.setProperty('--box-x', '-24');
                buttonRef.current.style.setProperty('--box-y', '-6');
                buttonRef.current.style.setProperty('--hx', '0');
                buttonRef.current.style.setProperty('--bx', '0');
                buttonRef.current.style.setProperty('--truck-y', '0');
                buttonRef.current.style.setProperty('--truck-y-n', '-26');
            }
            // Reset truck visibility
            if (truckRef.current) {
                truckRef.current.classList.remove('truck-button__truck--moving');
                truckRef.current.classList.remove('truck-button__truck--hidden');
            }
            return;
        }

        if (animationState === 'idle') {
            // Validate first!
            if (onClick) {
                const shouldProceed = await onClick(e);
                if (shouldProceed === false) return; // Stop if validation failed
            }

            setAnimationState('animating');

            const button = buttonRef.current;

            // Animation sequence using CSS custom properties
            // Step 1: Show box (delay 500ms)
            setTimeout(() => {
                button.style.setProperty('--box-s', '1');
                button.style.setProperty('--box-o', '1');
            }, 500);

            // Step 2: Move box to truck (delay 700ms)
            setTimeout(() => {
                button.style.setProperty('--box-x', '0');
            }, 700);

            // Step 3: Close box hatch (delay 920ms)
            setTimeout(() => {
                button.style.setProperty('--hx', '-5');
                button.style.setProperty('--bx', '50');
            }, 920);

            // Step 4: Drop box (delay 1150ms)
            setTimeout(() => {
                button.style.setProperty('--box-y', '0');
            }, 1150);

            // Step 5: Truck bounce (delay 1250ms)
            setTimeout(() => {
                button.style.setProperty('--truck-y', '1');
                button.style.setProperty('--truck-y-n', '-25');
            }, 1250);

            // Step 6: Start truck movement and progress (delay 1450ms)
            setTimeout(() => {
                if (truckRef.current) {
                    truckRef.current.classList.add('truck-button__truck--moving');
                }

                // Animate progress bar
                let progress = 0;
                const progressInterval = setInterval(() => {
                    progress += 0.02;
                    button.style.setProperty('--progress', Math.min(progress, 1));
                    if (progress >= 1) {
                        clearInterval(progressInterval);
                    }
                }, 48); // ~2.4s total

                // Complete animation and auto-reset
                setTimeout(() => {
                    setAnimationState('done');
                    if (truckRef.current) {
                        // Keep truck hidden after animation
                        truckRef.current.classList.add('truck-button__truck--hidden');
                    }

                    // Auto-reset back to "Pay Now" after 1.5 seconds
                    setTimeout(() => {
                        setAnimationState('idle');
                        if (buttonRef.current) {
                            buttonRef.current.style.setProperty('--progress', '0');
                            buttonRef.current.style.setProperty('--box-s', '0.5');
                            buttonRef.current.style.setProperty('--box-o', '0');
                            buttonRef.current.style.setProperty('--box-x', '-24');
                            buttonRef.current.style.setProperty('--box-y', '-6');
                            buttonRef.current.style.setProperty('--hx', '0');
                            buttonRef.current.style.setProperty('--bx', '0');
                            buttonRef.current.style.setProperty('--truck-y', '0');
                            buttonRef.current.style.setProperty('--truck-y-n', '-26');
                        }
                        if (truckRef.current) {
                            truckRef.current.classList.remove('truck-button__truck--moving');
                            truckRef.current.classList.remove('truck-button__truck--hidden');
                        }
                    }, 2500); // Wait 1.5s after "Order Placed" appears

                }, 2400);
            }, 1450);
        }
    }, [animationState, disabled, loading, onClick]);

    // Build class names
    let buttonClasses = 'truck-button';
    if (animationState === 'animating') {
        buttonClasses += ' truck-button--animation';
    }
    if (animationState === 'done') {
        buttonClasses += ' truck-button--animation truck-button--done';
    }

    return (
        <button
            ref={buttonRef}
            type="button"
            className={buttonClasses}
            onClick={handleClick}
            disabled={disabled || loading}
        >
            <span className="truck-button__default-text">
                {loading ? 'Processing...' : 'Pay Now'}
            </span>
            <span className="truck-button__success-text">
                Order Placed
                <svg viewBox="0 0 12 10">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </svg>
            </span>
            <div ref={truckRef} className="truck-button__truck">
                <div className="truck-button__wheel"></div>
                <div className="truck-button__back"></div>
                <div className="truck-button__front"></div>
                <div className="truck-button__box"></div>
            </div>
        </button>
    );
};

export default TruckButton;
