export class WorkflowSimulator {
  constructor() {
    this.steps = [
      {
        id: 0,
        name: 'LEAD INTAKE',
        command: '$ cat /telemetry/node_intake.log',
        badge: '[SYSTEM_OK] STATUS_OK',
        lines: [
          'Webhook listener ingress: POST /api/v1/inbound-leads',
          '> Payload validated: domain=enterprise.com, latency=38ms',
          '> Structural JSON Schema check passed with 0 errors.',
          '> Next transition queued: [AI_CLASSIFIER]'
        ]
      },
      {
        id: 1,
        name: 'AI CLASSIFIER',
        command: '$ cat /telemetry/ai_classifier.log',
        badge: '[INFERENCE_COMPLETE] SCORE: 94/100',
        lines: [
          'Prompt engine: OpenAI GPT-4o structured extraction',
          '> Intent category: HIGH_INTENT_BUYING_SIGNAL (Expansion RFP)',
          '> Persona score: VP Sales / RevOps Leader (Fit: 96%)',
          '> Execution time: 420ms | Token usage: 142 input / 38 completion'
        ]
      },
      {
        id: 2,
        name: 'INTENT ROUTING',
        command: '$ cat /telemetry/intent_routing.log',
        badge: '[ENRICHMENT_SYNCED] 14 FIELDS',
        lines: [
          'Clay multi-provider enrichment triggered via API',
          '> Enriched: Tech stack (HubSpot, Apollo, Salesforce), employee headcount: 140',
          '> Deterministic state progression: STATE_QUALIFIED',
          '> Routing branch: Tier-1 priority SLA (<3 minute response trigger)'
        ]
      },
      {
        id: 3,
        name: 'HUBSPOT SYNC',
        command: '$ cat /telemetry/hubspot_sync.log',
        badge: '[CRM_UPSERT] HTTP 200',
        lines: [
          'HubSpot REST API sync node: PATCH /crm/v3/objects/contacts',
          '> Contact record ID: 4892104 (Lifecycle stage: Marketing Qualified Lead)',
          '> Custom fields mapped: Intent_Score=94, Buying_Signal="Leadership Hire"',
          '> Bi-directional sync verified in 118ms'
        ]
      },
      {
        id: 4,
        name: 'SLACK TRIAGE',
        command: '$ cat /telemetry/slack_triage.log',
        badge: '[DISPATCHED] SLA_ALERT_ACTIVE',
        lines: [
          'Slack Webhook dispatch to #gtm-inbound-urgent',
          '> Lead card rendered with Clay enrichment dossier and direct CRM link',
          '> 3-minute SLA response timer initialized',
          '> Complete end-to-end pipeline execution time: 1.84 seconds'
        ]
      }
    ];

    this.currentStep = 0;
    this.isSimulating = false;

    // Showcase projects data
    this.showcaseProjects = [
      {
        idx: 0,
        title: 'US Insurance Outbound System (24 min)',
        tag: 'INTERVIEW ASSESSMENT – EUBRICS CHALLENGE',
        desc: 'Architected a 4-workflow ABM system in n8n connecting Apollo qualification, Google Sheets deterministic state store, and AI reply classification.',
        duration: '24 MIN WALKTHROUGH',
        poster: '/assets/case-studies/us-insurance-outbound-system/hero-workflow-1.png'
      },
      {
        idx: 1,
        title: 'AI-Powered GTM Intelligence Hub (13 min)',
        tag: 'PERSONAL PROJECT',
        desc: 'Built continuous monitoring of buying signals, company enrichment via Clay, OpenAI account scoring, and automated Slack alert dispatch.',
        duration: '13 MIN WALKTHROUGH',
        poster: '/assets/case-studies/gtm-intelligence-hub/video-poster.jpg',
        videoSrc: '/assets/case-studies/gtm-intelligence-hub/gtm-hub-walkthrough.mp4'
      },
      {
        idx: 2,
        title: 'Lead Response OS (2 min)',
        tag: 'CLIENT ENGAGEMENT – ROMANIA',
        desc: 'Webhook-driven workflow enriching leads with Clay, intent classification with OpenAI, reducing response SLA from 4 hours to under 3 minutes.',
        duration: '2 MIN WALKTHROUGH',
        poster: '/assets/case-studies/lead-response-os/hero-workflow.png'
      }
    ];

    this.isTransitioning = false;
    this.init();
  }

