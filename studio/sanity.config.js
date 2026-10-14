import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas/index.js';

export default defineConfig({
  name: 'default',
  title: 'Varun Portfolio CMS',

  projectId: 'ssxg7fat',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Portfolio Content')
          .items([
            S.listItem()
              .title('Case Studies')
              .icon(() => '💼')
              .schemaType('caseStudy')
              .child(S.documentTypeList('caseStudy').title('Case Studies')),
            S.listItem()
              .title('Blog Posts')
              .icon(() => '📝')
              .schemaType('blogPost')
              .child(S.documentTypeList('blogPost').title('Blog Posts')),
            S.divider(),
            S.listItem()
              .title('Technology Tags')
              .icon(() => '🏷️')
              .schemaType('tag')
              .child(S.documentTypeList('tag').title('Technology Tags')),
            S.listItem()
              .title('Authors')
              .icon(() => '👤')
              .schemaType('author')
              .child(S.documentTypeList('author').title('Authors')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
