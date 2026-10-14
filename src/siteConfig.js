/**
 * Single Source of Truth for Portfolio Domain & SEO Configuration
 *
 * To switch the production domain:
 * Option A: Set environment variable VITE_SITE_URL (e.g., in Vercel: VITE_SITE_URL=https://altivionai.com)
 * Option B: Run: npm run set-domain -- https://altivionai.com
 * Option C: Change the default `siteUrl` below.
 */

export const SITE_CONFIG = {
  // Current active production domain (without trailing slash)
  siteUrl: (typeof process !== 'undefined' && (process.env.VITE_SITE_URL || process.env.SITE_URL))
    ? (process.env.VITE_SITE_URL || process.env.SITE_URL).replace(/\/$/, '')
    : 'https://varunmurugan-gtm.vercel.app',

  // Candidate production domains
  candidateDomains: {
    gtmwithvarun: 'https://gtmwithvarun.vercel.app',
    altivionai: 'https://altivionai.com',
    currentFallback: 'https://varunmurugan-gtm.vercel.app'
  },

  siteName: 'Varun Murugan P — GTM Engineer Portfolio',
  author: {
    name: 'Varun Murugan P',
    role: 'GTM Engineer & AI Revenue Automation Architect',
    email: 'workwithvarunmurugan@gmail.com',
    github: 'https://github.com/varunmurugan-gtm',
    linkedin: 'https://linkedin.com/in/varunmurugan'
  },

  defaultOgImage: '/assets/varun-portrait.jpg',
  resumePath: '/Varun_Murugan_GTM_Engineer_Resume.pdf'
};

export default SITE_CONFIG;
