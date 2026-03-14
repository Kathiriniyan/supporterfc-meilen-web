import * as React from 'react';
import Link from 'next/link';
import { sanityFetch } from '@/lib/sanity/fetch';
import { BLOG_LIST_QUERY } from '@/lib/sanity/queries';
import { Container } from '@/components/layout/Container';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'News - SupporterFC Meilen',
  description: 'Fast, timestamped club announcements and short updates.',
};

export default async function NewsPage() {
  const rawPosts = await sanityFetch<any[]>({ query: BLOG_LIST_QUERY }).catch(() => []);
  
  // Filter for news (in a real app, query by a specific 'News' category slug)
  const posts = rawPosts.length > 0 ? rawPosts : [
    { _id: '1', title: 'Away Bus to Winterthur Fully Booked', slug: { current: 'bus-winterthur' }, publishedAt: new Date().toISOString() },
    { _id: '2', title: 'Choreo Prep Meeting This Thursday', slug: { current: 'choreo-prep' }, publishedAt: new Date(Date.now() - 86400000).toISOString() },
    { _id: '3', title: 'New Scarf Design Dropping Next Week', slug: { current: 'new-scarf' }, publishedAt: new Date(Date.now() - 172800000).toISOString() },
    { _id: '4', title: 'Stand Together: Statement on Ticket Prices', slug: { current: 'statement-tickets' }, publishedAt: new Date(Date.now() - 259200000).toISOString() },
  ];

  return (
    <div className="pt-32 pb-24 bg-cream min-h-screen">
      <Container className="max-w-4xl">
        <header className="mb-16 border-b border-ink/20 pb-8">
          <h1 className="text-6xl md:text-8xl font-sans font-black uppercase text-ink tracking-tighter drop-shadow-sm">
            News
          </h1>
          <p className="font-serif text-xl md:text-2xl text-ink/70 mt-4 italic max-w-2xl">
            Important announcements, travel info, and quick updates.
          </p>
        </header>

        <div className="flex flex-col border-t border-ink/20">
          {posts.map((post) => (
            <Link 
              key={post._id} 
              href={`/news/${post.slug.current}`} 
              className="group flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-ink/20 hover:bg-ink/5 transition-colors px-4 -mx-4"
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:gap-8">
                <time className="font-sans text-xs md:text-sm font-bold uppercase text-orange w-32 tracking-widest shrink-0 mb-2 md:mb-0">
                  {format(new Date(post.publishedAt), 'MMM dd, yyyy')}
                </time>
                <h2 className="font-sans text-xl md:text-2xl font-bold uppercase leading-tight group-hover:text-gold transition-colors">
                  {post.title}
                </h2>
              </div>
              <div className="hidden md:flex items-center text-ink/40 group-hover:text-ink transition-colors group-hover:translate-x-2 transform duration-300">
                <ArrowRight size={24} />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
