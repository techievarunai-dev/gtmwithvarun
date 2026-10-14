import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export class SpatialScrollController {
  constructor(threeScene) {
    this.threeScene = threeScene;
    this.activeCaseIndex = 0;
    this.init();
  }

  init() {
    this.setupGlobalScrollSync();
    this.setupHeroEntrance();
    this.setupPinnedCaseStudies();
    this.setupSectionScrollTriggers();
    this.setupNavSpyAndAnchors();
    this.setupMobileMenuDrawer();
    this.setupContactForm();
    this.setupCommandCenterInteractions();
    this.setupFAQAccordion();
    this.handleIncomingHash();
  }

  handleIncomingHash() {
    if (window.location.hash) {
      setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 350);
    }
  }

  // 1. Sync global scroll with Three.js camera & top progress line
  setupGlobalScrollSync() {
    const progressLine = document.getElementById('scroll-progress-line');

    ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const p = self.progress;
        this.currentScrollProgress = p;
        
        // Update 3D Three.js camera position along spline
        if (this.threeScene) {
          this.threeScene.setScrollProgress(p);
        }

        // Update top hairline progress bar
        if (progressLine) {
          progressLine.style.width = `${(p * 100).toFixed(2)}%`;
        }
      }
    });
  }

  // 2. Cinematic Hero Entrance Timeline
  setupHeroEntrance() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Header reveal
    tl.from('.site-header', {
      y: -30,
      opacity: 0,
      duration: 0.8
    });

    // Badge reveal
    tl.from('.anim-hero-badge', {
      y: 20,
      opacity: 0,
      duration: 0.6
    }, '-=0.4');

    // Title reveal
    tl.from('.anim-hero-title .title-word', {
      y: 35,
      opacity: 0,
      stagger: 0.12,
      duration: 0.7
    }, '-=0.3');

    // Role Subtitle
    tl.from('.anim-hero-sub', {
      y: 20,
      opacity: 0,
      duration: 0.6
    }, '-=0.3');

    // Lead Paragraph & Extended Text
    tl.from(['.anim-hero-lead', '.anim-hero-subtext'], {
      y: 24,
      opacity: 0,
      stagger: 0.14,
      duration: 0.7
    }, '-=0.3');

    // Portrait Image reveal with subtle scale
    tl.from('.anim-hero-portrait', {
      scale: 0.94,
      opacity: 0,
      duration: 0.9,
      ease: 'back.out(1.2)'
    }, '-=0.6');

    // Metrics Ribbon reveal
    tl.from('.anim-hero-metrics', {
      y: 25,
      opacity: 0,
      duration: 0.7
    }, '-=0.4');

    // Animated Counters for Metrics
    tl.add(() => {
      this.animateHeroCounters();
    }, '-=0.2');

    // Call to action buttons & ingress cue
    tl.from(['.anim-hero-cta', '.anim-hero-cue'], {
      y: 15,
      opacity: 0,
      stagger: 0.12,
      duration: 0.6
    }, '-=0.2');
  }

  animateHeroCounters() {
    const savedEl = document.getElementById('metric-hours-saved');
    const freedEl = document.getElementById('metric-hours-freed');

    if (savedEl) {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: 28,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate: () => {
          savedEl.textContent = Math.round(obj.val).toString();
        }
      });
    }

    if (freedEl) {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: 6,
        duration: 1.4,
        ease: 'power2.out',
        onUpdate: () => {
          freedEl.textContent = Math.round(obj.val).toString();
        }
      });
    }
  }

  // 3. Pinned Immersive Case Studies Storytelling
  setupPinnedCaseStudies() {
    const projectCards = document.querySelectorAll('.project-narrative-card');
    const stickyImg = document.getElementById('sticky-active-img');
    const stickyTagType = document.getElementById('sticky-tag-type');
    const stickyTagRuntime = document.getElementById('sticky-tag-runtime');
    const stickyHeading = document.getElementById('sticky-project-heading');
    const stickySubtitle = document.getElementById('sticky-project-subtitle');
    const stickyTagsRow = document.getElementById('sticky-tags-row');

    if (!projectCards.length || !stickyImg) return;

    projectCards.forEach((card, idx) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 65%',
        end: 'bottom 45%',
        onEnter: () => this.updateStickyProject(card, idx),
        onEnterBack: () => this.updateStickyProject(card, idx)
      });
    });

    // Pinned interaction button: open video walkthrough modal
    const btnWalkthrough = document.getElementById('btn-open-active-walkthrough');
    if (btnWalkthrough) {
      btnWalkthrough.addEventListener('click', () => {
        const activeCard = projectCards[this.activeCaseIndex] || projectCards[0];
        const title = activeCard.dataset.title;
        const img = activeCard.dataset.img;
        const sub = activeCard.dataset.sub;

        const modalTitle = document.getElementById('modal-player-title');
        const headline = document.getElementById('player-active-headline');
        const poster = document.getElementById('player-poster-img');
        const subEl = document.getElementById('player-active-sub');

        if (modalTitle) modalTitle.textContent = title;
        if (headline) headline.textContent = title;
        if (poster) poster.src = img;
        if (subEl) subEl.textContent = sub;

        const modal = document.getElementById('modal-walkthrough-player');
        if (modal) {
          modal.classList.remove('is-closing');
          modal.classList.add('is-open');
          document.body.style.overflow = 'hidden';
          const closeBtn = modal.querySelector('.modal-close-btn');
          if (closeBtn) closeBtn.focus();
        }
      });
    }
  }

  updateStickyProject(card, index) {
    this.activeCaseIndex = index;

    // Active visual highlight on card
    document.querySelectorAll('.project-narrative-card').forEach((c, i) => {
      c.classList.toggle('active', i === index);
    });

    const img = card.dataset.img;
    const type = card.dataset.type;
    const runtime = card.dataset.runtime;
    const title = card.dataset.title;
    const sub = card.dataset.sub;
    const tags = card.dataset.tags ? card.dataset.tags.split(',') : [];

    const stickyImg = document.getElementById('sticky-active-img');
    const stickyTagType = document.getElementById('sticky-tag-type');
    const stickyTagRuntime = document.getElementById('sticky-tag-runtime');
    const stickyHeading = document.getElementById('sticky-project-heading');
    const stickySubtitle = document.getElementById('sticky-project-subtitle');
    const stickyTagsRow = document.getElementById('sticky-tags-row');

    if (stickyImg && stickyImg.getAttribute('src') !== img) {
      // Smooth crossfade transition
      gsap.to(stickyImg, {
        opacity: 0.2,
        scale: 0.98,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          stickyImg.src = img;
          gsap.to(stickyImg, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out'
          });
        }
      });
    }

    if (stickyTagType) stickyTagType.textContent = type;
    if (stickyTagRuntime) stickyTagRuntime.textContent = runtime;
    if (stickyHeading) stickyHeading.textContent = title;
    if (stickySubtitle) stickySubtitle.textContent = sub;

    // Dynamically update link redirects to the full case study page
    const caseUrl = card.dataset.url || `/case-study.html?id=${card.dataset.slug || 'us-insurance-outbound-system'}`;
    const stickyLink = document.getElementById('sticky-image-link');
    const stickyPrimaryBtn = document.getElementById('sticky-primary-case-btn');
    const stickyHeadingLink = document.getElementById('sticky-heading-link');

    if (stickyLink) stickyLink.href = caseUrl;
    if (stickyPrimaryBtn) stickyPrimaryBtn.href = caseUrl;
    if (stickyHeadingLink) stickyHeadingLink.href = caseUrl;

    if (stickyTagsRow) {
      stickyTagsRow.innerHTML = tags.map(t => `<span class="tag-pill">${t.trim()}</span>`).join('');
    }
  }

  // 4. Subtle Parallax and Section Reveals
  setupSectionScrollTriggers() {
    const cards = document.querySelectorAll('.spatial-card:not(.case-studies-outer-card)');
    cards.forEach(card => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 35,
        opacity: 0.85,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'transform'
      });
    });

    const caseStudyCard = document.querySelector('.case-studies-outer-card');
    if (caseStudyCard) {
      gsap.from(caseStudyCard, {
        scrollTrigger: {
          trigger: caseStudyCard,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0.85,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all'
      });
    }

    // About section portrait entrance reveal (subtle fade-in and upward transition)
    const aboutPortrait = document.querySelector('.about-portrait-wrapper');
    if (aboutPortrait) {
      gsap.from(aboutPortrait, {
        scrollTrigger: {
          trigger: aboutPortrait,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 28,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        clearProps: 'transform'
      });
    }

    // "How I Think" step reveals
    const steps = document.querySelectorAll('.model-step-card');
    steps.forEach((step, idx) => {
      gsap.from(step, {
        scrollTrigger: {
          trigger: step,
          start: 'top 85%'
        },
        x: 25,
        opacity: 0,
        duration: 0.6,
        delay: idx * 0.15,
        ease: 'power2.out'
      });
    });
  }

  // 5. ScrollSpy & Smooth Anchor Navigation
  setupNavSpyAndAnchors() {
    const sections = document.querySelectorAll('.spatial-section');
    const navLinks = document.querySelectorAll('.nav-btn, .nav-cta-dark-btn, .brand-link, .faq-contact-cta-btn, .mobile-cta-action-btn');

    // Click handler with smooth glide
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('data-nav-target') || link.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          e.preventDefault();
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });

    // ScrollSpy observer
    sections.forEach(sec => {
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 40%',
        end: 'bottom 40%',
        onEnter: () => this.setActiveNav(`#${sec.id}`),
        onEnterBack: () => this.setActiveNav(`#${sec.id}`)
      });
    });
  }

  setActiveNav(id) {
    const navLinks = document.querySelectorAll('.nav-btn');
    navLinks.forEach(link => {
      const target = link.getAttribute('data-nav-target') || link.getAttribute('href');
      link.classList.toggle('active', target === id);
    });

    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      const target = link.getAttribute('data-nav-target') || link.getAttribute('href');
      link.classList.toggle('active', target === id);
    });
  }

  // 6. Mobile Navigation Drawer Controller
  setupMobileMenuDrawer() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-nav-drawer');
    const closeBtn = document.getElementById('mobile-nav-close');
    const backdrop = document.getElementById('mobile-nav-backdrop');
    const drawerLinks = document.querySelectorAll('.mobile-nav-link');

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

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (drawer.classList.contains('is-open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeDrawer);
    }

    if (backdrop) {
      backdrop.addEventListener('click', closeDrawer);
    }

    // Close on navigation link click and smoothly scroll
    drawerLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('data-nav-target') || link.getAttribute('href');
        closeDrawer();
        if (targetId && targetId.startsWith('#')) {
          e.preventDefault();
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            setTimeout(() => {
              targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 180);
          }
        }
      });
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });
  }

  // 7. Contact Form Transmission
  setupContactForm() {
    const form = document.getElementById('transmission-contact-form');
    const feedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('btn-send-transmission');

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('input-name')?.value.trim();
      const email = document.getElementById('input-email')?.value.trim();
      const payload = document.getElementById('input-payload')?.value.trim();

      if (!name || !email || !payload) {
        if (feedback) {
          feedback.textContent = 'Please fill out all transmission fields.';
          feedback.style.color = '#ef4444';
        }
        return;
      }

      if (submitBtn) {
        submitBtn.innerHTML = '<span class="btn-lock-icon">⏳</span> Encrypting Payload...';
        submitBtn.style.opacity = '0.8';
      }

      setTimeout(() => {
        const subject = encodeURIComponent(`GTM Engineering Inquiry from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nRequirements / Payload:\n${payload}`);
        const mailtoUrl = `mailto:workwithvarunmurugan@gmail.com?subject=${subject}&body=${body}`;

        window.open(mailtoUrl, '_blank');

        if (feedback) {
          feedback.innerHTML = '<strong style="color: #10b981;">Transmission Ready!</strong> Opening your email client to dispatch to <code>workwithvarunmurugan@gmail.com</code>.';
        }

        if (submitBtn) {
          submitBtn.innerHTML = '<span class="btn-lock-icon">✔</span> Dispatched';
        }

        form.reset();

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.innerHTML = '<span class="btn-lock-icon">🔒</span> Send Secure Request';
            submitBtn.style.opacity = '1';
          }
        }, 4000);
      }, 700);
    });
  }

  // 8. AI GTM Command Center Interaction Controller (Touch & Desktop Elevation)
  setupCommandCenterInteractions() {
    const cards = document.querySelectorAll('.gtm-float-card');
    if (!cards.length) return;

    cards.forEach(card => {
      // Touch/tap elevation toggle
      card.addEventListener('pointerdown', () => {
        cards.forEach(c => {
          if (c !== card) c.classList.remove('is-active-tap');
        });
        card.classList.toggle('is-active-tap');
      });
    });

    // Dismiss active elevation on tap outside
    document.addEventListener('pointerdown', (e) => {
      if (!e.target.closest('.gtm-float-card')) {
        cards.forEach(c => c.classList.remove('is-active-tap'));
      }
    });
  }

  // 9. Premium Interactive FAQ Accordion Controller
  setupFAQAccordion() {
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

      // Keyboard accessibility (Enter and Space are native on button, handle Home/End/Arrows if needed)
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
}

