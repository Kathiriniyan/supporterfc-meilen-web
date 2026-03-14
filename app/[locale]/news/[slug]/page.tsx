import * as React from 'react';
import Link from 'next/link';
import { sanityFetch } from '@/lib/sanity/fetch';
import { BLOG_DETAIL_QUERY } from '@/lib/sanity/queries';
import { Container } from '@/components/layout/Container';
import { RichText } from '@/components/ui/RichText';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const post: any = await sanityFetch({
    query: BLOG_DETAIL_QUERY,
    params: { slug: resolvedParams.slug },
  }).catch(() => null);

  if (!post) return { title: 'News Not Found' };
  return { title: `${post.title} - SupporterFC Meilen News` };
}

export default async function NewsDetail({ params }: Props) {
  const resolvedParams = await params;
  const post: any = await sanityFetch({
    query: BLOG_DETAIL_QUERY,
    params: { slug: resolvedParams.slug },
  }).catch(() => null);

  if (!post) {
    return (
      <div className="pt-32 pb-24 bg-cream min-h-screen">
        <Container className="max-w-3xl">
          <Link href="/news" className="inline-flex items-center gap-2 font-sans text-sm font-bold uppercase text-ink/60 hover:text-orange mb-12 transition-colors">
            <ArrowLeft size={16} /> Back to News
          </Link>
          <div className="p-8 border border-ink/20 text-center font-serif text-xl italic text-ink/60 bg-vintage">
            News item not found or mock data being viewed.
          </div>
        </Container>
      </div>
    );
  }

  // Simplified UI compared to blog, no massive images. Strictly information delivery.
  return (
    <article className="pt-32 pb-24 bg-cream min-h-screen">
      <Container className="max-w-3xl">
        <Link href="/news" className="inline-flex items-center gap-2 font-sans text-sm font-bold uppercase text-ink/60 hover:text-orange mb-12 transition-colors">
          <ArrowLeft size={16} /> Back to News
        </Link>
        
        <header className="mb-12 border-b border-ink/20 pb-8">
          <time className="font-sans text-sm font-bold uppercase text-orange tracking-widest block mb-4">
            {format(new Date(post.publishedAt), 'MMMM dd, yyyy - HH:mm')}
          </time>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black uppercase text-ink tracking-tight leading-[0.95]">
            {post.title}
          </h1>
        </header>

        <div className="prose prose-lg md:prose-xl max-w-none text-ink/90 bg-vintage border border-ink/10 p-6 md:p-12 shadow-[4px_4px_0_0_rgba(11,12,16,0.1)]">
          {post.content ? <RichText content={post.content} /> : (
            <p className="font-serif italic text-ink/60">No additional details provided.</p>
          )}
        </div>
      </Container>
    </article>
  );
}
