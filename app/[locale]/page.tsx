import { HeroSection } from '@/components/sections/Hero';
import { AnniversaryIntro } from '@/components/sections/Intro';
import { TimelinePreview } from '@/components/sections/TimelinePreview';
import { SupporterStoriesPreview } from '@/components/sections/Stories';
import { MerchPreview } from '@/components/sections/Merch';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AnniversaryIntro />
      <TimelinePreview />
      <SupporterStoriesPreview />
      <MerchPreview />
    </>
  );
}