  init() {
    // 1. Step Node Buttons
    const stepNodes = document.querySelectorAll('.step-node');
    stepNodes.forEach(node => {
      node.addEventListener('click', () => {
        const stepIdx = parseInt(node.dataset.step, 10);
        this.setActiveStep(stepIdx);
      });
    });

    // 2. Run Packet Simulation Button
    const runBtn = document.getElementById('btn-run-simulation');
    if (runBtn) {
      runBtn.addEventListener('click', () => this.runSimulation());
    }

    // 3. Tab Switcher (Simulator vs Showcase) with Debouncing and Accessibility
    const switcherBtns = document.querySelectorAll('.switcher-btn');
    switcherBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        this.switchView(view);
      });

      // Keyboard navigation between tabs (ArrowLeft, ArrowRight, Home, End)
      btn.addEventListener('keydown', (e) => {
        let targetIndex = -1;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          targetIndex = (index + 1) % switcherBtns.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          targetIndex = (index - 1 + switcherBtns.length) % switcherBtns.length;
        } else if (e.key === 'Home') {
          targetIndex = 0;
        } else if (e.key === 'End') {
          targetIndex = switcherBtns.length - 1;
        }

        if (targetIndex !== -1) {
          e.preventDefault();
          const targetButton = switcherBtns[targetIndex];
          targetButton.focus();
          const view = targetButton.dataset.view;
          this.switchView(view);
        }
      });
    });

    // 4. Showcase Selector Items
    const showcaseItems = document.querySelectorAll('.showcase-item');
    showcaseItems.forEach(item => {
      item.addEventListener('click', () => {
        showcaseItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const pIdx = parseInt(item.dataset.projectIdx, 10);
        this.setActiveShowcase(pIdx);
      });
    });

    // Prime initial showcase metadata
    this.setActiveShowcase(0);
  }

  /**
   * Smoothly transitions between Simulator and Showcase panes
   * with polished exits, gradual entrances, and staggered card layering.
   */
  switchView(targetView) {
    if (this.isTransitioning) return;

    const switcherBtns = document.querySelectorAll('.switcher-btn');
    const targetBtn = Array.from(switcherBtns).find(b => b.dataset.view === targetView);
    if (!targetBtn || targetBtn.classList.contains('active')) return;

    const viewSim = document.getElementById('view-simulator');
    const viewShow = document.getElementById('view-showcase');
    const outgoingPane = targetView === 'simulator' ? viewShow : viewSim;
    const incomingPane = targetView === 'simulator' ? viewSim : viewShow;

    if (!outgoingPane || !incomingPane) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Update switcher buttons UI immediately
    switcherBtns.forEach(b => {
      const isTarget = b === targetBtn;
      b.classList.toggle('active', isTarget);
      b.setAttribute('aria-selected', isTarget ? 'true' : 'false');
      b.setAttribute('tabindex', isTarget ? '0' : '-1');
    });

    if (prefersReducedMotion) {
      outgoingPane.classList.remove('active', 'is-entering', 'is-entered', 'is-exiting');
      incomingPane.classList.remove('is-entering', 'is-entered', 'is-exiting');
      incomingPane.classList.add('active');
      return;
    }

    this.isTransitioning = true;

    // 1. Exit animation on outgoing pane (220ms)
    outgoingPane.classList.remove('is-entering', 'is-entered');
    outgoingPane.classList.add('is-exiting');

    setTimeout(() => {
      // 2. Hide outgoing pane completely once exit finishes
      outgoingPane.classList.remove('active', 'is-exiting');

      // 3. Prepare incoming pane with initial entering state
      incomingPane.classList.remove('is-exiting');
      incomingPane.classList.add('active', 'is-entering');

      // Force synchronous reflow so initial state is registered before entering
      void incomingPane.offsetHeight;

      // 4. Trigger smooth entrance transition with sequential stagger
      requestAnimationFrame(() => {
        incomingPane.classList.add('is-entered');

        // 5. Clean up helper animation classes after entrance completes
        setTimeout(() => {
          incomingPane.classList.remove('is-entering', 'is-entered');
          this.isTransitioning = false;
        }, 460);
      });
    }, 220);
  }

  setActiveStep(stepIndex) {
    if (stepIndex < 0 || stepIndex >= this.steps.length) return;
    this.currentStep = stepIndex;

    // Update node UI
    const stepNodes = document.querySelectorAll('.step-node');
    stepNodes.forEach((node, idx) => {
      node.classList.toggle('active', idx === stepIndex);
      node.setAttribute('aria-selected', idx === stepIndex ? 'true' : 'false');
    });

    // Smoothly scroll active node into center of mobile carousel
    const activeNode = stepNodes[stepIndex];
    if (activeNode && activeNode.parentElement) {
      const container = activeNode.parentElement;
      if (container.scrollWidth > container.clientWidth) {
        activeNode.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }

    // Update connector UI
    for (let i = 0; i < 4; i++) {
      const conn = document.getElementById(`conn-${i}`);
      if (conn) {
        conn.classList.toggle('active', i < stepIndex);
      }
    }

    // Update Telemetry Display
    const step = this.steps[stepIndex];
    const cmdEl = document.getElementById('telemetry-command');
    const badgeEl = document.getElementById('telemetry-status-badge');
    const contentEl = document.getElementById('telemetry-content');

    if (cmdEl) cmdEl.textContent = step.command;
    if (badgeEl) badgeEl.textContent = step.badge;
    if (contentEl) {
      contentEl.innerHTML = step.lines
        .map(line => {
          let cls = 'telemetry-line';
          if (line.startsWith('>')) cls += ' text-cyan';
          return `<p class="${cls}">${line}</p>`;
        })
        .join('');
    }
  }

  async runSimulation() {
    if (this.isSimulating) return;
    this.isSimulating = true;

    const runBtn = document.getElementById('btn-run-simulation');
    if (runBtn) {
      runBtn.innerHTML = '<span class="run-icon">⏳</span> TRANSMITTING...';
      runBtn.style.opacity = '0.7';
    }

    for (let i = 0; i < this.steps.length; i++) {
      this.setActiveStep(i);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    if (runBtn) {
      runBtn.innerHTML = '<span class="run-icon">✔</span> COMPLETED';
      await new Promise(resolve => setTimeout(resolve, 1200));
      runBtn.innerHTML = '<span class="run-icon">▶</span> RUN LIVE PACKET';
      runBtn.style.opacity = '1';
    }

    this.isSimulating = false;
  }

  setActiveShowcase(idx) {
    const proj = this.showcaseProjects[idx] || this.showcaseProjects[0];
    const posterEl = document.getElementById('walkthrough-bg-poster');
    const titleEl = document.getElementById('walkthrough-active-title');
    const runtimeEl = document.getElementById('walkthrough-runtime-badge');
    const descEl = document.querySelector('.video-card-desc');
    const tagEl = document.querySelector('.video-tag');
    const playBtn = document.getElementById('btn-trigger-walkthrough-modal');

    if (posterEl && posterEl.getAttribute('src') !== proj.poster) {
      posterEl.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
      posterEl.style.opacity = '0.35';
      posterEl.style.transform = 'scale(0.985)';
      setTimeout(() => {
        posterEl.src = proj.poster;
        posterEl.style.opacity = '1';
        posterEl.style.transform = 'scale(1)';
      }, 180);
    }
    if (titleEl) titleEl.textContent = proj.title;
    if (runtimeEl) runtimeEl.textContent = proj.duration;
    if (descEl && proj.desc) descEl.textContent = proj.desc;
    if (tagEl && proj.tag) tagEl.textContent = proj.tag;
    if (playBtn) {
      playBtn.dataset.videoSrc = proj.videoSrc || '';
      playBtn.dataset.poster = proj.poster || '';
      playBtn.dataset.title = proj.title || '';
    }
  }
}
