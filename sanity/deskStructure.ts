import type { StructureResolver } from 'sanity/desk';

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Editorial Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.divider(),
      S.listItem()
        .title('Blog / News')
        .child(
          S.list()
            .title('Blog / News')
            .items([
              S.documentTypeListItem('post').title('Posts'),
              S.documentTypeListItem('category').title('Categories'),
              S.documentTypeListItem('author').title('Authors'),
            ])
        ),
      S.listItem()
        .title('Heritage')
        .child(
          S.list()
            .title('Heritage Content')
            .items([
              S.documentTypeListItem('timelineItem').title('Timeline Milestones'),
              S.documentTypeListItem('galleryItem').title('Galleries'),
            ])
        ),
      S.listItem()
        .title('Merchandise')
        .child(
          S.list()
            .title('Merchandise')
            .items([
              S.documentTypeListItem('product').title('Products'),
              S.documentTypeListItem('productCategory').title('Categories'),
            ])
        ),
    ]);
