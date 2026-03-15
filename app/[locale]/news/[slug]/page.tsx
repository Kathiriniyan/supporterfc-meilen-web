import * as React from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { sanityFetch } from '@/lib/sanity/fetch';
import { NEWS_DETAIL_QUERY } from '@/lib/sanity/queries';
import { Container } from '@/components/layout/Container';
import { RichText } from '@/components/ui/RichText';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import { getLocalized } from '@/lib/utils/locale';

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const post: any = await sanityFetch({
    query: NEWS_DETAIL_QUERY,
    params: { slug: resolvedParams.slug },
  }).catch(() => null);

  if (!post) return { title: 'News Not Found' };
  return { title: `${getLocalized(post.title, resolvedParams.locale)} - SupporterFC Meilen News` };
}

export default async function NewsDetail({ params }: Props) {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'NewsPage' });
  const post: any = await sanityFetch({
    query: NEWS_DETAIL_QUERY,
    params: { slug: resolvedParams.slug },
  }).catch(() => null);

  if (!post) {
    return (
      <div className="pt-32 pb-24 bg-cream min-h-screen">
        <Container className="max-w-7xl">
          <Link href="/news" className="inline-flex items-center gap-2 font-sans text-sm font-bold uppercase text-ink/60 hover:text-orange mb-12 transition-colors">
            <ArrowLeft size={16} /> {t('backToNews')}
          </Link>
          <div className="p-8 border border-ink/20 text-center font-serif text-xl italic text-ink/60 bg-vintage">
            {t('notFound')}
          </div>
        </Container>
      </div>
    );
  }

  // Simplified UI compared to blog, no massive images. Strictly information delivery.
  return (
    <article className="pt-32 pb-24 bg-cream min-h-screen">
      <Container className="max-w-7xl">
        <Link href="/news" className="inline-flex items-center gap-2 font-sans text-sm font-bold uppercase text-ink/60 hover:text-orange mb-12 transition-colors">
          <ArrowLeft size={16} /> {t('backToNews')}
        </Link>

        <header className="mb-12 border-b border-ink/20 pb-8">
          <time className="font-sans text-sm font-bold uppercase text-orange tracking-widest block mb-4">
            {format(new Date(post.publishedAt), 'MMMM dd, yyyy - HH:mm')}
          </time>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black uppercase text-ink tracking-tight leading-[0.95]">
            {getLocalized(post.title, resolvedParams.locale)}
          </h1>
        </header>

        {post.coverImage && (
          <div className="aspect-[21/9] w-full relative mb-12 border border-ink/20 bg-cream mix-blend-multiply flex items-center justify-center">
            <Image
              src={urlFor(post.coverImage).url()}
              alt={getLocalized(post.title, resolvedParams.locale)}
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              priority
            />
          </div>
        )}

        <div className="prose prose-lg md:prose-xl max-w-none text-ink/90 bg-vintage border border-ink/10 p-6 md:p-12 shadow-[4px_4px_0_0_rgba(11,12,16,0.1)]">
          {post.content ? <RichText content={post.content} /> : (
            <p className="font-serif italic text-ink/60">{t('noDetails')}</p>
          )}
        </div>
      </Container>
    </article>
  );
}
