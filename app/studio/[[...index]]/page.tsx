'use client';

import { NextStudio } from 'next-sanity/studio';
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schema } from '@/sanity/schema';
import { deskStructure } from '@/sanity/deskStructure';

const config = defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: 'SupporterFC Meilen Studio',
  basePath: '/studio',
  plugins: [
    deskTool({
      structure: deskStructure,
    }),
  ],
  schema: {
    types: schema,
  },
});

export default function StudioPage() {
  return <NextStudio config={config} />;
}
