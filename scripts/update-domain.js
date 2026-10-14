import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { SITE_CONFIG } from '../src/siteConfig.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const domainArg = args.find(a => !a.startsWith('--'));

if (!domainArg) {
  console.log(`
Usage:
  node scripts/update-domain.js <new-domain-url> [--dry-run]
  npm run set-domain -- <new-domain-url>

Examples:
  npm run set-domain -- https://gtmwithvarun.vercel.app
  npm run set-domain -- https://altivionai.com
  npm run set-domain -- https://altivionai.com --dry-run
`);
  process.exit(1);
}

// Normalize domain
let newDomain = domainArg.trim().replace(/\/$/, '');
if (!newDomain.startsWith('http://') && !newDomain.startsWith('https://')) {
  newDomain = `https://${newDomain}`;
}

const currentDomain = SITE_CONFIG.siteUrl;

console.log(`\n======================================================`);
console.log(`Domain Migration Tool ${isDryRun ? '(DRY RUN)' : ''}`);
console.log(`Current Domain: ${currentDomain}`);
console.log(`Target Domain:  ${newDomain}`);
console.log(`======================================================\n`);

if (currentDomain === newDomain) {
  console.log(`Current domain and target domain are identical. No changes required.`);
  process.exit(0);
}

// 1. Files to update
const htmlFiles = [
  'index.html',
  'case-study.html',
  'blog/index.html',
  'blog/what-is-a-gtm-engineer/index.html',
  'blog/how-to-build-an-ai-powered-lead-response-system/index.html',
  'blog/inside-an-ai-powered-gtm-intelligence-hub/index.html',
  'blog/building-an-automated-outbound-system/index.html',
  'blog/gtm-engineering-vs-revops/index.html',
  'blog/building-gtm-automation-workflows-with-n8n/index.html',
  'projects/us-insurance-outbound-system/index.html',
  'projects/gtm-intelligence-hub/index.html',
  'projects/lead-response-os/index.html',
  'projects/newsletter-automation/index.html',
  'projects/outbound-gtm-audit/index.html',
  'projects/candidate-screening/index.html'
];

let totalReplacements = 0;
const updatedFiles = [];

// 2. Update HTML Files
htmlFiles.forEach(relPath => {
  const absPath = path.join(rootDir, relPath);
  if (!fs.existsSync(absPath)) {
    console.warn(`[SKIP] Missing file: ${relPath}`);
    return;
  }
  let content = fs.readFileSync(absPath, 'utf8');
  const count = (content.match(new RegExp(currentDomain, 'g')) || []).length;
  if (count > 0) {
    totalReplacements += count;
    updatedFiles.push({ file: relPath, count });
    if (!isDryRun) {
      content = content.replaceAll(currentDomain, newDomain);
      fs.writeFileSync(absPath, content, 'utf8');
    }
  }
});

// 3. Update src/siteConfig.js
const siteConfigPath = path.join(rootDir, 'src', 'siteConfig.js');
if (fs.existsSync(siteConfigPath)) {
  let content = fs.readFileSync(siteConfigPath, 'utf8');
  if (!isDryRun) {
    content = content.replace(
      new RegExp(`siteUrl:.*`),
      `siteUrl: (typeof process !== 'undefined' && (process.env.VITE_SITE_URL || process.env.SITE_URL))\n    ? (process.env.VITE_SITE_URL || process.env.SITE_URL).replace(/\\/$/, '')\n    : '${newDomain}',`
    );
    fs.writeFileSync(siteConfigPath, content, 'utf8');
    updatedFiles.push({ file: 'src/siteConfig.js', count: 1 });
  }
}

console.log(`Summary of replacements:`);
updatedFiles.forEach(({ file, count }) => {
  console.log(`  - ${file}: ${count} replacements`);
});
console.log(`Total domain references updated: ${totalReplacements}`);

// 4. Regenerate sitemap, robots, llms
if (!isDryRun) {
  console.log(`\nRegenerating sitemap.xml, robots.txt, and llms.txt...`);
  try {
    execSync(`node "${path.join(__dirname, 'generate-seo.js')}" "${newDomain}"`, { stdio: 'inherit' });
  } catch (err) {
    console.error(`[ERROR] Failed to regenerate SEO files:`, err.message);
  }

  console.log(`\nRunning Vite production build to test bundle...`);
  try {
    execSync(`npm run build`, { stdio: 'inherit', cwd: rootDir });
    console.log(`\n✓ Build succeeded with target domain: ${newDomain}`);
  } catch (err) {
    console.error(`[ERROR] Build failed:`, err.message);
  }
}

console.log(`\n======================================================`);
console.log(`✓ Domain Migration Completed: ${newDomain}`);
console.log(`======================================================\n`);
