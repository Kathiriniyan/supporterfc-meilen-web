import { sanityFetch } from '@/lib/sanity/fetch';
import { GALLERY_QUERY } from '@/lib/sanity/queries';
import { GalleryClient } from '@/components/sections/GalleryClient';

export const metadata = {
  title: 'Gallery - SupporterFC Meilen',
  description: 'Visual archives from the terraces over the past 50 years.',
};

export default async function GalleryPage() {
  const collections = await sanityFetch<any[]>({ query: GALLERY_QUERY }).catch(() => []);
  
  return <GalleryClient initialData={collections} />;
}
