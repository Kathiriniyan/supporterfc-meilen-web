'use client';

import * as React from 'react';
import gsap from 'gsap';
import { useTranslations } from 'next-intl';
import { Container } from '../layout/Container';

interface HeroProps {
  title?: string;
  subtitle?: string;
}

export function HeroSection({ title: propTitle, subtitle: propSubtitle }: HeroProps) {
  const t = useTranslations('Hero');
  const title = propTitle || t('title');
  const subtitle = propSubtitle || t('subtitle');

  const containerRef = React.useRef<HTMLDivElement>(null);
  const boxRef = React.useRef<HTMLDivElement>(null);
  const textRef = React.useRef<HTMLHeadingElement>(null);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      gsap.set(boxRef.current, { y: 100, opacity: 0, scale: 0.95 });
      gsap.set(textRef.current, { opacity: 0, y: 30 });

      tl.to(boxRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power4.out',
      }).to(
        textRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.6'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="pt-32 pb-24 bg-cream overflow-hidden">
      <Container>
        <div
          ref={boxRef}
          className="relative min-h-[70vh] flex items-center justify-center border-[6px] border-ink bg-ink shadow-[20px_20px_0_0_#1A1A1A] overflow-hidden group"
        >
          {/* Layer 1: Background Image */}
          <div
            className="absolute inset-0 z-0 grayscale group-hover:grayscale-0 transition-all duration-1000"
            style={{
              backgroundImage: 'url("/Hero.JPG")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Layer 2: Gradient Overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-ink via-ink/40 to-transparent opacity-80" />

          {/* Layer 3: Radial Dot Pattern */}
          <div
            className="absolute inset-0 z-20 opacity-30 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at center, #D4AF37 1px, transparent 1.5px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Layer 4: Content */}
          <div className="relative z-30 text-center px-6 max-w-5xl">
            <h1
              ref={textRef}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-sans font-black uppercase tracking-tighter leading-[0.85] text-cream drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
            >
              {title}
            </h1>
            {subtitle && (
              <p className="mt-8 font-serif text-xl md:text-2xl lg:text-3xl text-cream/80 max-w-2xl mx-auto italic drop-shadow-md">
                {subtitle}
              </p>
            )}
          </div>

          {/* Decorative Corner Accents */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-gold z-40" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-orange z-40" />
        </div>
      </Container>
    </section>
  );
}
