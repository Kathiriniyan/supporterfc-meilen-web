import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { sanityFetch } from '@/lib/sanity/fetch';
import { NEWS_LIST_QUERY } from '@/lib/sanity/queries';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';

export async function NewsPreview() {
    const t = await getTranslations('News');
    const rawPosts = await sanityFetch<any[]>({ query: NEWS_LIST_QUERY }).catch(() => []);

    // Take the latest 3 posts
    const posts = rawPosts.length > 0 ? rawPosts.slice(0, 3) : [
        { _id: '1', title: 'Away Bus to Winterthur Fully Booked', slug: { current: 'bus-winterthur' }, publishedAt: '2026-03-15T12:00:00Z' },
        { _id: '2', title: 'Choreo Prep Meeting This Thursday', slug: { current: 'choreo-prep' }, publishedAt: '2026-03-14T12:00:00Z' },
        { _id: '3', title: 'New Scarf Design Dropping Next Week', slug: { current: 'new-scarf' }, publishedAt: '2026-03-13T12:00:00Z' },
    ];

    return (
        <section className="py-24 border-b border-ink/20 bg-cream">
            <Container className="max-w-7xl">
                <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 border-b border-ink pb-8">
                    <div>
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-sans font-black uppercase text-ink tracking-tighter">
                            {t('title')}
                        </h2>
                        <p className="font-serif text-xl text-ink/70 mt-2 italic">{t('subtitle')}</p>
                    </div>
                    <Link
                        href="/news"
                        className="hidden md:flex items-center gap-2 font-sans font-black uppercase text-sm hover:text-orange transition-colors group mt-4 md:mt-0"
                    >
                        {t('allNews')}
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="flex flex-col">
                    {posts.map((post) => (
                        <Link
                            key={post._id}
                            href={`/news/${post.slug.current}`}
                            className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-ink/10 hover:bg-white/50 transition-colors px-6 -mx-6"
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline md:gap-12">
                                <time className="font-sans text-xs md:text-sm font-bold uppercase text-orange w-32 tracking-widest shrink-0 mb-2 md:mb-0">
                                    {format(new Date(post.publishedAt), 'MMM dd, yyyy')}
                                </time>
                                <h3 className="font-sans text-2xl md:text-3xl font-bold uppercase leading-tight group-hover:text-gold transition-colors">
                                    {post.title}
                                </h3>
                            </div>
                            <div className="text-ink/30 group-hover:text-ink transition-colors mt-4 md:mt-0">
                                <span className="font-sans text-xs font-black uppercase tracking-widest border-b-2 border-transparent group-hover:border-gold pb-1">
                                    {t('readMore')}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 md:hidden">
                    <Button asChild variant="outline" className="w-full">
                        <Link href="/news">{t('allNews')}</Link>
                    </Button>
                </div>
            </Container>
        </section>
    );
}
