'use client';

import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

export default function JoinPage() {
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="pt-32 pb-24 bg-cream min-h-screen">
      <Container className="max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left: Info */}
          <div>
            <span className="font-sans text-xs font-bold uppercase text-orange tracking-widest block mb-6">
              Membership
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-black uppercase text-ink tracking-tight leading-[0.9] mb-8">
              Become a <span className="text-gold">Supporter</span>
            </h1>
            <p className="font-serif text-xl text-ink/70 italic leading-relaxed mb-12">
              Join the SupporterFC Meilen family. By becoming a registered member, you directly fund our choreographies, away buses, and the ongoing fight to keep football authentic.
            </p>

            <div className="space-y-8 mt-12">
              <div className="border border-ink p-6 bg-vintage">
                <h3 className="font-sans text-xl font-bold uppercase mb-2 text-ink">Standard Member</h3>
                <p className="font-serif text-ink/70">50 CHF / Year. Voting rights at the general assembly and priority ticketing for away derbies.</p>
              </div>
              <div className="border border-ink p-6 bg-ink text-vintage">
                <h3 className="font-sans text-xl font-bold uppercase mb-2 text-gold">Lifetime Legacy</h3>
                <p className="font-serif text-vintage/70">1000 CHF / Once. Immortalized on the stadium plaque, exclusive legacy scarf, and life-long AGM voting rights.</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-vintage border border-ink p-8 md:p-12 relative shadow-[8px_8px_0_0_#0B0C10]">
            <h2 className="text-3xl font-sans font-black uppercase tracking-tight mb-8">Registration Form</h2>
            
            {status === 'success' ? (
              <div className="bg-green-100 border border-green-800 text-green-900 p-6 font-sans font-bold text-center uppercase">
                Application Received. We will contact you shortly with payment details.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label htmlFor="name" className="block font-sans text-sm font-bold uppercase mb-2 text-ink/80">Full Name *</label>
                  <input required type="text" id="name" name="name" className="w-full bg-cream border border-ink/20 px-4 py-3 font-sans focus:outline-none focus:border-ink transition-colors" />
                </div>
                <div>
                  <label htmlFor="email" className="block font-sans text-sm font-bold uppercase mb-2 text-ink/80">Email Address *</label>
                  <input required type="email" id="email" name="email" className="w-full bg-cream border border-ink/20 px-4 py-3 font-sans focus:outline-none focus:border-ink transition-colors" />
                </div>
                <div>
                  <label htmlFor="phone" className="block font-sans text-sm font-bold uppercase mb-2 text-ink/80">Phone Number</label>
                  <input type="tel" id="phone" name="phone" className="w-full bg-cream border border-ink/20 px-4 py-3 font-sans focus:outline-none focus:border-ink transition-colors" />
                </div>
                <div>
                  <label htmlFor="level" className="block font-sans text-sm font-bold uppercase mb-2 text-ink/80">Membership Level *</label>
                  <select required id="level" name="level" className="w-full bg-cream border border-ink/20 px-4 py-3 font-sans focus:outline-none focus:border-ink transition-colors appearance-none rounded-none">
                    <option value="standard">Standard Member (50 CHF/Year)</option>
                    <option value="lifetime">Lifetime Legacy (1000 CHF)</option>
                  </select>
                </div>
                <div className="pt-4">
                  <Button type="submit" variant="brutalist" size="lg" className="w-full text-lg" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </div>
                
                {status === 'error' && (
                  <p className="text-red-600 font-sans text-sm font-bold text-center mt-2 uppercase">Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
