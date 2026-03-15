'use client';

'use client';

import * as React from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';

export function SupporterStoriesPreview() {
  const t = useTranslations('Stories');
  const stories = [1, 2, 3]; // Mock posts

  return (
    <section className="py-24 border-b border-ink/20 bg-cream relative">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black uppercase text-ink tracking-tight">
              {t('title')}
            </h2>
            <p className="font-serif text-ink/70 mt-2 italic text-lg md:text-xl">{t('subtitle')}</p>
          </div>
          <Button asChild variant="outline" className="hidden md:inline-flex mt-8 md:mt-0">
            <Link href="/blog">{t('readAll')}</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((s) => (
            <Link key={s} href={`/blog/story-${s}`} className="group block bg-vintage border border-ink/20 hover:border-ink hover:shadow-[8px_8px_0_0_#F5A900] pb-6 transition-all duration-300">
              <div className="aspect-[4/3] w-full bg-ink/5 mb-6 overflow-hidden border-b border-ink/20 grayscale group-hover:grayscale-0 transition-all duration-500 flex items-center justify-center font-sans uppercase font-bold text-ink/20 text-sm tracking-widest">
                {t('coverImage')}
              </div>
              <div className="px-6">
                <span className="font-sans text-xs font-bold uppercase text-orange tracking-widest block mb-2">
                  {t('matchday')} / Oct 24, 2024
                </span>
                <h3 className="font-sans text-2xl font-bold uppercase leading-none mb-4 group-hover:text-gold transition-colors">
                  {t('derbyTitle')}
                </h3>
                <p className="font-serif text-ink/70 line-clamp-3 leading-relaxed">
                  {t('derbyDesc')}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 md:hidden">
          <Button asChild variant="outline" className="w-full">
            <Link href="/blog">{t('readAll')}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
