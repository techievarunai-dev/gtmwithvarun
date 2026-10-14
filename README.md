# Varun Murugan P — GTM Engineer Portfolio (`gtmwithvarun`)

Personal portfolio of **Varun Murugan P**, Senior GTM Engineer and AI Revenue Automation Architect.

Designed with an interactive spatial visual system, deterministic pipeline engineering philosophies, in-depth architectural teardowns, technical blog articles, and an interactive GTM ROI Impact Calculator.

---

## 🛠 Tech Stack

- **Core**: Vanilla JavaScript (ES Modules), Semantic HTML5
- **Styling**: Vanilla CSS Design System with CSS Custom Properties & Glassmorphic tokens
- **Animations & Graphics**: [GSAP](https://greensock.com/) (ScrollTrigger, Flip), [Three.js](https://threejs.org/) (Interactive 3D particle core)
- **Tooling & Bundler**: [Vite](https://vitejs.dev/)
- **SEO & Discovery**: Automated XML Sitemap generator, Robots.txt, JSON-LD Schema (TechArticle, ProfilePage, ItemList), Open Graph, and machine-readable `llms.txt`

---

## 📂 Project Structure

```
├── blog/                               # Technical blog articles & guide directory
│   ├── building-an-automated-outbound-system/
│   ├── building-gtm-automation-workflows-with-n8n/
│   ├── gtm-engineering-vs-revops/
│   ├── how-to-build-an-ai-powered-lead-response-system/
│   ├── inside-an-ai-powered-gtm-intelligence-hub/
│   ├── what-is-a-gtm-engineer/
│   └── index.html                      # Blog hub & tag-filtered catalog
├── projects/                           # Dedicated static project case study pages
│   ├── candidate-screening/
│   ├── gtm-intelligence-hub/
│   ├── lead-response-os/
│   ├── newsletter-automation/
│   ├── outbound-gtm-audit/
│   └── us-insurance-outbound-system/
├── public/                             # Static public assets
│   ├── assets/                         # Architecture diagrams & portrait photos
│   ├── audit.html                      # Outbound audit teardown fallback redirect
│   ├── favicon.svg                     # High-res SVG favicon
│   ├── llms.txt & llms-full.txt        # LLM context and answer engine index
│   ├── robots.txt                      # Crawler & AI bot permissions
│   ├── site.webmanifest                # Web application manifest
│   ├── sitemap.xml                     # Auto-generated XML sitemap
│   └── Varun_Murugan_GTM_Engineer_Resume.pdf # Downloadable resume asset
├── scripts/
│   ├── generate-seo.js                 # Automated sitemap, robots, & llms generator
│   └── update-domain.js                # One-command production domain migration utility
├── src/                                # Core application source code
│   ├── blogData.js                     # Single source of truth for blog metadata
│   ├── caseStudiesData.js              # Project blueprints & telemetry data
│   ├── caseStudy.js                    # Dynamic case study viewer manager
│   ├── gtmCalculator.js                # Interactive GTM ROI calculator engine
│   ├── main.js                         # Application bootstrap
│   ├── navController.js                # Floating pill navigation & drawer logic
│   ├── simulator.js                    # Live execution telemetry terminal
│   ├── siteConfig.js                   # Central domain and author configuration
│   ├── stageController.js              # GSAP scene transitions & ScrollSpy
│   └── style.css                       # Complete design system & responsive styling
├── index.html                          # Portfolio homepage
├── package.json                        # NPM package configuration
└── vite.config.js                      # Multi-page build configuration
```

---

## 🚀 Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### 2. Installation

```bash
npm install
```

### 3. Local Development

```bash
npm run dev
```

Starts the local Vite development server at `http://localhost:5173/`.

### 4. Production Build

```bash
npm run build
```

This automatically:
1. Validates all routes and image assets against local files on disk.
2. Extracts published content from `src/blogData.js` and `src/caseStudiesData.js`.
3. Regenerates `public/sitemap.xml`, `public/robots.txt`, and `public/llms.txt`.
4. Compiles and optimizes assets into the `dist/` directory.

### 5. Preview Production Bundle

```bash
npm run preview
```

---

## 🌐 Production Domain Migration

The production site domain is centrally managed in `src/siteConfig.js`. When ready to deploy to your final domain (`altivionai.com` or `gtmwithvarun.vercel.app`):

```bash
# Preview what files will change without modifying them:
npm run set-domain -- https://your-domain.com --dry-run

# Apply changes across all canonical tags, metadata, structured data, and regenerate SEO:
npm run set-domain -- https://your-domain.com
```

---

## 📄 License

All rights reserved © Varun Murugan P.
