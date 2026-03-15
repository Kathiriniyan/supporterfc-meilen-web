import { client } from './client';

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: any;
  tags?: string[];
}): Promise<QueryResponse> {
  try {
    return await client.fetch<QueryResponse>(query, params, {
      next: {
        revalidate: 3600, // ISR cache for 1 hour
        tags,
      },
    });
  } catch (error) {
    console.error('Sanity fetch error:', error);
    throw error;
  }
}
