import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
console.log('=== RUNNING COMPREHENSIVE SEO & AEO AUDIT ON DIST ===\n');

let errors = 0;
let warnings = 0;

// 1. Check for old domain leak
console.log('[Test 1] Scanning for obsolete domain leaks...');
const allFiles = [];
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (!full.includes('node_modules') && !full.includes('.git')) walk(full);
    } else {
      allFiles.push(full);
    }
  }
}
walk(distDir);

let oldDomainFound = false;
for (const f of allFiles) {
  if (f.endsWith('.html') || f.endsWith('.xml') || f.endsWith('.txt') || f.endsWith('.json')) {
    const text = fs.readFileSync(f, 'utf8');
    if (text.includes('varunmurugan-gtm.vercel.app')) {
      console.error(`  [FAIL] Old domain found in: ${f}`);
      errors++;
      oldDomainFound = true;
    }
  }
}
if (!oldDomainFound) {
  console.log('  ✓ Zero occurrences of old domain (varunmurugan-gtm.vercel.app) in dist.');
}

// 2. Validate JSON-LD and H1 on all HTML files in dist
console.log('\n[Test 2] Validating H1 hierarchy and JSON-LD schema...');
const htmlFiles = allFiles.filter(f => f.endsWith('.html'));

for (const file of htmlFiles) {
  const rel = path.relative(distDir, file);
  const html = fs.readFileSync(file, 'utf8');

  // Check H1
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  if (h1Matches.length === 0) {
    console.error(`  [FAIL] Missing <h1> in ${rel}`);
    errors++;
  } else if (h1Matches.length > 1) {
    console.error(`  [FAIL] Multiple <h1> (${h1Matches.length}) in ${rel}`);
    errors++;
  } else {
    // console.log(`  ✓ 1 H1 found in ${rel}`);
  }

  // Check canonical link
  const canonMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ||
                     html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  if (!canonMatch) {
    console.warn(`  [WARN] Missing canonical tag in ${rel}`);
    warnings++;
  } else {
    const canonUrl = canonMatch[1];
    if (!canonUrl.startsWith('https://gtmwithvarun.vercel.app')) {
      console.error(`  [FAIL] Invalid canonical domain in ${rel}: ${canonUrl}`);
      errors++;
    }
  }

  // Check JSON-LD
  const jsonLdMatches = html.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi) || [];
  if (jsonLdMatches.length > 0) {
    for (const tag of jsonLdMatches) {
      const rawJson = tag.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '').trim();
      try {
        const parsed = JSON.parse(rawJson);
        if (rel.startsWith('projects/') && rel !== 'projects/index.html') {
          const graph = parsed['@graph'] || [parsed];
          const hasArticle = graph.some(e => e['@type'] === 'TechArticle');
          const hasBreadcrumb = graph.some(e => e['@type'] === 'BreadcrumbList');
          const hasFAQ = graph.some(e => e['@type'] === 'FAQPage');
          if (!hasArticle) console.error(`  [FAIL] Missing TechArticle in ${rel}`);
          if (!hasBreadcrumb) console.error(`  [FAIL] Missing BreadcrumbList in ${rel}`);
          if (!hasFAQ) console.error(`  [FAIL] Missing FAQPage in ${rel}`);
          if (!hasArticle || !hasBreadcrumb || !hasFAQ) errors++;
        }
      } catch (err) {
        console.error(`  [FAIL] Invalid JSON-LD syntax in ${rel}:`, err.message);
        errors++;
      }
    }
  }
}
console.log(`  ✓ Validated ${htmlFiles.length} HTML pages.`);

// 3. Check projects and dedicated pages in dist
console.log('\n[Test 3] Verifying Core Architecture Pages in dist...');
const corePages = [
  { path: 'about/index.html', label: '/about/' },
  { path: 'projects/index.html', label: '/projects/' },
  { path: 'research/gtm-engineering-market-research-2026/index.html', label: '/research/gtm-engineering-market-research-2026/' },
  { path: 'blog/index.html', label: '/blog/' }
];
for (const cp of corePages) {
  const p = path.join(distDir, cp.path);
  if (!fs.existsSync(p)) {
    console.error(`  [FAIL] Missing core architecture page: ${cp.label} at ${p}`);
    errors++;
  } else {
    console.log(`  ✓ Verified core page: ${cp.label}`);
  }
}

