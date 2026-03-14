import { type SchemaTypeDefinition } from 'sanity';
import { post } from './schemas/post';
import { category } from './schemas/category';
import { author } from './schemas/author';
import { galleryItem } from './schemas/galleryItem';
import { timelineItem } from './schemas/timelineItem';
import { product } from './schemas/product';
import { productCategory } from './schemas/productCategory';
import { siteSettings } from './schemas/siteSettings';

export const schema: SchemaTypeDefinition[] = [
  post,
  category,
  author,
  galleryItem,
  timelineItem,
  product,
  productCategory,
  siteSettings,
];
