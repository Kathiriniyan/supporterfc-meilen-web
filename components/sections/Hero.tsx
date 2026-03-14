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
  const textRef = React.useRef<HTMLHeadingElement>(null);
  const bgRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Start bg scaled up
      gsap.set(bgRef.current, { scale: 1.1, opacity: 0 });
      gsap.set(textRef.current, { y: 50, opacity: 0 });

      tl.to(bgRef.current, {
        scale: 1,
        opacity: 0.1,
        duration: 2,
        ease: 'power3.out',
      }).to(
        textRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
        },
        '-=1.5' // Overlap animation
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-ink/20 pt-20">
      {/* Background Graphic Box */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 bg-ink"
        style={{
          // Placeholder pattern for the structural aesthetic
          backgroundImage: 'radial-gradient(circle at center, #F5A900 2px, transparent 2.5px)',
          backgroundSize: '40px 40px',
        }}
      />

      <Container className="relative z-10 flex flex-col items-center text-center">
        <h1
          ref={textRef}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-sans font-black uppercase tracking-tighter leading-[0.85] text-ink drop-shadow-sm max-w-5xl"
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-8 font-serif text-2xl md:text-3xl lg:text-4xl text-ink/80 max-w-2xl mx-auto italic">
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  );
}