console.log('\n[Test 3b] Verifying 6 Case Study Directories in dist...');
const caseStudySlugs = [
  'us-insurance-outbound-system',
  'gtm-intelligence-hub',
  'lead-response-os',
  'newsletter-automation',
  'outbound-gtm-audit',
  'candidate-screening'
];

for (const slug of caseStudySlugs) {
  const p = path.join(distDir, 'projects', slug, 'index.html');
  if (!fs.existsSync(p)) {
    console.error(`  [FAIL] Missing case study file: ${p}`);
    errors++;
  } else {
    const text = fs.readFileSync(p, 'utf8');
    // Check if undefined is present in rendered text
    if (text.includes('>undefined<')) {
      console.error(`  [FAIL] Found >undefined< in ${slug}`);
      errors++;
    }
    // Check if FAQ section is present
    if (!text.includes('cs-faq-section')) {
      console.error(`  [FAIL] Missing cs-faq-section in ${slug}`);
      errors++;
    }
    // Check if Context callout is present
    if (!text.includes('cs-context-callout')) {
      console.error(`  [FAIL] Missing cs-context-callout in ${slug}`);
      errors++;
    }
    // Check if Limitations section is present
    if (!text.includes('cs-limitations-section')) {
      console.error(`  [FAIL] Missing cs-limitations-section in ${slug}`);
      errors++;
    }
    console.log(`  ✓ Case study verified: /projects/${slug}/`);
  }
}

// 4. Validate sitemap.xml
console.log('\n[Test 4] Validating dist/sitemap.xml...');
const sitemapPath = path.join(distDir, 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.error('  [FAIL] Missing dist/sitemap.xml');
  errors++;
} else {
  const sm = fs.readFileSync(sitemapPath, 'utf8');
  for (const slug of caseStudySlugs) {
    if (!sm.includes(`https://gtmwithvarun.vercel.app/projects/${slug}/`)) {
      console.error(`  [FAIL] Sitemap missing /projects/${slug}/`);
      errors++;
    }
  }
  if (!sm.includes(`https://gtmwithvarun.vercel.app/about/`)) {
    console.error(`  [FAIL] Sitemap missing /about/`);
    errors++;
  }
  if (!sm.includes(`https://gtmwithvarun.vercel.app/projects/`)) {
    console.error(`  [FAIL] Sitemap missing /projects/`);
    errors++;
  }
  if (!sm.includes(`https://gtmwithvarun.vercel.app/research/gtm-engineering-market-research-2026/`)) {
    console.error(`  [FAIL] Sitemap missing /research/gtm-engineering-market-research-2026/`);
    errors++;
  }
  console.log('  ✓ All routes verified in sitemap.xml');
}

// 5. Validate robots.txt
console.log('\n[Test 5] Validating dist/robots.txt...');
const robotsPath = path.join(distDir, 'robots.txt');
if (!fs.existsSync(robotsPath)) {
  console.error('  [FAIL] Missing dist/robots.txt');
  errors++;
} else {
  const rb = fs.readFileSync(robotsPath, 'utf8');
  if (!rb.includes('Sitemap: https://gtmwithvarun.vercel.app/sitemap.xml')) {
    console.error('  [FAIL] robots.txt missing correct sitemap directive');
    errors++;
  }
  if (!rb.includes('User-agent: OAI-SearchBot')) {
    console.error('  [FAIL] robots.txt missing OAI-SearchBot directive');
    errors++;
  }
  console.log('  ✓ robots.txt points to correct canonical sitemap and permits OAI-SearchBot');
}

console.log(`\n========================================`);
console.log(`AUDIT COMPLETE: ${errors} errors, ${warnings} warnings`);
console.log(`========================================\n`);

process.exit(errors > 0 ? 1 : 0);
