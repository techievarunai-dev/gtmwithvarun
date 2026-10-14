/**
 * GTM Impact Calculator — Interactive Revenue Intelligence Engine
 * Precision Pipeline Opportunity, Funnel Progression & Capacity Modeler
 */

export class GTMCalculator {
  constructor() {
    this.currency = 'INR'; // 'INR' | 'USD' | 'SGD'
    this.gtmMotion = 'Outbound Sales';
    this.activeScenario = 'current'; // 'current' | 'improved' | 'custom'

    // Currency baseline configurations
    this.currencyConfig = {
      INR: { symbol: '₹', code: 'INR', defaultDeal: 100000, defaultSpend: 50000, stepDeal: 10000, stepSpend: 5000 },
      USD: { symbol: '$', code: 'USD', defaultDeal: 2500, defaultSpend: 1200, stepDeal: 250, stepSpend: 100 },
      SGD: { symbol: 'S$', code: 'SGD', defaultDeal: 3500, defaultSpend: 1600, stepDeal: 350, stepSpend: 150 }
    };

    // State for baseline (Current GTM)
    this.state = {
      prospects: 2000,
      replyRate: 3.0,       // %
      bookingRate: 30.0,    // %
      oppRate: 40.0,        // %
      winRate: 20.0,        // %
      dealValue: 100000,
      spend: 50000,
      manualHours: 160,
      efficiencyPct: 25.0   // %
    };

    // Custom scenario state (user adjustable)
    this.customScenarioState = {
      replyRateDelta: 1.5,   // +1.5%
      bookingRateDelta: 15.0, // +15%
      oppRateDelta: 10.0,     // +10%
      winRateDelta: 5.0,      // +5%
      prospectsDelta: 500     // +500
    };

    this.init();
  }

  init() {
    this.bindInputs();
    this.bindCurrencyToggle();
    this.bindMotionPills();
    this.bindScenarioTabs();
    this.bindExportButton();
    this.bindResetButton();
    this.recalculate();
  }

