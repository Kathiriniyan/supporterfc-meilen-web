import { HeroSection } from '@/components/sections/Hero';
import { AnniversaryIntro } from '@/components/sections/Intro';
import { TimelinePreview } from '@/components/sections/TimelinePreview';
import { NewsPreview } from '@/components/sections/NewsPreview';
import { GalleryPreview } from '@/components/sections/GalleryPreview';
import { SupporterStoriesPreview } from '@/components/sections/Stories';
import { MerchPreview } from '@/components/sections/Merch';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  return (
    <>
      <HeroSection />
      <AnniversaryIntro />
      <TimelinePreview />
      <NewsPreview locale={locale} />
      <GalleryPreview locale={locale} />
      <SupporterStoriesPreview />
      <MerchPreview />
    </>
  );
}
