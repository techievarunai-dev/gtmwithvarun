export class ModalManager {
  constructor() {
    this.activeModal = null;
    this.init();
  }

  init() {
    // 1. Trigger Buttons for Knowledge Node Cards
    const triggerCerts = document.getElementById('node-card-certifications');
    const triggerStack = document.getElementById('node-card-stack');
    const triggerCases = document.getElementById('node-card-cases');
    const triggerGlobal = document.getElementById('node-card-global');

    if (triggerCerts) triggerCerts.addEventListener('click', () => this.open('modal-certifications'));
    if (triggerStack) triggerStack.addEventListener('click', () => this.open('modal-stack'));
    if (triggerCases) triggerCases.addEventListener('click', () => this.open('modal-case-studies'));
    if (triggerGlobal) triggerGlobal.addEventListener('click', () => this.open('modal-global-reviews'));

    // Also support keyboard Enter / Space on node cards
    [triggerCerts, triggerStack, triggerCases, triggerGlobal].forEach(card => {
      if (!card) return;
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });

    // 2. Profile Philosophy Modal Trigger
    const btnPhil = document.getElementById('open-philosophy-modal');
    if (btnPhil) {
      btnPhil.addEventListener('click', () => this.open('modal-stack'));
    }

    // 3. Walkthrough Video Modal Trigger
    const btnVideoPlay = document.getElementById('btn-trigger-walkthrough-modal');
    if (btnVideoPlay) {
      btnVideoPlay.addEventListener('click', () => {
        // Read active showcase title and poster
        const titleEl = document.getElementById('walkthrough-active-title');
        const posterEl = document.getElementById('walkthrough-bg-poster');

        const modalTitle = document.getElementById('modal-player-title');
        const playerHeadline = document.getElementById('player-active-headline');
        const playerPoster = document.getElementById('player-poster-img');

        if (titleEl && modalTitle) modalTitle.textContent = titleEl.textContent;
        if (titleEl && playerHeadline) playerHeadline.textContent = titleEl.textContent;
        if (posterEl && playerPoster) playerPoster.src = posterEl.src;

        this.open('modal-walkthrough-player');
      });
    }

    // 4. Modal Close Buttons
    const closeBtns = document.querySelectorAll('[data-close-modal]');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetId = btn.dataset.closeModal;
        this.close(targetId);
      });
    });

    // 5. Backdrop click to close
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          this.close(backdrop.id);
        }
      });
    });

    // 6. Escape key listener
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeModal) {
        this.close(this.activeModal);
      }
    });
  }

  open(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    this.activeModal = modalId;
    modal.classList.remove('is-closing');
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // Focus on close button for accessibility
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) closeBtn.focus();
  }

  close(modalId) {
    const targetId = modalId || this.activeModal;
    if (!targetId) return;

    const modal = document.getElementById(targetId);
    if (!modal) {
      this.activeModal = null;
      document.body.style.overflow = '';
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      modal.classList.remove('is-open', 'is-closing');
      if (this.activeModal === targetId) this.activeModal = null;
      document.body.style.overflow = '';
      return;
    }

    // Polished exit animation (240ms duration)
    modal.classList.add('is-closing');
    setTimeout(() => {
      modal.classList.remove('is-open', 'is-closing');
      if (this.activeModal === targetId) {
        this.activeModal = null;
      }
      document.body.style.overflow = '';
    }, 240);
  }
}