  // 1. Bind Sliders and Numeric Inputs (Two-way Synchronization)
  bindInputs() {
    const fields = [
      { id: 'calc-prospects', stateKey: 'prospects', isFloat: false },
      { id: 'calc-reply-rate', stateKey: 'replyRate', isFloat: true },
      { id: 'calc-booking-rate', stateKey: 'bookingRate', isFloat: true },
      { id: 'calc-opp-rate', stateKey: 'oppRate', isFloat: true },
      { id: 'calc-win-rate', stateKey: 'winRate', isFloat: true },
      { id: 'calc-deal-value', stateKey: 'dealValue', isFloat: false },
      { id: 'calc-spend', stateKey: 'spend', isFloat: false },
      { id: 'calc-manual-hours', stateKey: 'manualHours', isFloat: false },
      { id: 'calc-efficiency-pct', stateKey: 'efficiencyPct', isFloat: true }
    ];

    fields.forEach(({ id, stateKey, isFloat }) => {
      const slider = document.getElementById(`${id}-range`);
      const numberInput = document.getElementById(`${id}-num`);

      if (slider && numberInput) {
        // Slider change -> update number input and state
        slider.addEventListener('input', (e) => {
          const val = isFloat ? parseFloat(e.target.value) : parseInt(e.target.value, 10);
          this.state[stateKey] = Math.max(0, val || 0);
          numberInput.value = this.state[stateKey];
          this.recalculate();
        });

        // Number input change -> update slider and state
        numberInput.addEventListener('input', (e) => {
          const val = isFloat ? parseFloat(e.target.value) : parseInt(e.target.value, 10);
          this.state[stateKey] = Math.max(0, val || 0);
          slider.value = this.state[stateKey];
          this.recalculate();
        });
      }
    });

    // Custom scenario sliders if present
    const customSliders = [
      { id: 'custom-delta-reply', key: 'replyRateDelta', isFloat: true },
      { id: 'custom-delta-booking', key: 'bookingRateDelta', isFloat: true },
      { id: 'custom-delta-opp', key: 'oppRateDelta', isFloat: true },
      { id: 'custom-delta-win', key: 'winRateDelta', isFloat: true }
    ];

    customSliders.forEach(({ id, key, isFloat }) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', (e) => {
          this.customScenarioState[key] = isFloat ? parseFloat(e.target.value) : parseInt(e.target.value, 10);
          const valLabel = document.getElementById(`${id}-val`);
          if (valLabel) {
            valLabel.textContent = `+${this.customScenarioState[key]}%`;
          }
          if (this.activeScenario === 'custom') {
            this.recalculate();
          }
        });
      }
    });
  }

  // 2. Currency Switcher (INR / USD / SGD)
  bindCurrencyToggle() {
    const buttons = document.querySelectorAll('.currency-toggle-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const selected = btn.dataset.currency;
        if (selected && this.currencyConfig[selected] && this.currency !== selected) {
          const oldCurrency = this.currency;
          this.currency = selected;

          buttons.forEach(b => {
            const isActive = b.dataset.currency === selected;
            b.classList.toggle('active', isActive);
            b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
          });

          // Adjust deal value & spend proportionally or to sensible default
          this.convertCurrencyValues(oldCurrency, selected);
          this.updateCurrencyLabels();
          this.recalculate();
        }
      });
    });
  }

  convertCurrencyValues(oldC, newC) {
    // Sensible base ratios: 1 USD = 83 INR, 1 SGD = 62 INR
    const ratesInINR = { INR: 1, USD: 83, SGD: 62 };
    const valueInINR = this.state.dealValue * ratesInINR[oldC];
    const spendInINR = this.state.spend * ratesInINR[oldC];

    const newDeal = Math.round(valueInINR / ratesInINR[newC]);
    const newSpend = Math.round(spendInINR / ratesInINR[newC]);

    this.state.dealValue = Math.max(100, newDeal);
    this.state.spend = Math.max(50, newSpend);

    // Update form elements
    const dealRange = document.getElementById('calc-deal-value-range');
    const dealNum = document.getElementById('calc-deal-value-num');
    const spendRange = document.getElementById('calc-spend-range');
    const spendNum = document.getElementById('calc-spend-num');

    if (dealRange && dealNum) {
      if (newC === 'INR') {
        dealRange.max = '2000000';
        dealRange.step = '10000';
      } else {
        dealRange.max = '50000';
        dealRange.step = '250';
      }
      dealRange.value = this.state.dealValue;
      dealNum.value = this.state.dealValue;
    }

    if (spendRange && spendNum) {
      if (newC === 'INR') {
        spendRange.max = '500000';
        spendRange.step = '5000';
      } else {
        spendRange.max = '15000';
        spendRange.step = '100';
      }
      spendRange.value = this.state.spend;
      spendNum.value = this.state.spend;
    }
  }

  updateCurrencyLabels() {
    const symbol = this.currencyConfig[this.currency].symbol;
    document.querySelectorAll('.currency-symbol-label').forEach(el => {
      el.textContent = symbol;
    });
  }

  // 3. GTM Motion Selector
  bindMotionPills() {
    const pills = document.querySelectorAll('.gtm-motion-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.gtmMotion = pill.dataset.motion || 'Outbound Sales';
        
        // Update context label
        const motionDisplay = document.getElementById('gtm-motion-active-label');
        if (motionDisplay) motionDisplay.textContent = this.gtmMotion;

        this.generateRecommendations();
      });
    });
  }

  // 4. Scenario Switcher (Current / Improved / Custom)
  bindScenarioTabs() {
    const tabs = document.querySelectorAll('.scenario-tab-btn');
    const customDrawer = document.getElementById('scenario-custom-drawer');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.activeScenario = tab.dataset.scenario || 'current';

        if (customDrawer) {
          const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (this.activeScenario === 'custom') {
            if (prefersReduced) {
              customDrawer.style.display = 'block';
              customDrawer.style.opacity = '1';
              customDrawer.style.transform = 'none';
            } else {
              customDrawer.style.display = 'block';
              customDrawer.style.opacity = '0';
              customDrawer.style.transform = 'translateY(10px) scale(0.985)';
              customDrawer.style.transition = 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
              requestAnimationFrame(() => {
                customDrawer.style.opacity = '1';
                customDrawer.style.transform = 'translateY(0) scale(1)';
              });
            }
          } else {
            if (prefersReduced || customDrawer.style.display === 'none') {
              customDrawer.style.display = 'none';
            } else {
              customDrawer.style.opacity = '0';
              customDrawer.style.transform = 'translateY(-6px) scale(0.985)';
              setTimeout(() => {
                if (this.activeScenario !== 'custom') {
                  customDrawer.style.display = 'none';
                }
              }, 220);
            }
          }
        }

        this.recalculate();
      });
    });
  }

  // 5. Reset Button
  bindResetButton() {
    const resetBtn = document.getElementById('btn-reset-calc');
    if (!resetBtn) return;

    resetBtn.addEventListener('click', () => {
      const cfg = this.currencyConfig[this.currency];
      this.state = {
        prospects: 2000,
        replyRate: 3.0,
        bookingRate: 30.0,
        oppRate: 40.0,
        winRate: 20.0,
        dealValue: cfg.defaultDeal,
        spend: cfg.defaultSpend,
        manualHours: 160,
        efficiencyPct: 25.0
      };

      // Sync form fields
      this.syncInputsWithState();
      this.recalculate();
    });
  }

  syncInputsWithState() {
    const mapping = {
      'calc-prospects': this.state.prospects,
      'calc-reply-rate': this.state.replyRate,
      'calc-booking-rate': this.state.bookingRate,
      'calc-opp-rate': this.state.oppRate,
      'calc-win-rate': this.state.winRate,
      'calc-deal-value': this.state.dealValue,
      'calc-spend': this.state.spend,
      'calc-manual-hours': this.state.manualHours,
      'calc-efficiency-pct': this.state.efficiencyPct
    };

    Object.entries(mapping).forEach(([id, val]) => {
      const range = document.getElementById(`${id}-range`);
      const num = document.getElementById(`${id}-num`);
      if (range) range.value = val;
      if (num) num.value = val;
    });
  }

  // 6. Export / Print PDF Summary
  bindExportButton() {
    const exportBtn = document.getElementById('btn-export-calc-summary');
    if (!exportBtn) return;

    exportBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // 7. Core Calculations & Model Progression
  computeMetrics(inputState) {
    const {
      prospects,
      replyRate,
      bookingRate,
      oppRate,
      winRate,
      dealValue,
      spend,
      manualHours,
      efficiencyPct
    } = inputState;

    // Funnel Steps (stage drop-down)
    const positiveReplies = prospects * (replyRate / 100);
    const bookedMeetings = positiveReplies * (bookingRate / 100);
    const qualifiedOpps = bookedMeetings * (oppRate / 100);
    const expectedCustomers = qualifiedOpps * (winRate / 100);

    // Revenue & Pipeline (ACV)
    const monthlyPipeline = Math.round(qualifiedOpps * dealValue);
    const monthlyBookings = Math.round(expectedCustomers * dealValue);
    const annualBookings = monthlyBookings * 12;

    // Time & Capacity
    const hoursSavedMonthly = Math.round(manualHours * (efficiencyPct / 100));
    const hoursSavedAnnual = hoursSavedMonthly * 12;

    // Simplified Cost Per Customer (tools & ops spend / customer)
    const costPerCustomer = expectedCustomers > 0 ? Math.round(spend / expectedCustomers) : null;

    // Pipeline Coverage Ratio
    const pipelineCoverage = monthlyBookings > 0 ? parseFloat((monthlyPipeline / monthlyBookings).toFixed(1)) : 0;

    return {
      prospects,
      positiveReplies,
      bookedMeetings,
      qualifiedOpps,
      expectedCustomers,
      monthlyPipeline,
      monthlyBookings,
      annualBookings,
      hoursSavedMonthly,
      hoursSavedAnnual,
      efficiencyPct,
      costPerCustomer,
      pipelineCoverage
    };
  }

  // 8. Scenario Multiplier Engine
  getScenarioState() {
    if (this.activeScenario === 'current') {
      return { ...this.state };
    }

    if (this.activeScenario === 'improved') {
      // Tested GTM Engineering benchmarks:
      // - Signals & waterfall enrichment lifts reply rate by +35% relative
      // - Sub-3m response OS lifts booking conversion by +30% relative
      // - MEDDPIC deterministic qualification lifts opp conversion by +25% relative
      // - Workload automation saves 50% manual hours
      return {
        ...this.state,
        replyRate: Math.min(25, this.state.replyRate * 1.35),
        bookingRate: Math.min(85, this.state.bookingRate * 1.30),
        oppRate: Math.min(90, this.state.oppRate * 1.25),
        winRate: Math.min(60, this.state.winRate * 1.15),
        efficiencyPct: Math.min(80, Math.max(this.state.efficiencyPct, 50))
      };
    }

    if (this.activeScenario === 'custom') {
      return {
        ...this.state,
        prospects: this.state.prospects + (this.customScenarioState.prospectsDelta || 0),
        replyRate: Math.min(25, this.state.replyRate + (this.customScenarioState.replyRateDelta || 0)),
        bookingRate: Math.min(85, this.state.bookingRate + (this.customScenarioState.bookingRateDelta || 0)),
        oppRate: Math.min(90, this.state.oppRate + (this.customScenarioState.oppRateDelta || 0)),
        winRate: Math.min(60, this.state.winRate + (this.customScenarioState.winRateDelta || 0))
      };
    }

    return { ...this.state };
  }

  // 9. Main Recalculate Dispatcher
  recalculate() {
    const currentMetrics = this.computeMetrics(this.state);
    const activeScenarioState = this.getScenarioState();
    const activeMetrics = this.computeMetrics(activeScenarioState);

    // Render Metrics
    this.renderPrimaryHero(activeMetrics, currentMetrics);
    this.renderSecondaryMetrics(activeMetrics);
    this.renderFunnel(activeMetrics);
    this.renderScenarioComparison(currentMetrics, activeMetrics);
    this.generateRecommendations();
  }

  // Render Primary Pipeline Hero
  renderPrimaryHero(active, current) {
    const elPipeline = document.getElementById('res-pipeline-hero');
    const elDeltaBadge = document.getElementById('res-pipeline-delta-badge');
    const elSubtext = document.getElementById('res-pipeline-subtext');

    if (elPipeline) {
      elPipeline.textContent = this.formatCurrency(active.monthlyPipeline);
    }

    if (elDeltaBadge) {
      if (this.activeScenario === 'current') {
        elDeltaBadge.style.display = 'none';
      } else {
        const delta = active.monthlyPipeline - current.monthlyPipeline;
        const deltaPct = current.monthlyPipeline > 0 ? (delta / current.monthlyPipeline) * 100 : 0;
        elDeltaBadge.style.display = 'inline-flex';
        elDeltaBadge.textContent = `+${this.formatCurrency(delta)}/mo (+${deltaPct.toFixed(0)}%)`;
      }
    }

    if (elSubtext) {
      elSubtext.textContent = `Qualified opportunities (${active.qualifiedOpps.toFixed(1)}/mo) × Average ACV (${this.formatCurrency(this.state.dealValue)})`;
    }
  }

  // Render 6 Secondary Metric Cards
  renderSecondaryMetrics(m) {
    const sym = this.currencyConfig[this.currency].symbol;

    // 1. Expected Monthly Bookings
    const elBookings = document.getElementById('res-monthly-bookings');
    if (elBookings) elBookings.textContent = this.formatCurrency(m.monthlyBookings);

    // 2. Expected Customers
    const elCustomers = document.getElementById('res-expected-customers');
    if (elCustomers) {
      elCustomers.textContent = `${m.expectedCustomers.toFixed(2)} / mo`;
      const annualCust = document.getElementById('res-annual-customers');
      if (annualCust) annualCust.textContent = `(~${(m.expectedCustomers * 12).toFixed(1)} customers/yr)`;
    }

    // 3. Time Savings Potential
    const elHoursSaved = document.getElementById('res-hours-saved');
    if (elHoursSaved) elHoursSaved.textContent = `${Math.round(m.hoursSavedMonthly)} hrs / mo`;

    // 4. GTM Efficiency Gain
    const elEfficiency = document.getElementById('res-efficiency-gain');
    if (elEfficiency) elEfficiency.textContent = `${m.efficiencyPct.toFixed(0)}% Workload Reclaimed`;

    // 5. Estimated Cost per Acquired Customer
    const elCAC = document.getElementById('res-cost-per-cust');
    if (elCAC) {
      if (m.costPerCustomer !== null && isFinite(m.costPerCustomer)) {
        elCAC.textContent = this.formatCurrency(m.costPerCustomer);
      } else {
        elCAC.textContent = 'N/A';
      }
    }

    // 6. Pipeline Velocity Ratio
    const elCoverage = document.getElementById('res-pipeline-coverage');
    if (elCoverage) {
      elCoverage.textContent = `${m.pipelineCoverage.toFixed(1)}x Ratio`;
    }
  }

  // Render Visual Funnel Step-Down Bars
  renderFunnel(m) {
    const stages = [
      { id: 'funnel-prospects', val: m.prospects, countText: Math.round(m.prospects).toLocaleString(), pct: 100 },
      { id: 'funnel-replies', val: m.positiveReplies, countText: m.positiveReplies.toFixed(1), pct: (m.positiveReplies / Math.max(1, m.prospects)) * 100 },
      { id: 'funnel-meetings', val: m.bookedMeetings, countText: m.bookedMeetings.toFixed(1), pct: (m.bookedMeetings / Math.max(1, m.prospects)) * 100 },
      { id: 'funnel-opps', val: m.qualifiedOpps, countText: m.qualifiedOpps.toFixed(1), pct: (m.qualifiedOpps / Math.max(1, m.prospects)) * 100 },
      { id: 'funnel-customers', val: m.expectedCustomers, countText: m.expectedCustomers.toFixed(2), pct: (m.expectedCustomers / Math.max(1, m.prospects)) * 100 }
    ];

    stages.forEach(st => {
      const bar = document.getElementById(`${st.id}-bar`);
      const countEl = document.getElementById(`${st.id}-count`);

      if (bar) {
        // Visual width clamped with a minimum of 4% so it's always visible
        const clampedWidth = Math.min(100, Math.max(4, st.pct));
        bar.style.width = `${clampedWidth}%`;
      }
      if (countEl) {
        countEl.textContent = st.countText;
      }
    });
  }

  // Render Scenario Matrix
  renderScenarioComparison(current, active) {
    const elMatrixCurrentPip = document.getElementById('matrix-current-pip');
    const elMatrixCurrentBook = document.getElementById('matrix-current-book');
    const elMatrixCurrentCust = document.getElementById('matrix-current-cust');

    const elMatrixActivePip = document.getElementById('matrix-active-pip');
    const elMatrixActiveBook = document.getElementById('matrix-active-book');
    const elMatrixActiveCust = document.getElementById('matrix-active-cust');

    const elMatrixDeltaPip = document.getElementById('matrix-delta-pip');
    const elMatrixDeltaBook = document.getElementById('matrix-delta-book');

    if (elMatrixCurrentPip) elMatrixCurrentPip.textContent = this.formatCurrency(current.monthlyPipeline);
    if (elMatrixCurrentBook) elMatrixCurrentBook.textContent = this.formatCurrency(current.monthlyBookings);
    if (elMatrixCurrentCust) elMatrixCurrentCust.textContent = `${current.expectedCustomers.toFixed(2)} / mo`;

    if (elMatrixActivePip) elMatrixActivePip.textContent = this.formatCurrency(active.monthlyPipeline);
    if (elMatrixActiveBook) elMatrixActiveBook.textContent = this.formatCurrency(active.monthlyBookings);
    if (elMatrixActiveCust) elMatrixActiveCust.textContent = `${active.expectedCustomers.toFixed(2)} / mo`;

    if (elMatrixDeltaPip) {
      const dPip = active.monthlyPipeline - current.monthlyPipeline;
      elMatrixDeltaPip.textContent = dPip >= 0 ? `+${this.formatCurrency(dPip)}` : `-${this.formatCurrency(Math.abs(dPip))}`;
      elMatrixDeltaPip.className = dPip >= 0 ? 'text-green-bold' : 'text-red-bold';
    }

    if (elMatrixDeltaBook) {
      const dBook = active.monthlyBookings - current.monthlyBookings;
      elMatrixDeltaBook.textContent = dBook >= 0 ? `+${this.formatCurrency(dBook)}` : `-${this.formatCurrency(Math.abs(dBook))}`;
      elMatrixDeltaBook.className = dBook >= 0 ? 'text-green-bold' : 'text-red-bold';
    }
  }

  // 10. Rule-Based Personalized Recommendations
  generateRecommendations() {
    const listEl = document.getElementById('calc-recommendations-list');
    if (!listEl) return;

    const recs = [];
    const { replyRate, bookingRate, oppRate, winRate, manualHours, prospects } = this.state;

    // Rule 1: Low Positive Reply Rate
    if (replyRate < 2.5) {
      recs.push({
        tag: 'TARGETING & BUYING SIGNALS',
        severity: 'high',
        title: 'Reply Rate Below Target Benchmark (Current: ' + replyRate.toFixed(1) + '%)',
        desc: 'Positive reply rate under 2.5% usually stems from cold static list blasting. Moving to real-time intent triggers (funding, tech installs, executive hires) and Clay waterfall enrichment typically lifts response rates by 2.5x to 4x.'
      });
    }

    // Rule 2: Booking Friction / Latency
    if (bookingRate < 25) {
      recs.push({
        tag: 'SPEED TO LEAD & CALENDAR SLA',
        severity: 'high',
        title: 'Meeting Booking Drop-Off (Current: ' + bookingRate.toFixed(0) + '%)',
        desc: 'Over 75% of interested prospects fail to book a call. Inbound reply latency is the primary culprit. Automating AI reply triage and instant personalized calendar drops eliminates delay before interest cools.'
      });
    }

    // Rule 3: Discovery Qualification Gate
    if (oppRate < 35) {
      recs.push({
        tag: 'STAGE GATE QUALIFICATION',
        severity: 'medium',
        title: 'Opportunity Conversion Slippage (Current: ' + oppRate.toFixed(0) + '%)',
        desc: 'Less than 35% of held meetings become active opportunities. SDRs may be booking unqualified demos. Implementing automated pre-call dossier enrichment and BANT/MEDDPIC stage gates protects executive selling time.'
      });
    }

    // Rule 4: Opportunity Win Rate
    if (winRate < 15) {
      recs.push({
        tag: 'PIPELINE VELOCITY',
        severity: 'medium',
        title: 'Opportunity Win Rate Sub-Optimal (Current: ' + winRate.toFixed(0) + '%)',
        desc: 'Win rate below 15% indicates deals stalling late in the cycle. Examine champion identification, multi-threading automation, and automated post-meeting objection follow-up sequences.'
      });
    }

    // Rule 5: Heavy Manual Operations Workload
    if (manualHours >= 120) {
      recs.push({
        tag: 'SYSTEMS AUTOMATION',
        severity: 'high',
        title: 'Heavy Manual Overhead (' + manualHours + ' hrs/month)',
        desc: 'Your team spends ~' + (manualHours / 4).toFixed(0) + ' hours per week on manual list research, scraping, and CRM logging. Automating these steps with self-hosted n8n pipelines directly returns capacity to direct revenue generation.'
      });
    }

    // Rule 6: Low Prospecting Scale
    if (prospects < 1000) {
      recs.push({
        tag: 'SCALE & INGRESS PIPELINE',
        severity: 'medium',
        title: 'Limited Contact Sample Size (' + prospects.toLocaleString() + ' prospects/mo)',
        desc: 'Monthly volume under 1,000 may restrict statistical learning. Implementing programmatic signal scrapers and automated lead ingestion expands pipeline coverage without sacrificing personalization.'
      });
    }

    // Fallback if all metrics are high
    if (recs.length === 0) {
      recs.push({
        tag: 'OPTIMIZED ARCHITECTURE',
        severity: 'success',
        title: 'Healthy GTM Baseline across Key Funnel Metrics',
        desc: 'Your metrics align with top-quartile performance. Next optimization tier: autonomous multi-agent reply handling and cross-system data lake enrichment to sustain efficiency at 5x volume.'
      });
    }

    // Render cards
    listEl.innerHTML = recs.map(r => `
      <div class="calc-rec-item rec-severity-${r.severity}">
        <div class="rec-badge-row">
          <span class="rec-tag">${r.tag}</span>
          <span class="rec-severity-pill ${r.severity}">${r.severity.toUpperCase()} PRIORITY</span>
        </div>
        <h4 class="rec-title">${r.title}</h4>
        <p class="rec-desc">${r.desc}</p>
      </div>
    `).join('');
  }

  // 11. Currency Formatter (Handles INR lakh commas and USD/SGD)
  formatCurrency(amount) {
    if (amount === null || isNaN(amount)) return 'N/A';
    const sym = this.currencyConfig[this.currency].symbol;

    if (this.currency === 'INR') {
      // Indian numbering format (e.g. ₹1,00,000, ₹24,50,000)
      const rounded = Math.round(amount);
      const str = rounded.toString();
      let lastThree = str.substring(str.length - 3);
      const otherNumbers = str.substring(0, str.length - 3);
      if (otherNumbers !== '') {
        lastThree = ',' + lastThree;
      }
      const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
      return `${sym}${formatted}`;
    }

    // Standard Western format for USD & SGD
    return `${sym}${Math.round(amount).toLocaleString('en-US')}`;
  }
}
