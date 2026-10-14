import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import { CASE_STUDIES } from '../caseStudiesData.js';
import { BLOG_ARTICLES } from '../blogData.js';

export const SANITY_CONFIG = {
  projectId: (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SANITY_PROJECT_ID) || 'ssxg7fat',
  dataset: (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SANITY_DATASET) || 'production',
  apiVersion: (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SANITY_API_VERSION) || '2024-01-01',
  useCdn: true, // Use CDN for fast, edge-cached read queries; ignores drafts automatically
};

export const sanityClient = createClient({
  projectId: SANITY_CONFIG.projectId,
  dataset: SANITY_CONFIG.dataset,
  apiVersion: SANITY_CONFIG.apiVersion,
  useCdn: SANITY_CONFIG.useCdn,
});

const imageBuilder = createImageUrlBuilder(sanityClient);

/**
 * Builds optimized image URL for a Sanity image asset reference,
 * or safely falls back to local asset paths (e.g., /assets/...).
 */
export function urlFor(source) {
  if (!source) return '';
  if (typeof source === 'string') return source;
  if (source.asset && source.asset._ref) {
    return imageBuilder.image(source).auto('format').fit('max').url();
  }
  return '';
}

/**
 * Fetches all published case studies from Sanity with automatic fallback to static dataset.
 */
export async function fetchPublishedCaseStudies() {
  try {
    const query = `*[_type == "caseStudy" && !(_id in path("drafts.**"))] | order(index asc)`;
    const sanityData = await sanityClient.fetch(query);
    if (Array.isArray(sanityData) && sanityData.length > 0) {
      return sanityData;
    }
  } catch (err) {
    console.warn('[Sanity CMS] Falling back to static case studies data:', err.message);
  }
  return Object.values(CASE_STUDIES);
}

/**
 * Fetches a single case study by slug from Sanity with automatic fallback to static dataset.
 */
export async function fetchCaseStudyBySlug(slug) {
  if (!slug) return null;
  try {
    const query = `*[_type == "caseStudy" && (slug.current == $slug || id == $slug) && !(_id in path("drafts.**"))][0]`;
    const doc = await sanityClient.fetch(query, { slug });
    if (doc) return doc;
  } catch (err) {
    console.warn(`[Sanity CMS] Falling back to static data for case study "${slug}":`, err.message);
  }
  return CASE_STUDIES[slug] || null;
}

/**
 * Fetches all published blog articles from Sanity with automatic fallback to static dataset.
 */
export async function fetchPublishedBlogArticles() {
  try {
    const query = `*[_type == "blogPost" && !(_id in path("drafts.**"))] | order(publishedAt desc)`;
    const sanityData = await sanityClient.fetch(query);
    if (Array.isArray(sanityData) && sanityData.length > 0) {
      return sanityData;
    }
  } catch (err) {
    console.warn('[Sanity CMS] Falling back to static blog articles data:', err.message);
  }
  return BLOG_ARTICLES;
}

/**
 * Fetches a single blog article by slug from Sanity with automatic fallback to static dataset.
 */
export async function fetchBlogArticleBySlug(slug) {
  if (!slug) return null;
  try {
    const query = `*[_type == "blogPost" && slug.current == $slug && !(_id in path("drafts.**"))][0]`;
    const doc = await sanityClient.fetch(query, { slug });
    if (doc) return doc;
  } catch (err) {
    console.warn(`[Sanity CMS] Falling back to static data for blog article "${slug}":`, err.message);
  }
  return BLOG_ARTICLES.find(a => a.slug === slug || a.id === slug) || null;
}
