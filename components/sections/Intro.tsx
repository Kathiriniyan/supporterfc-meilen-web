'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import Link from 'next/link';

export function AnniversaryIntro() {
  const t = useTranslations('Intro');

  return (
    <section className="py-24 md:py-32 border-b border-ink/20 bg-cream">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Big Number Column */}
          <div className="lg:col-span-5 flex items-start">
            <h2 className="text-[8rem] sm:text-[12rem] lg:text-[16rem] font-sans font-black text-ink leading-none tracking-tighter drop-shadow-[8px_8px_0_rgba(245,169,0,1)]">
              {t('year')}
            </h2>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            <p className="font-sans font-bold uppercase tracking-widest text-orange text-sm md:text-base">
              {t('overline')}
            </p>
            <h3 className="font-serif text-3xl md:text-5xl leading-tight text-ink font-semibold italic">
              {t('headline')}
            </h3>
            <div className="font-serif text-lg md:text-xl text-ink/80 leading-relaxed space-y-6">
              <p>{t('p1')}</p>
              <p>{t('p2')}</p>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
