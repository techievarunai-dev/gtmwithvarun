import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'about/index.html'),
        projects: resolve(import.meta.dirname, 'projects/index.html'),
        caseStudy: resolve(import.meta.dirname, 'case-study.html'),
        projectInsurance: resolve(import.meta.dirname, 'projects/us-insurance-outbound-system/index.html'),
        projectIntelHub: resolve(import.meta.dirname, 'projects/gtm-intelligence-hub/index.html'),
        projectLeadOS: resolve(import.meta.dirname, 'projects/lead-response-os/index.html'),
        projectNewsletter: resolve(import.meta.dirname, 'projects/newsletter-automation/index.html'),
        projectAudit: resolve(import.meta.dirname, 'projects/outbound-gtm-audit/index.html'),
        projectScreening: resolve(import.meta.dirname, 'projects/candidate-screening/index.html'),
        marketResearch: resolve(import.meta.dirname, 'research/gtm-engineering-market-research-2026/index.html'),
        blog: resolve(import.meta.dirname, 'blog/index.html'),
        articleGtmEngineer: resolve(import.meta.dirname, 'blog/what-is-a-gtm-engineer/index.html'),
        articleLeadResponse: resolve(import.meta.dirname, 'blog/how-to-build-an-ai-powered-lead-response-system/index.html'),
        articleIntelHub: resolve(import.meta.dirname, 'blog/inside-an-ai-powered-gtm-intelligence-hub/index.html'),
        articleOutboundSystem: resolve(import.meta.dirname, 'blog/building-an-automated-outbound-system/index.html'),
        articleGtmVsRevops: resolve(import.meta.dirname, 'blog/gtm-engineering-vs-revops/index.html'),
        articleN8nWorkflows: resolve(import.meta.dirname, 'blog/building-gtm-automation-workflows-with-n8n/index.html'),
        faq: resolve(import.meta.dirname, 'faq/index.html')
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) {
            return 'vendor-three';
          }
          if (id.includes('node_modules/gsap')) {
            return 'vendor-gsap';
          }
        }
      }
    }
  }
});
