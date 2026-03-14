import * as React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';

export function MerchPreview() {
  const t = useTranslations('Merch');
  const products = [1, 2, 3, 4]; // Mock

  return (
    <section className="py-24 border-b border-ink/20 bg-vintage">
      <Container>
        <div className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
          <span className="font-sans text-xs font-bold uppercase text-orange tracking-widest block mb-4">
            {t('overline')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black uppercase text-ink tracking-tight mb-6">
            {t('title')}
          </h2>
          <p className="font-serif text-ink/70 italic text-lg md:text-xl">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {products.map((p) => (
            <Link key={p} href={`/merchandise/product-${p}`} className="group block border border-ink/20 bg-cream p-4 hover:border-ink transition-colors">
              <div className="aspect-square bg-white border border-ink/10 mb-4 mix-blend-multiply flex items-center justify-center font-sans font-bold text-ink/20 uppercase">
                Product Shot
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-sans font-bold uppercase leading-tight group-hover:text-orange transition-colors">
                    {t('productName')}
                  </h3>
                  <p className="font-serif text-ink/60 text-sm mt-1">{t('oneSize')}</p>
                </div>
                <span className="font-sans font-black">CHF 25</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center">
          <Button asChild variant="brutalist" size="lg">
            <Link href="/merchandise">{t('shopAll')}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
