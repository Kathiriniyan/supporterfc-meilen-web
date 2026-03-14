import { MetadataRoute } from 'next';
import { sanityFetch } from '@/lib/sanity/fetch';
import { BLOG_LIST_QUERY, PRODUCTS_QUERY } from '@/lib/sanity/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://supporterfc-meilen.ch';

  const posts = await sanityFetch<any[]>({ query: BLOG_LIST_QUERY }).catch(() => []);
  const products = await sanityFetch<any[]>({ query: PRODUCTS_QUERY }).catch(() => []);

  const blogUrls: MetadataRoute.Sitemap = posts.map((post: any) => ({
    url: `${baseUrl}/en/blog/${post.slug.current}`,
    lastModified: new Date(post.publishedAt || Date.now()),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const newsUrls: MetadataRoute.Sitemap = posts.map((post: any) => ({
    url: `${baseUrl}/en/news/${post.slug.current}`,
    lastModified: new Date(post.publishedAt || Date.now()),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const productUrls: MetadataRoute.Sitemap = products.map((product: any) => ({
    url: `${baseUrl}/en/merchandise/${product.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/blog',
    '/news',
    '/about',
    '/merchandise',
    '/gallery',
    '/join',
    '/contact',
  ].flatMap((route) => [
    {
      url: `${baseUrl}/en${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'daily' : 'weekly',
      priority: route === '' ? 1.0 : 0.8,
    },
    {
      url: `${baseUrl}/de${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'daily' : 'weekly',
      priority: route === '' ? 1.0 : 0.8,
    }
  ]);

  return [...staticRoutes, ...blogUrls, ...newsUrls, ...productUrls];
}
