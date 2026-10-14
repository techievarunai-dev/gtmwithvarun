import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SITE_CONFIG } from '../src/siteConfig.js';
import { BLOG_ARTICLES } from '../src/blogData.js';
import { CASE_STUDIES } from '../src/caseStudiesData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Allow CLI argument or environment variable override
const targetDomain = (process.argv[2] || process.env.VITE_SITE_URL || process.env.SITE_URL || SITE_CONFIG.siteUrl).replace(/\/$/, '');

console.log(`\n========================================`);
console.log(`SEO Generator: Building for ${targetDomain}`);
console.log(`========================================\n`);

// 1. Define all routes with metadata
const routes = [
  {
    path: '/',
    sourceFile: 'index.html',
    lastmod: '2026-10-14',
    changefreq: 'weekly',
    priority: '1.0',
    image: {
      loc: '/assets/varun-portrait.jpg',
      title: 'Varun Murugan P - GTM Engineer',
      caption: 'Varun Murugan P, Senior GTM Engineer and AI Revenue Automation Architect'
    }
  },
  {
    path: '/case-study.html',
    sourceFile: 'case-study.html',
    lastmod: '2026-10-14',
    changefreq: 'weekly',
    priority: '0.9'
  },
  // Projects / Case Studies
  {
    path: '/projects/us-insurance-outbound-system/',
    sourceFile: 'projects/us-insurance-outbound-system/index.html',
    lastmod: '2026-10-14',
    changefreq: 'monthly',
    priority: '0.85',
    image: {
      loc: '/assets/case-studies/us-insurance-outbound-system/hero-workflow-1.png',
      title: 'US Insurance Outbound System Architecture',
      caption: 'Deterministic 4-Workflow n8n outbound architecture with AI reply triage'
    }
  },
  {
    path: '/projects/gtm-intelligence-hub/',
    sourceFile: 'projects/gtm-intelligence-hub/index.html',
    lastmod: '2026-10-14',
    changefreq: 'monthly',
    priority: '0.85',
    image: {
      loc: '/assets/case-studies/gtm-intelligence-hub/hero-dashboard.png',
      title: 'AI-Powered GTM Intelligence Hub Architecture',
      caption: 'Real-time buying signal enrichment and high-intent outbound scoring'
    }
  },
  {
    path: '/projects/lead-response-os/',
    sourceFile: 'projects/lead-response-os/index.html',
    lastmod: '2026-10-14',
    changefreq: 'monthly',
    priority: '0.85',
    image: {
      loc: '/assets/case-studies/lead-response-os/hero-workflow.png',
      title: 'Autonomous Lead Response OS Architecture',
      caption: 'Sub-2-minute inbound lead qualification and routing engine'
    }
  },
  {
    path: '/projects/newsletter-automation/',
    sourceFile: 'projects/newsletter-automation/index.html',
    lastmod: '2026-10-14',
    changefreq: 'monthly',
    priority: '0.85',
    image: {
      loc: '/assets/case-studies/newsletter-automation/hero-workflow.png',
      title: 'AI Newsletter Operations System Architecture',
      caption: 'Automated multi-channel newsletter curation, drafting, and distribution'
    }
  },
  {
    path: '/projects/outbound-gtm-audit/',
    sourceFile: 'projects/outbound-gtm-audit/index.html',
    lastmod: '2026-10-14',
    changefreq: 'monthly',
    priority: '0.85',
    image: {
      loc: '/assets/case-studies/outbound-gtm-audit/hero-framework.jpg',
      title: 'Outbound GTM Systems Audit Architecture',
      caption: 'Diagnostic audit framework for deliverability, CRM hygiene, and pipeline leakage'
    }
  },
  {
    path: '/projects/candidate-screening/',
    sourceFile: 'projects/candidate-screening/index.html',
    lastmod: '2026-10-14',
    changefreq: 'monthly',
    priority: '0.85',
    image: {
      loc: '/assets/case-studies/candidate-screening/hero-pipeline.png',
      title: 'AI Candidate Screening System Architecture',
      caption: 'Automated resume extraction and objective rubric scoring pipeline'
    }
  },
  // Blog Index
  {
    path: '/blog/',
    sourceFile: 'blog/index.html',
    lastmod: '2026-10-14',
    changefreq: 'weekly',
    priority: '0.9'
  }
];

