import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  icon: () => '💼',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
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
      name: 'index',
      title: 'Display Sequence Order (1 - 6)',
      type: 'number',
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type / Context Heading',
      type: 'string',
      description: 'e.g., SANDBOX PROTOTYPE · EUBRICS CHALLENGE, CLIENT ENGAGEMENT, etc.',
    }),
    defineField({
      name: 'badge',
      title: 'Status Badge',
      type: 'string',
      options: {
        list: [
          { title: 'Client Engagement', value: 'CLIENT ENGAGEMENT' },
          { title: 'Personal Project / R&D', value: 'PERSONAL PROJECT / R&D' },
          { title: 'Validated Prototype', value: 'VALIDATED PROTOTYPE' },
          { title: 'Strategic Blueprint', value: 'STRATEGIC BLUEPRINT' },
          { title: 'Prototype', value: 'PROTOTYPE' },
        ],
      },
    }),
    defineField({
      name: 'runtime',
      title: 'Walkthrough Runtime',
      type: 'string',
      description: 'e.g., 24 MIN WALKTHROUGH',
    }),
    defineField({
      name: 'tagline',
      title: 'Summary / Tagline',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client / Originating Entity',
      type: 'string',
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline / Development Status',
      type: 'string',
    }),
    defineField({
      name: 'coverImage',
      title: 'Hero Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text (Crucial for SEO)',
        },
      ],
    }),
    defineField({
      name: 'primaryMetric',
      title: 'Primary Outcome Metric Headline',
      type: 'string',
      description: 'e.g., "4 Workflows · 0 Errors" or "28 hrs/wk saved"',
    }),
    defineField({
      name: 'metricSubtitle',
      title: 'Metric Subtitle / Verification Note',
      type: 'string',
    }),
    defineField({
      name: 'tags',
      title: 'Technology Stack Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'searchIntent',
      title: 'Search Intent & AEO Target',
      type: 'string',
      description: 'Natural language search query this project answers',
    }),
    defineField({
      name: 'targetAudience',
      title: 'Target Audience',
      type: 'string',
    }),
    defineField({
      name: 'video',
      title: 'Video Demo / Walkthrough (Optional)',
      type: 'object',
      fields: [
        { name: 'src', title: 'Video URL (MP4 / WebM / CDN)', type: 'string' },
        { name: 'poster', title: 'Poster Image URL', type: 'string' },
        { name: 'duration', title: 'Duration Label', type: 'string' },
        { name: 'title', title: 'Walkthrough Title', type: 'string' },
      ],
    }),
    defineField({
      name: 'evidenceGallery',
      title: 'Evidence Gallery & Architectural Blueprints',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', title: 'Tab ID', type: 'string' },
            { name: 'label', title: 'Tab Label', type: 'string' },
            { name: 'title', title: 'Diagram Title', type: 'string' },
            {
              name: 'image',
              title: 'Diagram / Blueprint Image',
              type: 'image',
              options: { hotspot: true },
              fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
            },
            { name: 'tag', title: 'Proof Badge Tag', type: 'string' },
            { name: 'desc', title: 'Technical Description', type: 'text', rows: 3 },
          ],
        },
      ],
    }),
    defineField({
      name: 'problem',
      title: 'Problem Definition',
      type: 'object',
      fields: [
        { name: 'headline', title: 'Problem Headline', type: 'string' },
        { name: 'lead', title: 'Problem Lead Paragraph', type: 'text', rows: 3 },
        {
          name: 'points',
          title: 'Problem Failure Modes',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    }),
    defineField({
      name: 'solution',
      title: 'Engineering Solution',
      type: 'object',
      fields: [
        { name: 'headline', title: 'Solution Headline', type: 'string' },
        { name: 'lead', title: 'Solution Lead Paragraph', type: 'text', rows: 3 },
        {
          name: 'points',
          title: 'Solution Pillars',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    }),
    defineField({
      name: 'architecture',
      title: 'System Architecture Specification',
      type: 'object',
      fields: [
        { name: 'headline', title: 'Architecture Headline', type: 'string' },
        { name: 'lead', title: 'Architecture Lead Paragraph', type: 'text', rows: 3 },
        {
          name: 'components',
          title: 'Core Architectural Subsystems',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'name', title: 'Subsystem Name', type: 'string' },
                { name: 'role', title: 'Role in Pipeline', type: 'string' },
                { name: 'details', title: 'Technical Details', type: 'text', rows: 3 },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'telemetry',
      title: 'Operational Telemetry & Indicators',
      type: 'object',
      fields: [
        { name: 'status', title: 'Telemetry Status (e.g. OPERATIONAL)', type: 'string' },
        { name: 'note', title: 'Telemetry Note', type: 'string' },
        {
          name: 'indicators',
          title: 'Metrics & SLA Gauges',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', title: 'Metric Label', type: 'string' },
                { name: 'value', title: 'Metric Value', type: 'string' },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'outcomes',
      title: 'Measured Outcomes & Business Impact',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Outcome Metric (e.g. 28 hrs/wk)', type: 'string' },
            { name: 'label', title: 'Outcome Label', type: 'string' },
            { name: 'desc', title: 'Outcome Attribution & Proof', type: 'text', rows: 2 },
          ],
        },
      ],
    }),
    defineField({
      name: 'faq',
      title: 'AEO / GEO Question-Based FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Direct Deterministic Answer', type: 'text', rows: 3 },
          ],
        },
      ],
    }),
    defineField({
      name: 'relatedProjects',
      title: 'Related Projects',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', title: 'Project Slug / ID', type: 'string' },
            { name: 'title', title: 'Project Title', type: 'string' },
            { name: 'note', title: 'Architectural Synergy Note', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Social Metadata',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 },
        { name: 'canonicalUrl', title: 'Canonical URL Override', type: 'url' },
        { name: 'noIndex', title: 'Hide from Search Engines (noindex)', type: 'boolean', initialValue: false },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tagline',
      media: 'coverImage',
    },
  },
});
