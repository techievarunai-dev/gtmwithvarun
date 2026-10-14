import { CASE_STUDIES } from './caseStudiesData.js';
import { SITE_CONFIG } from './siteConfig.js';

export class CaseStudyPageManager {
  constructor() {
    this.currentId = this.getIdFromUrl() || 'us-insurance-outbound-system';
    this.init();
  }

  getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || params.get('project');
    if (id && CASE_STUDIES[id]) {
      return id;
    }
    // Also support hash or fallback
    const hash = window.location.hash.replace('#', '');
    if (hash && CASE_STUDIES[hash]) {
      return hash;
    }
    return 'us-insurance-outbound-system';
  }

  init() {
    this.render(this.currentId);
    this.setupListeners();
  }

  render(id) {
    const data = CASE_STUDIES[id] || CASE_STUDIES['us-insurance-outbound-system'];
    this.currentId = data.id;

    // Update document title & metadata for SEO/AEO
    document.title = `${data.title} — GTM Engineering Case Study | Varun Murugan P`;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', `${data.tagline} Engineered by Varun Murugan P, Senior GTM Engineer.`);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', `${data.title} — GTM Engineering Case Study`);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', data.tagline);

    const siteUrl = (typeof window !== 'undefined' && window.location.origin) ? window.location.origin : SITE_CONFIG.siteUrl;
    const ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg) ogImg.setAttribute('content', `${siteUrl}${data.image}`);

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) canonicalLink.setAttribute('href', `${SITE_CONFIG.siteUrl}/case-study.html?id=${data.id}`);

    // 1. Meta Badges & Header
    this.setText('cs-index-badge', `CASE 0${data.index} / 06`);
    this.setText('cs-type-pill', data.type);
    this.setText('cs-runtime-pill', data.runtime);
    this.setText('cs-title', data.title);
    this.setText('cs-tagline', data.tagline);
    this.setText('cs-client-val', data.client);
    this.setText('cs-timeline-val', data.timeline);
    this.setText('cs-metric-num', data.primaryMetric);
    this.setText('cs-metric-sub', data.metricSubtitle);

    // 2. Tech Stack Tags
    const tagsContainer = document.getElementById('cs-tags-container');
    if (tagsContainer) {
      tagsContainer.innerHTML = data.tags.map(t => `<span class="cs-tag-pill">${t}</span>`).join('');
    }

    // 3. Architecture Diagram Image
    const imgEl = document.getElementById('cs-diagram-img');
    const lightboxImg = document.getElementById('lightbox-img');
    const captionEl = document.getElementById('cs-diagram-caption');
    if (imgEl) {
      imgEl.src = data.image;
      imgEl.alt = data.imageAlt;
    }
    if (lightboxImg) {
      lightboxImg.src = data.image;
      lightboxImg.alt = data.imageAlt;
    }
    if (captionEl) {
      captionEl.textContent = `FIGURE 1.0 — ${data.title.toUpperCase()} SYSTEM ARCHITECTURE BLUEPRINT`;
    }

    // 4. Problem Section
    this.setText('cs-problem-headline', data.problem.headline);
    this.setText('cs-problem-lead', data.problem.lead);
    const probPoints = document.getElementById('cs-problem-points');
    if (probPoints) {
      probPoints.innerHTML = data.problem.points
        .map(pt => `<li class="cs-bullet-item"><span class="cs-bullet-dot">⚠</span><span>${pt}</span></li>`)
        .join('');
    }

    // 5. Solution Workflows
    this.setText('cs-solution-headline', data.solution.headline);
    this.setText('cs-solution-lead', data.solution.lead);
    const workflowsContainer = document.getElementById('cs-workflows-container');
    if (workflowsContainer) {
      workflowsContainer.innerHTML = data.solution.workflows
        .map((wf, idx) => `
          <div class="cs-workflow-card">
            <div class="cs-wf-header">
              <span class="cs-wf-step">STAGE 0${idx + 1}</span>
              <h4 class="cs-wf-name">${wf.name}</h4>
            </div>
            <p class="cs-wf-desc">${wf.desc}</p>
          </div>
        `).join('');
    }

    // 6. Detailed Tech Stack Grid
    const stackContainer = document.getElementById('cs-tech-stack-grid');
    if (stackContainer) {
      stackContainer.innerHTML = data.techStack
        .map(item => `
          <div class="cs-stack-item">
            <span class="cs-stack-name">${item.name}</span>
            <span class="cs-stack-role">${item.role}</span>
          </div>
        `).join('');
    }

    // 7. Verified Outcomes Grid
    const outcomesContainer = document.getElementById('cs-outcomes-grid');
    if (outcomesContainer) {
      outcomesContainer.innerHTML = data.outcomes
        .map(oc => `
          <div class="cs-outcome-card">
            <span class="cs-outcome-num">${oc.num}</span>
            <span class="cs-outcome-lbl">${oc.label}</span>
          </div>
        `).join('');
    }

    // 8. Testimonial Card (if present)
    const testimonialBox = document.getElementById('cs-testimonial-box');
    if (testimonialBox) {
      if (data.testimonial) {
        testimonialBox.style.display = 'block';
        this.setText('cs-testimonial-quote', `"${data.testimonial.quote}"`);
        this.setText('cs-testimonial-author', data.testimonial.author);
        this.setText('cs-testimonial-role', data.testimonial.title);
      } else {
        testimonialBox.style.display = 'none';
      }
    }

    // 9. Previous & Next Project Navigation
    const prevData = CASE_STUDIES[data.prevId];
    const nextData = CASE_STUDIES[data.nextId];

    const prevBtn = document.getElementById('cs-prev-link');
    const nextBtn = document.getElementById('cs-next-link');

    if (prevBtn && prevData) {
      prevBtn.href = `/case-study.html?id=${prevData.id}`;
      prevBtn.setAttribute('data-target-id', prevData.id);
      const prevTitle = prevBtn.querySelector('.nav-dest-title');
      if (prevTitle) prevTitle.textContent = prevData.title;
    }

    if (nextBtn && nextData) {
      nextBtn.href = `/case-study.html?id=${nextData.id}`;
      nextBtn.setAttribute('data-target-id', nextData.id);
      const nextTitle = nextBtn.querySelector('.nav-dest-title');
      if (nextTitle) nextTitle.textContent = nextData.title;
    }

    // 10. Update Active State in Top Quick Switcher
    const pills = document.querySelectorAll('.cs-nav-pill');
    pills.forEach(pill => {
      const pid = pill.getAttribute('data-case-id');
      pill.classList.toggle('active', pid === id);
    });

    // Scroll to top smoothly if switching
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  setupListeners() {
    // 1. Quick Switcher Pills
    const pills = document.querySelectorAll('.cs-nav-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = pill.getAttribute('data-case-id');
        if (targetId && targetId !== this.currentId) {
          const newUrl = `${window.location.pathname}?id=${targetId}`;
          window.history.pushState({ id: targetId }, '', newUrl);
          this.render(targetId);
        }
      });
    });

    // 2. Next & Prev Navigation
    const navLinks = [document.getElementById('cs-prev-link'), document.getElementById('cs-next-link')];
    navLinks.forEach(link => {
      if (link) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('data-target-id');
          if (targetId) {
            const newUrl = `${window.location.pathname}?id=${targetId}`;
            window.history.pushState({ id: targetId }, '', newUrl);
            this.render(targetId);
          }
        });
      }
    });

    // 3. Browser Back/Forward navigation
    window.addEventListener('popstate', (e) => {
      const id = this.getIdFromUrl();
      this.render(id);
    });

    // 4. Lightbox Zoom for Diagram
    const triggerZoom = document.getElementById('btn-zoom-diagram');
    const lightboxModal = document.getElementById('cs-lightbox-modal');
    const closeLightbox = document.getElementById('cs-lightbox-close');

    if (triggerZoom && lightboxModal) {
      triggerZoom.addEventListener('click', () => {
        lightboxModal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    }

    if (closeLightbox && lightboxModal) {
      closeLightbox.addEventListener('click', () => {
        lightboxModal.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    }

    if (lightboxModal) {
      lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
          lightboxModal.classList.remove('is-open');
          document.body.style.overflow = '';
        }
      });
    }

    // 5. Copy Link to Case Study
    const btnShare = document.getElementById('btn-share-case-study');
    if (btnShare) {
      btnShare.addEventListener('click', () => {
        const fullUrl = window.location.href;
        navigator.clipboard.writeText(fullUrl).then(() => {
          const original = btnShare.innerHTML;
          btnShare.innerHTML = '<span>✔ Copied Link</span>';
          setTimeout(() => {
            btnShare.innerHTML = original;
          }, 2500);
        });
      });
    }
  }
}

// Bootstrap on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  new CaseStudyPageManager();
});
