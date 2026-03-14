'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '../layout/Container';

export function TimelinePreview() {
  const t = useTranslations('Timeline');
  const years = [1975, 1982, 1999, 2010, 2025]; // Mock data

  return (
    <section className="py-24 border-b border-ink/20 overflow-hidden bg-vintage">
      <Container className="mb-12">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black uppercase text-ink tracking-tight">
          {t('title')}
        </h2>
        <p className="font-serif text-ink/70 mt-4 italic text-lg md:text-xl">{t('subtitle')}</p>
      </Container>

      {/* Horizontal Snapshot Scrolling */}
      <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbars pl-4 sm:pl-6 lg:pl-8 pb-8 gap-8">
        {years.map((year, i) => (
          <div
            key={year}
            className="flex-none w-[80vw] sm:w-[60vw] md:w-[45vw] lg:w-[30vw] snap-center lg:snap-start group relative border border-ink/20 bg-cream p-6 hover:border-ink transition-colors duration-300"
          >
            <div className="absolute top-0 right-0 p-4 font-sans font-black text-6xl text-ink/5 group-hover:text-gold transition-colors block">
              '{year.toString().slice(-2)}
            </div>

            <div className="aspect-video relative mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 overflow-hidden border border-ink/10">
              {/* Dummy Image Box */}
              <div className="w-full h-full bg-ink/10 flex items-center justify-center font-sans font-bold text-ink/20 uppercase tracking-widest">
                {t('archivePhoto')}
              </div>
            </div>

            <h3 className="font-sans font-bold text-2xl uppercase mb-3">
              {i === 0 ? t('foundation') : i === 4 ? t('anniversary') : t('victory')}
            </h3>
            <p className="font-serif text-ink/80 text-sm md:text-base leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        ))}
        {/* Spacer for right edge bleed */}
        <div className="flex-none w-4 sm:w-6 lg:w-8" />
      </div>
    </section>
  );
}
