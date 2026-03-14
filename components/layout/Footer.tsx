'use client';

import * as React from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Container } from './Container';
import { Button } from '../ui/Button';

export function Footer() {
  const t = useTranslations('Navigation');
  const tf = useTranslations('Footer');

  return (
    <footer className="bg-cream border-t border-ink/20 pt-20 pb-10 mt-auto">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Brand Col */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-sans font-black uppercase tracking-tighter">
              SupporterFC<span className="text-gold">Meilen</span>
            </h2>
            <p className="font-serif text-ink/70">
              {tf('brandDesc')}
            </p>
          </div>

          {/* Links Col */}
          <div className="flex flex-col gap-4">
            <h3 className="font-sans font-bold uppercase text-lg">{tf('menu')}</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/about" className="font-sans font-medium hover:text-orange uppercase text-sm">{t('about')}</Link>
              <Link href="/history" className="font-sans font-medium hover:text-orange uppercase text-sm">{t('history')}</Link>
              <Link href="/news" className="font-sans font-medium hover:text-orange uppercase text-sm">{t('news')}</Link>
              <Link href="/gallery" className="font-sans font-medium hover:text-orange uppercase text-sm">{t('gallery')}</Link>
            </nav>
          </div>

          {/* Contact Col */}
          <div className="flex flex-col gap-4">
            <h3 className="font-sans font-bold uppercase text-lg">{t('contact')}</h3>
            <address className="not-italic font-serif text-ink/70 flex flex-col gap-1">
              <span>SupporterFC Meilen</span>
              <span>Postfach 123</span>
              <span>8706 Meilen</span>
              <a href="mailto:info@supporterfc-meilen.ch" className="mt-2 text-ink hover:text-orange transition-colors">info@supporterfc-meilen.ch</a>
            </address>
          </div>

          {/* Newsletter / CTA Col */}
          <div className="flex flex-col gap-4">
            <h3 className="font-sans font-bold uppercase text-lg">{tf('newsletterTitle')}</h3>
            <p className="font-serif text-ink/70 text-sm">{tf('newsletterDesc')}</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={tf('emailPlaceholder')}
                className="flex-1 bg-vintage border border-ink/20 px-4 py-2 text-sm focus:outline-none focus:border-ink font-sans placeholder:text-ink/40"
              />
              <Button type="submit" variant="default" size="sm">{tf('subscribe')}</Button>
            </form>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-ink/10 flex flex-col md:flex-row items-center justify-between text-xs font-sans text-ink/50 uppercase">
          <p>© {new Date().getFullYear()} SupporterFC Meilen. {tf('rights')}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-ink">{tf('privacy')}</Link>
            <Link href="/terms" className="hover:text-ink">{tf('terms')}</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
