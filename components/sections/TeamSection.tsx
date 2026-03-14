'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '../layout/Container';

export function TeamSection() {
    const t = useTranslations('About.team');

    const members = [
        { id: 'm1', color: 'bg-gold' },
        { id: 'm2', color: 'bg-orange' },
        { id: 'm3', color: 'bg-ink text-cream' },
        { id: 'm4', color: 'bg-vintage' }
    ];

    return (
        <section className="py-24 bg-cream">
            <Container>
                <div className="mb-16">
                    <h2 className="text-5xl md:text-7xl font-sans font-black uppercase text-ink mb-4">
                        {t('title')}
                    </h2>
                    <p className="font-serif italic text-2xl text-ink/60">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {members.map((m) => (
                        <div key={m.id} className={`group border-2 border-ink p-8 ${m.color} shadow-[6px_6px_0_0_#1A1A1A] transition-transform hover:-translate-y-2`}>
                            <div className="aspect-square bg-white/10 mb-6 border border-ink/10 relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                                <div className="absolute inset-0 flex items-center justify-center font-sans font-black text-ink/5 text-6xl">
                                    {t(`members.${m.id}.code`)}
                                </div>
                            </div>
                            <h3 className="text-2xl font-sans font-black uppercase mb-1">
                                {t(`members.${m.id}.name`)}
                            </h3>
                            <p className="font-sans font-bold text-xs uppercase tracking-widest opacity-60 mb-8 font-black">
                                {t(`members.${m.id}.role`)}
                            </p>
                            <span className="font-sans font-black text-4xl opacity-10">
                                {t(`members.${m.id}.code`)}
                            </span>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
