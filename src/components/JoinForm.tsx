"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Send, CheckCircle2 } from 'lucide-react';

const steps = [
  "Personal Info",
  "Identity",
  "Socials",
  "Brand & Content",
  "Services",
  "Logistics",
  "Final Details"
];

const JoinForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Info
    fullName: '', age: '', email: '', phone: '', country: '', city: '',
    // Identity
    creatorType: '', niche: '', bio: '', experience: '', signedToAgency: 'No', agencyName: '',
    // Socials
    instagram: '', tiktok: '', youtube: '', twitter: '', totalFollowers: '',
    // Content
    contentType: [] as string[], contentStyle: '', postingFrequency: '', personalBrand: 'No', brandValues: '',
    // Services
    servicesNeeded: [] as string[],
    // Budget/Commitment
    budget: '', readyToInvest: 'No', startDate: '', commitment: '',
    // Legal & Open
    contactMethod: '', isOver18: false, whyUs: '', uniqueFactor: ''
  });

  const updateFields = (fields: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.error("Submit error:", err);
    }
    setIsSubmitted(true);
  };

  const stepVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.25 } }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="no-reveal text-center py-20 px-6"
      >
        <CheckCircle2 className="w-20 h-20 mx-auto mb-6" style={{ color: '#22c55e' }} />
        <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>Application Sent.</h2>
        <p style={{ color: '#9ca3af', maxWidth: '28rem', margin: '0 auto', lineHeight: 1.7 }}>
          Thank you for reaching out to <strong style={{ color: '#e8e8e8' }}>orgnlfake</strong>. Our team will review your profile and contact you at <strong style={{ color: '#c9a86c' }}>{formData.email}</strong> within 48 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="no-reveal" style={{
      maxWidth: '48rem',
      margin: '40px auto 0',
      padding: '24px',
      background: '#0a0a0a',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '16px',
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
    }}>
      {/* Progress Bar */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Step {currentStep + 1} of {steps.length}
          </span>
          <span style={{ fontSize: '11px', color: '#ffffff', fontWeight: 500 }}>
            {steps[currentStep]}
          </span>
        </div>
        <div style={{ height: '3px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '9999px', overflow: 'hidden' }}>
          <motion.div
            style={{ height: '100%', background: '#ffffff', borderRadius: '9999px' }}
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {/* STEP 1: PERSONAL INFO */}
          {currentStep === 0 && (
            <motion.div key="step1" variants={stepVariants} initial="initial" animate="animate" exit="exit" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>Let&apos;s start with the basics</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <FormInput label="Full Name" placeholder="John Doe" value={formData.fullName} onChange={e => updateFields({ fullName: e.target.value })} />
                <FormInput label="Email" type="email" placeholder="email@example.com" value={formData.email} onChange={e => updateFields({ email: e.target.value })} />
                <FormInput label="Phone" placeholder="+27..." value={formData.phone} onChange={e => updateFields({ phone: e.target.value })} />
                <FormInput label="Date of Birth" type="date" value={formData.age} onChange={e => updateFields({ age: e.target.value })} />
                <FormInput label="Country" placeholder="South Africa" value={formData.country} onChange={e => updateFields({ country: e.target.value })} />
                <FormInput label="City" placeholder="Johannesburg" value={formData.city} onChange={e => updateFields({ city: e.target.value })} />
              </div>
            </motion.div>
          )}

          {/* STEP 2: PROFESSIONAL IDENTITY */}
          {currentStep === 1 && (
            <motion.div key="step2" variants={stepVariants} initial="initial" animate="animate" exit="exit" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>Your Professional Identity</h3>
              <FormSelect label="Creator Type" options={['Content Creator', 'Model', 'Influencer', 'Other']} value={formData.creatorType} onChange={v => updateFields({ creatorType: v })} />
              <FormInput label="Niche / Industry" placeholder="Fashion, Tech, Fitness..." value={formData.niche} onChange={e => updateFields({ niche: e.target.value })} />
              <FormSelect label="Experience Level" options={['Beginner — Never modeled professionally', 'Intermediate — Some experience', 'Seasoned — Full-time creator / influencer']} value={formData.experience} onChange={v => updateFields({ experience: v })} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Short Bio / About You</label>
                <textarea
                  style={{
                    width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px', padding: '12px', color: '#ffffff', outline: 'none', resize: 'none',
                    fontSize: '0.9rem', fontFamily: 'inherit', boxSizing: 'border-box',
                  }}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  value={formData.bio}
                  onChange={e => updateFields({ bio: e.target.value })}
                />
              </div>
            </motion.div>
          )}

          {/* STEP 3: SOCIALS */}
          {currentStep === 2 && (
            <motion.div key="step3" variants={stepVariants} initial="initial" animate="animate" exit="exit" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>Social Presence</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <FormInput label="Instagram Handle" placeholder="@username" value={formData.instagram} onChange={e => updateFields({ instagram: e.target.value })} />
                <FormInput label="TikTok Handle" placeholder="@username" value={formData.tiktok} onChange={e => updateFields({ tiktok: e.target.value })} />
                <FormInput label="YouTube Channel" placeholder="Channel Link" value={formData.youtube} onChange={e => updateFields({ youtube: e.target.value })} />
                <FormInput label="X / Twitter" placeholder="@handle" value={formData.twitter} onChange={e => updateFields({ twitter: e.target.value })} />
                <FormInput label="Total Follower Count" placeholder="e.g. 500k+" value={formData.totalFollowers} onChange={e => updateFields({ totalFollowers: e.target.value })} />
              </div>
            </motion.div>
          )}

          {/* STEP 4: BRAND & CONTENT */}
          {currentStep === 3 && (
            <motion.div key="step4" variants={stepVariants} initial="initial" animate="animate" exit="exit" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>Brand &amp; Content</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                {['Photography', 'Video / Reels', 'Live Streams', 'Vlogs', 'Blog / Written', 'Podcasts'].map(type => (
                  <label key={type} style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px',
                    background: 'rgba(255,255,255,0.05)', borderRadius: '12px', cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}>
                    <input
                      type="checkbox"
                      style={{ accentColor: '#ffffff', width: '16px', height: '16px' }}
                      checked={formData.contentType.includes(type)}
                      onChange={(e) => {
                        const next = e.target.checked
                          ? [...formData.contentType, type]
                          : formData.contentType.filter(t => t !== type);
                        updateFields({ contentType: next });
                      }}
                    />
                    <span style={{ fontSize: '0.875rem', color: '#e5e7eb' }}>{type}</span>
                  </label>
                ))}
              </div>
              <FormSelect label="Posting Frequency" options={['Daily', '3-5 times/week', 'Weekly', 'Monthly']} value={formData.postingFrequency} onChange={v => updateFields({ postingFrequency: v })} />
              <FormInput label="Content Style / Aesthetic" placeholder="Minimal, Luxury, Streetwear, Raw..." value={formData.contentStyle} onChange={e => updateFields({ contentStyle: e.target.value })} />
            </motion.div>
          )}

          {/* STEP 5: SERVICES */}
          {currentStep === 4 && (
            <motion.div key="step5" variants={stepVariants} initial="initial" animate="animate" exit="exit" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>What do you need?</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                {['Social Media Management', 'Media Kit Creation', 'Portfolio Development', 'Brand Outreach', 'Content Strategy', 'Posing & Modelling Coaching', 'Photography / Videography', 'Brand Identity Design'].map(service => (
                  <label key={service} style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px',
                    background: 'rgba(255,255,255,0.05)', borderRadius: '12px', cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}>
                    <input
                      type="checkbox"
                      style={{ accentColor: '#ffffff', width: '16px', height: '16px' }}
                      checked={formData.servicesNeeded.includes(service)}
                      onChange={(e) => {
                        const next = e.target.checked
                          ? [...formData.servicesNeeded, service]
                          : formData.servicesNeeded.filter(s => s !== service);
                        updateFields({ servicesNeeded: next });
                      }}
                    />
                    <span style={{ fontSize: '0.875rem', color: '#e5e7eb' }}>{service}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 6: LOGISTICS */}
          {currentStep === 5 && (
            <motion.div key="step6" variants={stepVariants} initial="initial" animate="animate" exit="exit" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>Logistics &amp; Investment</h3>
              <FormSelect label="Monthly Budget Range" options={['R500 - R1,000', 'R1,000 - R3,000', 'R3,000 - R5,000', 'R5,000+']} value={formData.budget} onChange={v => updateFields({ budget: v })} />
              <FormSelect label="Commitment Period" options={['1 Month', '3 Months', '6 Months+']} value={formData.commitment} onChange={v => updateFields({ commitment: v })} />
              <FormSelect label="Preferred Contact Method" options={['Email', 'WhatsApp', 'Instagram DM', 'Phone Call']} value={formData.contactMethod} onChange={v => updateFields({ contactMethod: v })} />
              <FormInput label="Preferred Start Date" type="date" value={formData.startDate} onChange={e => updateFields({ startDate: e.target.value })} />
              <div style={{ paddingTop: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    required
                    style={{ accentColor: '#ffffff', marginTop: '4px', width: '16px', height: '16px' }}
                    checked={formData.isOver18}
                    onChange={e => updateFields({ isOver18: e.target.checked })}
                  />
                  <span style={{ fontSize: '12px', color: '#9ca3af', lineHeight: 1.6, fontStyle: 'italic' }}>
                    I confirm I am 18+ years of age and agree to the terms and conditions of orgnlfake agency.
                  </span>
                </label>
              </div>
            </motion.div>
          )}

          {/* STEP 7: FINAL DETAILS */}
          {currentStep === 6 && (
            <motion.div key="step7" variants={stepVariants} initial="initial" animate="animate" exit="exit" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>Why you?</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Why should we pick you?</label>
                <textarea
                  style={{
                    width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px', padding: '12px', color: '#ffffff', outline: 'none', resize: 'none',
                    fontSize: '0.9rem', fontFamily: 'inherit', boxSizing: 'border-box',
                  }}
                  placeholder="Tell us why you're a great fit for orgnlfake..."
                  rows={4}
                  value={formData.whyUs}
                  onChange={e => updateFields({ whyUs: e.target.value })}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>What makes you unique?</label>
                <textarea
                  style={{
                    width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px', padding: '12px', color: '#ffffff', outline: 'none', resize: 'none',
                    fontSize: '0.9rem', fontFamily: 'inherit', boxSizing: 'border-box',
                  }}
                  placeholder="What sets you apart from other creators?"
                  rows={4}
                  value={formData.uniqueFactor}
                  onChange={e => updateFields({ uniqueFactor: e.target.value })}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '48px', alignItems: 'center' }}>
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={handleBack}
              style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                color: '#9ca3af', background: 'none', border: 'none',
                cursor: 'pointer', fontSize: '0.9rem', padding: '8px 16px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#9ca3af')}
            >
              <ChevronLeft className="w-5 h-5" /> Back
            </button>
          ) : <div />}

          <div>
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                style={{
                  display: 'flex', alignItems: 'center', gap: '4px',
                  background: '#ffffff', color: '#000000',
                  padding: '12px 32px', borderRadius: '9999px',
                  fontWeight: 700, fontSize: '0.875rem', border: 'none',
                  cursor: 'pointer', transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#e5e7eb')}
                onMouseLeave={e => (e.currentTarget.style.background = '#ffffff')}
              >
                Next Step <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="submit"
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: '#ffffff', color: '#000000',
                  padding: '12px 32px', borderRadius: '9999px',
                  fontWeight: 700, fontSize: '0.875rem', border: 'none',
                  cursor: 'pointer', transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#e5e7eb')}
                onMouseLeave={e => (e.currentTarget.style.background = '#ffffff')}
              >
                Submit Application <Send className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

/* ── Helper UI Components ── */

const FormInput = ({ label, type = "text", placeholder, value, onChange }: {
  label: string; type?: string; placeholder?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <label style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px', padding: '12px', color: '#ffffff', outline: 'none',
        fontSize: '0.9rem', transition: 'border-color 0.2s', boxSizing: 'border-box',
      }}
      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)')}
      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
    />
  </div>
);

const FormSelect = ({ label, options, value, onChange }: {
  label: string; options: string[]; value: string;
  onChange: (val: string) => void;
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <label style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</label>
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px', padding: '12px', color: '#ffffff', outline: 'none',
        fontSize: '0.9rem', appearance: 'none', cursor: 'pointer', boxSizing: 'border-box',
      }}
      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)')}
      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
    >
      <option value="" disabled style={{ background: '#0a0a0a' }}>Select an option</option>
      {options.map((opt) => (
        <option key={opt} value={opt} style={{ background: '#0a0a0a' }}>{opt}</option>
      ))}
    </select>
  </div>
);

export default JoinForm;