// Add published blog articles dynamically from blogData.js
const publishedArticles = BLOG_ARTICLES.filter(a => a.status === 'published');
publishedArticles.forEach(article => {
  routes.push({
    path: `/blog/${article.slug}/`,
    sourceFile: `blog/${article.slug}/index.html`,
    lastmod: article.updatedAt || article.publishedAt || '2026-10-14',
    changefreq: 'monthly',
    priority: article.featured ? '0.85' : '0.80',
    image: article.coverImage ? {
      loc: article.coverImage,
      title: article.title,
      caption: article.coverAlt || article.excerpt
    } : undefined
  });
});

// 2. Validate all routes against local filesystem
console.log(`[1/4] Validating routes and assets on disk...`);
routes.forEach(route => {
  const filePath = path.join(rootDir, route.sourceFile);
  if (!fs.existsSync(filePath)) {
    console.error(`[ERROR] Missing source file for route ${route.path}: ${filePath}`);
    process.exit(1);
  }
  if (route.image) {
    const imgPath = path.join(rootDir, 'public', route.image.loc.replace(/^\//, ''));
    if (!fs.existsSync(imgPath)) {
      console.warn(`[WARNING] Missing image for route ${route.path}: ${imgPath}`);
    }
  }
});
console.log(`✓ All ${routes.length} published routes verified on disk.`);

// 3. Generate sitemap.xml
console.log(`[2/4] Generating public/sitemap.xml...`);
let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

routes.forEach(route => {
  xml += `  <url>\n`;
  xml += `    <loc>${targetDomain}${route.path}</loc>\n`;
  xml += `    <lastmod>${route.lastmod}</lastmod>\n`;
  xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
  xml += `    <priority>${route.priority}</priority>\n`;
  if (route.image) {
    xml += `    <image:image>\n`;
    xml += `      <image:loc>${targetDomain}${route.image.loc}</image:loc>\n`;
    xml += `      <image:title>${route.image.title}</image:title>\n`;
    xml += `      <image:caption>${route.image.caption}</image:caption>\n`;
    xml += `    </image:image>\n`;
  }
  xml += `  </url>\n`;
});

xml += `</urlset>\n`;

const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
fs.writeFileSync(sitemapPath, xml, 'utf8');
console.log(`✓ Saved ${sitemapPath}`);

// 4. Generate robots.txt
console.log(`[3/4] Generating public/robots.txt...`);
const robotsTxt = `# Robots.txt for Varun Murugan P - GTM Engineer Portfolio
# Optimized for Web Crawlers & AI Answer Engines (AEO/GEO)

User-agent: *
Allow: /

# Explicit permission and greeting for Generative AI & Search Engine Bots
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: Bingbot
Allow: /

# Sitemap & Machine-Readable Knowledge Base Index
Sitemap: ${targetDomain}/sitemap.xml
llms-txt: ${targetDomain}/llms.txt
llms-full-txt: ${targetDomain}/llms-full.txt
`;

const robotsPath = path.join(rootDir, 'public', 'robots.txt');
fs.writeFileSync(robotsPath, robotsTxt, 'utf8');
console.log(`✓ Saved ${robotsPath}`);

// 5. Update llms.txt & llms-full.txt domain references
console.log(`[4/4] Synchronizing public/llms.txt & public/llms-full.txt...`);
const llmsPath = path.join(rootDir, 'public', 'llms.txt');
if (fs.existsSync(llmsPath)) {
  let llmsContent = fs.readFileSync(llmsPath, 'utf8');
  llmsContent = llmsContent.replace(/https?:\/\/[a-zA-Z0-9.-]+\.vercel\.app/g, targetDomain);
  llmsContent = llmsContent.replace(/https?:\/\/altivionai\.com/g, targetDomain);
  fs.writeFileSync(llmsPath, llmsContent, 'utf8');
  console.log(`✓ Synchronized ${llmsPath}`);
}

const llmsFullPath = path.join(rootDir, 'public', 'llms-full.txt');
if (fs.existsSync(llmsFullPath)) {
  let fullContent = fs.readFileSync(llmsFullPath, 'utf8');
  fullContent = fullContent.replace(/https?:\/\/[a-zA-Z0-9.-]+\.vercel\.app/g, targetDomain);
  fullContent = fullContent.replace(/https?:\/\/altivionai\.com/g, targetDomain);
  fs.writeFileSync(llmsFullPath, fullContent, 'utf8');
  console.log(`✓ Synchronized ${llmsFullPath}`);
}

console.log(`\n========================================`);
console.log(`✓ SEO Generation Complete for: ${targetDomain}`);
console.log(`========================================\n`);
