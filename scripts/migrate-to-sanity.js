/**
 * Sanity CMS Content Migration & NDJSON Export Script
 * Converts existing case studies and blog articles into Sanity-ready documents.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@sanity/client';
import { CASE_STUDIES } from '../src/caseStudiesData.js';
import { BLOG_ARTICLES } from '../src/blogData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || 'ssxg7fat';
const DATASET = process.env.VITE_SANITY_DATASET || process.env.SANITY_DATASET || 'production';
const API_VERSION = '2024-01-01';
const TOKEN = process.env.SANITY_API_TOKEN;

console.log('========================================');
console.log('Sanity Content Migration & Export');
console.log(`Target: Project ID: ${PROJECT_ID} | Dataset: ${DATASET}`);
console.log('========================================\n');

// 1. Author Document
const authorDoc = {
  _id: 'author-varun-murugan',
  _type: 'author',
  name: 'Varun Murugan P',
  slug: { _type: 'slug', current: 'varun-murugan-p' },
  role: 'GTM Engineer & AI Revenue Automation Architect',
  bio: 'Aerospace science graduate (Gold Medallist, GPA 4.0) turned GTM Engineer. Architecting deterministic, self-healing revenue operating systems across 4 countries.',
  linkedIn: 'https://linkedin.com/in/varunmurugan',
  github: 'https://github.com/techievarunai-dev',
};

// 2. Reusable Tags Document Extraction
const uniqueTags = new Set();
Object.values(CASE_STUDIES).forEach(cs => (cs.tags || []).forEach(t => uniqueTags.add(t)));
BLOG_ARTICLES.forEach(art => (art.tags || []).forEach(t => uniqueTags.add(t)));

const tagDocs = Array.from(uniqueTags).map(t => {
  const slug = t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return {
    _id: `tag-${slug}`,
    _type: 'tag',
    title: t,
    slug: { _type: 'slug', current: slug },
    category: 'General',
  };
});

// 3. Case Studies Documents
const caseStudyDocs = Object.values(CASE_STUDIES).map(cs => {
  return {
    _id: `caseStudy-${cs.id}`,
    _type: 'caseStudy',
    title: cs.title,
    slug: { _type: 'slug', current: cs.id },
    index: cs.index || 1,
    projectType: cs.type || '',
    badge: cs.badge || 'PROTOTYPE',
    runtime: cs.runtime || '',
    projectContext: cs.projectContext || '',
    tagline: cs.tagline || '',
    client: cs.client || '',
    timeline: cs.timeline || '',
    primaryMetric: cs.primaryMetric || '',
    metricSubtitle: cs.metricSubtitle || '',
    tags: cs.tags || [],
    searchIntent: cs.searchIntent || '',
    targetAudience: cs.targetAudience || '',
    problem: cs.problem || null,
    solution: cs.solution || null,
    architecture: cs.architecture || null,
    telemetry: cs.telemetry || null,
    outcomes: cs.outcomes || [],
    evidenceGallery: (cs.evidenceGallery || []).map(ev => ({
      _key: ev.id || Math.random().toString(36).substring(2, 9),
      id: ev.id,
      label: ev.label,
      title: ev.title,
      tag: ev.tag,
      desc: ev.desc,
      alt: ev.alt || ev.title,
    })),
    faq: (cs.faq || []).map(f => ({
      _key: Math.random().toString(36).substring(2, 9),
      question: f.question,
      answer: f.answer,
    })),
    relatedProjects: (cs.relatedProjects || []).map(rel => ({
      _key: rel.id,
      id: rel.id,
      title: rel.title,
      note: rel.note,
    })),
    seo: {
      _type: 'object',
      metaTitle: `${cs.title} | Varun Murugan P - GTM Engineer`,
      metaDescription: cs.tagline,
      canonicalUrl: `https://gtmwithvarun.vercel.app/projects/${cs.id}/`,
      noIndex: false,
    },
  };
});

// 4. Blog Posts Documents
const blogPostDocs = BLOG_ARTICLES.map(art => {
  return {
    _id: `blogPost-${art.slug}`,
    _type: 'blogPost',
    title: art.title,
    slug: { _type: 'slug', current: art.slug },
    excerpt: art.excerpt,
    description: art.description || art.excerpt,
    category: art.category,
    featured: !!art.featured,
    publishedAt: art.publishedAt,
    updatedAt: art.updatedAt || art.publishedAt,
    readTime: art.readTime || '6 min read',
    tags: art.tags || [],
    author: { _type: 'reference', _ref: 'author-varun-murugan' },
    toc: (art.toc || []).map(t => ({
      _key: t.id,
      id: t.id,
      title: t.title,
    })),
    contentHtml: art.contentHtml,
    seo: {
      _type: 'object',
      metaTitle: `${art.title} | Varun Murugan P`,
      metaDescription: art.description || art.excerpt,
      canonicalUrl: `https://gtmwithvarun.vercel.app/blog/${art.slug}/`,
      noIndex: false,
    },
  };
});

// Combine all documents
const allDocuments = [authorDoc, ...tagDocs, ...caseStudyDocs, ...blogPostDocs];

// Export to NDJSON for Sanity Import CLI
const ndjsonPath = path.join(ROOT_DIR, 'sanity-export.ndjson');
const ndjsonContent = allDocuments.map(doc => JSON.stringify(doc)).join('\n');
fs.writeFileSync(ndjsonPath, ndjsonContent, 'utf-8');

console.log(`✓ Generated NDJSON export file: ${ndjsonPath}`);
console.log(`  - Authors: 1`);
console.log(`  - Tags: ${tagDocs.length}`);
console.log(`  - Case Studies: ${caseStudyDocs.length}`);
console.log(`  - Blog Articles: ${blogPostDocs.length}`);
console.log(`  - Total documents prepared: ${allDocuments.length}\n`);

// 5. Direct API sync if token is provided
if (TOKEN) {
  console.log('SANITY_API_TOKEN detected. Performing direct batch upsert into Sanity dataset...');
  const client = createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: API_VERSION,
    token: TOKEN,
    useCdn: false,
  });

  const tx = client.transaction();
  allDocuments.forEach(doc => tx.createOrReplace(doc));

  tx.commit()
    .then(res => {
      console.log(`✓ Successfully migrated ${allDocuments.length} documents directly to Sanity ${DATASET}! Transaction ID:`, res.transactionId);
    })
    .catch(err => {
      console.error('✗ Sanity migration error:', err.message);
      process.exit(1);
    });
} else {
  console.log('ℹ Notice: SANITY_API_TOKEN is not set in environment.');
  console.log('  To import this data to Sanity:');
  console.log('  Option A (Recommended): In studio folder run:');
  console.log('    cd studio && npx sanity dataset import ../sanity-export.ndjson production');
  console.log('  Option B: Export SANITY_API_TOKEN=your_token and re-run:');
  console.log('    node scripts/migrate-to-sanity.js\n');
}
