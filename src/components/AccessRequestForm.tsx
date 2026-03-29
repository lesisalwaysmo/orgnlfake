'use client';

import { useState } from 'react';

interface AccessRequestFormProps {
  creatorId: string;
  category: string;
}

export default function AccessRequestForm({ creatorId, category }: AccessRequestFormProps) {
  const [name, setName] = useState('');
  const [brandWebsite, setBrandWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
        const res = await fetch('/api/request-access', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, brandWebsite, email, category, creatorId }) 
        });

        if (res.ok) {
            setStatus('success');
        } else {
            setStatus('error');
        }
    } catch {
        setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center p-10 border border-black/10 rounded-lg max-w-md mx-auto mt-20 bg-white/40 backdrop-blur-md shadow-sm">
        <h2 className="text-xl font-bold mb-3 uppercase tracking-wider">Request Sent</h2>
        <p className="opacity-70 text-sm leading-relaxed">
          Your request has been sent to our booking team. We will review it and email your secure access link shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="no-reveal text-center p-10 border border-black/10 rounded-lg max-w-md mx-auto mt-20 bg-white/40 backdrop-blur-md shadow-sm transition-all" data-restricted-form>
      <style dangerouslySetInnerHTML={{ __html: `
        [data-restricted-form] h2,
        [data-restricted-form] h2 * { color: #1a1a1a !important; -webkit-text-fill-color: #1a1a1a !important; }
        [data-restricted-form] .restricted-desc,
        [data-restricted-form] .restricted-desc * { color: #3a3a3a !important; -webkit-text-fill-color: #3a3a3a !important; }
        [data-restricted-form] .restricted-notice,
        [data-restricted-form] .restricted-notice * { color: #8a7350 !important; -webkit-text-fill-color: #8a7350 !important; }
      `}} />
      <h2 className="text-2xl font-bold tracking-tight mb-4 uppercase">🔒 Restricted Category</h2>
      <p className="restricted-desc mb-4 text-sm leading-relaxed">
        The <b className="font-semibold">{category}</b> portfolio for <b className="font-semibold">{creatorId.replace('-', ' ').toUpperCase()}</b> is strictly confidential. Please fill in your details below to request a secure access link.
      </p>
      <p className="restricted-notice mb-8 text-[11px] tracking-[0.12em] uppercase leading-relaxed font-semibold">
        Strictly confidential — exclusively available to Brand Managers, Promoting Campaign Managers, Designers, Casting Producers and Fashion Editors.
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
          type="text" 
          required 
          placeholder="Full Name" 
          className="p-3 border border-black/20 rounded-md bg-transparent focus:outline-none focus:border-black/50 transition-colors placeholder:text-black/30 font-['Inter']"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={status === 'loading'}
        />
        <input 
          type="url" 
          required 
          placeholder="Brand / Company Website" 
          className="p-3 border border-black/20 rounded-md bg-transparent focus:outline-none focus:border-black/50 transition-colors placeholder:text-black/30 font-['Inter']"
          value={brandWebsite}
          onChange={(e) => setBrandWebsite(e.target.value)}
          disabled={status === 'loading'}
        />
        <input 
          type="email" 
          required 
          placeholder="Email Address" 
          className="p-3 border border-black/20 rounded-md bg-transparent focus:outline-none focus:border-black/50 transition-colors placeholder:text-black/30 font-['Inter']"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
        />
        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="bg-black text-[#f0ede6] p-3 rounded-md hover:bg-black/80 transition-all font-semibold uppercase tracking-widest text-xs disabled:opacity-50 mt-2"
        >
          {status === 'loading' ? 'Sending Request...' : 'Request Access'}
        </button>
      </form>
      
      {status === 'error' && (
        <p className="mt-4 text-red-500 text-sm">Failed to send request. Please try again later.</p>
      )}
    </div>
  );
}
