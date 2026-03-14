'use client';

import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/contact', {
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
      <Container className="max-w-6xl">
        <header className="mb-20">
          <span className="font-sans text-sm font-bold uppercase text-orange tracking-widest block mb-6">
            Get in touch
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-sans font-black uppercase text-ink tracking-tighter drop-shadow-sm mb-6 leading-[0.85]">
            Contact <br/><span className="text-gold">HQ</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Form Side */}
          <div className="bg-vintage border border-ink p-8 md:p-12 shadow-[8px_8px_0_0_#0B0C10]">
            <h2 className="text-3xl font-sans font-black uppercase tracking-tight mb-8">Send a Message</h2>
            
            {status === 'success' ? (
              <div className="bg-green-100 border border-green-800 text-green-900 p-6 font-sans font-bold text-center uppercase">
                Message Received. We will get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block font-sans text-sm font-bold uppercase mb-2 text-ink/80">Full Name *</label>
                    <input required type="text" id="name" name="name" className="w-full bg-cream border border-ink/20 px-4 py-3 font-sans focus:outline-none focus:border-ink transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-sans text-sm font-bold uppercase mb-2 text-ink/80">Email Address *</label>
                    <input required type="email" id="email" name="email" className="w-full bg-cream border border-ink/20 px-4 py-3 font-sans focus:outline-none focus:border-ink transition-colors" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block font-sans text-sm font-bold uppercase mb-2 text-ink/80">Subject *</label>
                  <select required id="subject" name="subject" className="w-full bg-cream border border-ink/20 px-4 py-3 font-sans focus:outline-none focus:border-ink transition-colors appearance-none rounded-none">
                    <option value="general">General Inquiry</option>
                    <option value="away_tickets">Away Tickets</option>
                    <option value="choreo">Choreography Contribution</option>
                    <option value="press">Press & Media</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block font-sans text-sm font-bold uppercase mb-2 text-ink/80">Message *</label>
                  <textarea required id="message" name="message" rows={6} className="w-full bg-cream border border-ink/20 px-4 py-3 font-sans focus:outline-none focus:border-ink transition-colors resize-none"></textarea>
                </div>
                <div className="pt-4">
                  <Button type="submit" variant="brutalist" size="lg" className="w-full text-lg" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
                
                {status === 'error' && (
                  <p className="text-red-600 font-sans text-sm font-bold text-center mt-2 uppercase">Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </div>

          {/* Info Side */}
          <div className="flex flex-col">
            <h2 className="text-3xl font-sans font-black uppercase tracking-tight mb-8">Headquarters</h2>
            
            <address className="not-italic font-serif text-ink/80 text-xl space-y-2 mb-12 border-l-4 border-gold pl-6 py-2">
              <p className="font-sans font-bold uppercase text-ink text-sm tracking-widest mb-4">Official Address</p>
              <p>SupporterFC Meilen</p>
              <p>Postfach 123</p>
              <p>8706 Meilen, Zurich</p>
              <p>Switzerland</p>
              <p className="pt-4">
                <a href="mailto:info@supporterfc-meilen.ch" className="text-ink font-sans font-bold uppercase text-sm hover:text-orange transition-colors underline underline-offset-4 decoration-2">
                  info@supporterfc-meilen.ch
                </a>
              </p>
            </address>

            {/* Stark Map Block */}
            <div className="w-full aspect-square md:aspect-[4/3] bg-ink/10 border border-ink/20 relative grayscale hover:grayscale-0 transition-all duration-700 flex items-center justify-center p-8 text-center">
              <div className="z-10 bg-vintage p-6 border border-ink shadow-[4px_4px_0_0_#0B0C10]">
                <p className="font-sans font-bold uppercase text-ink tracking-widest mb-2 text-sm">Meilen Stadium</p>
                <p className="font-serif italic text-ink/80 text-sm">Where we stand on Matchdays.</p>
              </div>
              <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Meilen,Zurich&zoom=14&size=600x400&maptype=roadmap&style=element:geometry%7Ccolor:0xf5f5f5&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x616161&style=element:labels.text.stroke%7Ccolor:0xf5f5f5&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:poi%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:road%7Celement:geometry%7Ccolor:0xffffff&style=feature:road.arterial%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:road.highway%7Celement:geometry%7Ccolor:0xdadada&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:transit.line%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:transit.station%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:water%7Celement:geometry%7Ccolor:0xc9c9c9&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&sensor=false')] opacity-30 mix-blend-multiply bg-cover bg-center" />
            </div>

          </div>
        </div>
      </Container>
    </div>
  );
}
