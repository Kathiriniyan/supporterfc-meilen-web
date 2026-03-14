import * as React from 'react';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';

export const metadata = {
  title: 'About Us - SupporterFC Meilen',
  description: 'Our Philosophy, Community Values, and Supporter Culture.',
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-cream min-h-screen">
      <Container className="max-w-5xl">
        <header className="mb-24 border-b border-ink/20 pb-16 text-center">
          <span className="font-sans text-sm font-bold uppercase text-orange tracking-widest block mb-6">
            Our Identity
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-sans font-black uppercase text-ink tracking-tighter leading-[0.85] drop-shadow-sm mb-8">
            Against Modern <br/><span className="text-gold">Football</span>
          </h1>
          <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-ink/70 max-w-3xl mx-auto italic leading-normal">
            We stand for tradition, local pride, and 90 minutes of unconditional vocal support.
          </p>
        </header>

        {/* Section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-32 items-center">
          <div className="aspect-[3/4] w-full bg-ink/10 border border-ink/20 relative grayscale hover:grayscale-0 transition-all duration-700">
            <div className="absolute inset-0 flex items-center justify-center font-sans font-bold uppercase tracking-widest text-ink/20 text-sm">
              Archive Photo 1
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl lg:text-6xl font-sans font-black uppercase text-ink tracking-tight mb-8 leading-[0.9]">
              The Founding Myth
            </h2>
            <div className="font-serif text-lg md:text-xl text-ink/80 space-y-6 leading-relaxed">
              <p>
                In the autumn of 1975, a group of friends stood behind the goal in the rain, watching Meilen lose a tight game. Instead of leaving, they started singing. That single act of defiance against the weather and the scoreline birthed a movement.
              </p>
              <p>
                For five decades, SupporterFC Meilen has been the beating heart of our stadium. We aren't just fans; we are the 12th man. We organize the choreographies, we fund the away buses, and we ensure the spirit of local football never dies.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-32 items-center">
          <div className="flex flex-col justify-center order-2 md:order-1">
            <h2 className="text-4xl lg:text-6xl font-sans font-black uppercase text-ink tracking-tight mb-8 leading-[0.9]">
              Community & Solidarity
            </h2>
            <div className="font-serif text-lg md:text-xl text-ink/80 space-y-6 leading-relaxed">
              <p>
                Our club is more than 90 minutes on a Saturday. It is a family. SupporterFC Meilen actively organizes charitable events, youth tournaments, and local community aid.
              </p>
              <p>
                We believe football belongs to the people. We reject the hyper-commercialization of the sport and fight to keep ticket prices accessible so that everyone in Meilen, regardless of background, can stand on the terraces with us.
              </p>
            </div>
          </div>
          <div className="aspect-[4/3] w-full bg-ink/10 border border-ink/20 relative grayscale hover:grayscale-0 transition-all duration-700 order-1 md:order-2">
            <div className="absolute inset-0 flex items-center justify-center font-sans font-bold uppercase tracking-widest text-ink/20 text-sm">
              Community Action Photo
            </div>
          </div>
        </div>

        {/* Core Values Board */}
        <div className="border border-ink p-8 md:p-16 bg-vintage relative">
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-gold border border-ink" />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-orange border border-ink" />
          <h2 className="text-3xl md:text-5xl font-sans font-black uppercase text-ink tracking-tight mb-12 text-center">
            The Three Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center flex-1">
            <div className="flex flex-col items-center">
              <span className="text-6xl font-sans font-black text-ink/10 mb-4 block">01</span>
              <h3 className="font-sans font-bold text-2xl uppercase mb-4 text-ink">Loyalty</h3>
              <p className="font-serif text-ink/70">Through the leagues, through the decades. We never leave early.</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-6xl font-sans font-black text-ink/10 mb-4 block">02</span>
              <h3 className="font-sans font-bold text-2xl uppercase mb-4 text-ink">Independence</h3>
              <p className="font-serif text-ink/70">Self-funded, self-organized. We owe nothing to modern sponsors.</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-6xl font-sans font-black text-ink/10 mb-4 block">03</span>
              <h3 className="font-sans font-bold text-2xl uppercase mb-4 text-ink">Passion</h3>
              <p className="font-serif text-ink/70">Loud singing, pyrotechnics, and absolute dedication to the colors.</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
