import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
  console.warn(
    'Sanity configuration is missing. Please set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in your .env.local file.'
  );
}

export const client = createClient({
  projectId: projectId || 'your-project-id',
  dataset: dataset || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Set to true in production if you want to use the edge cache
});
