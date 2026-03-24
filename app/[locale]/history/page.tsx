import { HistoryHero } from '@/components/sections/HistoryHero';
import { MilestoneCards } from '@/components/sections/MilestoneCards';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function HistoryPage() {
    const t = useTranslations('HistoryPage');

    return (
        <div className="min-h-screen pt-20">
            <HistoryHero />
            <MilestoneCards />

            {/* Archive Call to Action */}
            <section className="py-16 md:py-32 bg-vintage text-center border-t border-ink/20">
                <Container>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-6xl font-sans font-black uppercase text-ink mb-8 md:mb-12 leading-tight">
                            {t('cta')}
                        </h2>
                        <Button asChild variant="brutalist" size="lg" className="scale-100 md:scale-110">
                            <Link href="/join">{t('cta').split(' ').slice(0, 2).join(' ')}</Link>
                        </Button>
                    </div>
                </Container>
            </section>
        </div>
    );
}
