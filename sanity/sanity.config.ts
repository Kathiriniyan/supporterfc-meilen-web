import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schema } from './schema';
import { deskStructure } from './deskStructure';

export const config = defineConfig({
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
