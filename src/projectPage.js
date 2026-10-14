import { initSpeedInsights } from './speedInsights.js';
import { initMobileNav } from './navController.js';

// 1. Initialize Real-User Performance Monitoring (Vercel Speed Insights)
initSpeedInsights();

// 2. Initialize Mobile Drawer Navigation across case studies
initMobileNav();

/**
 * Accessible Lightbox Modal for Case Study Deliverables & Architecture Diagrams
 */
export function initDeliverablesLightbox() {
  const lightbox = document.getElementById('deliverables-lightbox') || document.getElementById('cs-lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-image') || document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const closeBtn = document.getElementById('lightbox-close-btn') || document.getElementById('cs-lightbox-close');
  const backdrop = document.getElementById('lightbox-backdrop');

  if (!lightbox || !lightboxImg) return;

  const openLightbox = (src, alt, title, desc) => {
    lightboxImg.src = src;
    lightboxImg.alt = alt || title || 'Full Resolution Deliverable';
    if (lightboxTitle) lightboxTitle.textContent = title || 'Project Deliverable';
    if (lightboxDesc) lightboxDesc.textContent = desc || '';

    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Bind click on all deliverable thumbnails and preview wrappers
  document.querySelectorAll('.cs-deliverable-img-wrap, .cs-diagram-img-wrap, [data-lightbox-src]').forEach(wrap => {
    wrap.addEventListener('click', (e) => {
      const target = e.currentTarget;
      const img = target.querySelector('img') || target;
      const src = target.getAttribute('data-lightbox-src') || img.currentSrc || img.src;
      const alt = img.alt || '';
      const card = target.closest('.cs-deliverable-card, .cs-diagram-frame');
      const title = card?.querySelector('.cs-deliverable-title, .cs-diagram-title')?.textContent?.trim() || alt;
      const desc = card?.querySelector('.cs-deliverable-desc, .cs-telemetry-note')?.textContent?.trim() || '';

      openLightbox(src, alt, title, desc);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDeliverablesLightbox);
} else {
  initDeliverablesLightbox();
}
