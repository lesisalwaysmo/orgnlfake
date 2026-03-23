'use client';

import React from 'react';
import TrailContainer from '@/components/TrailContainer';
import './construction.css';

export default function ConstructionClient() {
    return (
        <div className="construction-page">
            {/* Image trail layer — follows cursor */}
            <TrailContainer />

            {/* Corner accents */}
            <div className="corner-accent top-left">
                <span className="brand">ORGNL FAKE</span>
            </div>
            <div className="corner-accent top-right">
                <span className="year">2025</span>
            </div>
            <div className="corner-accent bottom-left">
                <span className="hint">Move cursor to explore</span>
            </div>
            <div className="corner-accent bottom-right">
                <span className="status-text">Under Construction</span>
            </div>

            {/* Center content */}
            <div className="construction-content">
                <div className="construction-badge">
                    <span className="dot" />
                    <span>Currently Building</span>
                </div>

                <h1 className="construction-title">
                    Something<br />
                    <span className="accent">Extraordinary</span>
                </h1>

                <p className="construction-subtitle">
                    We&apos;re crafting a new creative experience. Our studio is putting the
                    finishing touches on something worth the wait.
                </p>

                <div className="construction-divider" />

                <div className="construction-contact">
                    <a href="mailto:bookings@orgnlfake.agency">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <path d="M22 4L12 13L2 4" />
                        </svg>
                        bookings@orgnlfake.agency
                    </a>
                </div>
            </div>

            {/* Mobile hint (desktop has cursor hint in bottom-left corner) */}
            <div className="mobile-hint">
                <p>Best viewed on desktop</p>
            </div>
        </div>
    );
}
