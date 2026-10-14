import { initSpeedInsights } from './speedInsights.js';

// Initialize Real-User Performance Monitoring (Vercel Speed Insights) across article pages
initSpeedInsights();

/**
 * Shared Navigation Controller
 * Handles mobile drawer toggle, accessibility attributes, and drawer navigation across all routes.
 */
export function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-toggle') || document.getElementById('blog-mobile-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  const closeBtn = document.getElementById('mobile-nav-close');
  const backdrop = document.getElementById('mobile-nav-backdrop');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.classList.add('is-active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.classList.remove('is-active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  // Toggle drawer on button click
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (drawer.classList.contains('is-open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  // Close when any link inside drawer is clicked
  const drawerLinks = drawer.querySelectorAll('.mobile-nav-link, .mobile-cta-action-btn');
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileNav);
} else {
  initMobileNav();
}
