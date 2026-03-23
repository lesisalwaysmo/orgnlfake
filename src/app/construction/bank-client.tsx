'use client';

import React, { useState } from 'react';
import TrailContainer from '@/components/TrailContainer';
import './bank.css';

export default function BankClient() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        
        setStatus('loading');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setEmail('');
        }, 1200);
    };

    return (
        <div className="bank-page no-reveal">
            {/* Image Trail Effect */}
            <TrailContainer />

            {/* Background Animations */}
            <div className="bg-grid"></div>
            <div className="bg-glow"></div>
            
            {/* Header Lock Icon */}
            <div className="lock-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="lock-icon" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
            </div>

            <main className="bank-content">
                {/* Status Badge */}
                <div className="system-status">
                    <span className="pulse-dot"></span>
                    <span className="status-text">SYSTEM INVITATION ONLY</span>
                </div>

                {/* Main Hero Typography */}
                <h1 className="hero-title">
                    The Future of<br/>
                    <span className="gradient-text">Wealth Management</span>
                </h1>

                <p className="hero-subtitle">
                    We are building a secure, borderless financial ecosystem for the modern era. 
                    Institutional-grade security meets exceptional design.
                </p>

                {/* Glassmorphic Waitlist Form */}
                <form className="waitlist-card" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mail-icon" stroke="currentColor" strokeWidth="1.5">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                        <input 
                            type="email" 
                            placeholder="Enter your email address" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === 'loading' || status === 'success'}
                            required
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className={`join-btn ${status}`}
                        disabled={status === 'loading' || status === 'success'}
                    >
                        {status === 'idle' && 'Request Access'}
                        {status === 'loading' && <span className="loader"></span>}
                        {status === 'success' && 'You\'re on the list'}
                    </button>
                </form>

                {/* Security Trust Badges */}
                <div className="trust-badges">
                    <div className="badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        256-Bit Encryption
                    </div>
                    <div className="badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        Zero Knowledge Architecture
                    </div>
                    <div className="badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                        Regulated Entity
                    </div>
                </div>
            </main>

            {/* Corner Decorative Elements */}
            <div className="ui-corner top-left"></div>
            <div className="ui-corner top-right"></div>
            <div className="ui-corner bottom-left"></div>
            <div className="ui-corner bottom-right"></div>
            
            <div className="corner-text top-left">VAULT — 001</div>
            <div className="corner-text top-right">LAT: 40.7128° N, LNG: 74.0060° W</div>
        </div>
    );
}
