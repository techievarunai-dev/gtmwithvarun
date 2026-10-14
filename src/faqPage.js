import { initSpeedInsights } from './speedInsights.js';
import { initMobileNav } from './navController.js';

// Initialize performance monitoring
initSpeedInsights();

// Initialize mobile drawer navigation
initMobileNav();

// Initialize FAQ accordions on dedicated FAQ page
function initFAQAccordions() {
  const items = document.querySelectorAll('.faq-accordion-item');
  if (!items.length) return;

  items.forEach(item => {
    const trigger = item.querySelector('.faq-accordion-trigger');
    const icon = item.querySelector('.faq-icon-symbol');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Toggle current item
      item.classList.toggle('is-open', !isOpen);
      trigger.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
      if (icon) {
        icon.textContent = !isOpen ? '−' : '+';
      }
    });

    // Keyboard navigation between accordion items
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = item.nextElementSibling?.querySelector('.faq-accordion-trigger');
        if (next) next.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = item.previousElementSibling?.querySelector('.faq-accordion-trigger');
        if (prev) prev.focus();
      }
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFAQAccordions);
} else {
  initFAQAccordions();
}
