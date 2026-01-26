'use client';

import React, { useState, useRef, useCallback } from 'react';
import styles from './TruckButton.module.scss';

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
    const handleClick = useCallback((e) => {
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
                truckRef.current.classList.remove(styles.truckMoving);
                truckRef.current.classList.remove(styles.truckHidden);
            }
            return;
        }

        if (animationState === 'idle') {
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
                    truckRef.current.classList.add(styles.truckMoving);
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

                // Complete animation
                setTimeout(() => {
                    setAnimationState('done');
                    if (truckRef.current) {
                        // Keep truck hidden after animation - don't remove truckMoving, add truckHidden
                        truckRef.current.classList.add(styles.truckHidden);
                    }
                    // Call the actual submit handler
                    if (onClick) {
                        onClick(e);
                    }
                }, 2400);
            }, 1450);
        }
    }, [animationState, disabled, loading, onClick]);

    const buttonClasses = [
        styles.truckButton,
        animationState === 'animating' && styles.animation,
        animationState === 'done' && `${styles.animation} ${styles.done}`
    ].filter(Boolean).join(' ');

    return (
        <button
            ref={buttonRef}
            type="button"
            className={buttonClasses}
            onClick={handleClick}
            disabled={disabled || loading}
        >
            <span className={styles.defaultText}>
                {loading ? 'Processing...' : 'Pay Now'}
            </span>
            <span className={styles.successText}>
                Order Placed
                <svg viewBox="0 0 12 10">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </svg>
            </span>
            <div ref={truckRef} className={styles.truck}>
                <div className={styles.wheel}></div>
                <div className={styles.back}></div>
                <div className={styles.front}></div>
                <div className={styles.box}></div>
            </div>
        </button>
    );
};

export default TruckButton;
