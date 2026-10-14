import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'tag',
  title: 'Technology Tag',
  type: 'document',
  icon: () => '🏷️',
  fields: [
    defineField({
      name: 'title',
      title: 'Tag Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Automation & Workflow Engine', value: 'Automation' },
          { title: 'CRM & Pipeline', value: 'CRM' },
          { title: 'AI & Large Language Models', value: 'AI' },
          { title: 'Enrichment & Prospecting', value: 'Enrichment' },
          { title: 'Languages & Core Tech', value: 'Languages' },
          { title: 'Analytics & Telemetry', value: 'Analytics' },
          { title: 'General', value: 'General' },
        ],
      },
    }),
    defineField({
      name: 'color',
      title: 'Badge Accent Color (Hex)',
      type: 'string',
      description: 'Optional hex code for badge styling (e.g. #00ffff)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
    },
  },
});
