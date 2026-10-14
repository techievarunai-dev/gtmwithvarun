export const CASE_STUDIES = {
  'us-insurance-outbound-system': {
    id: 'us-insurance-outbound-system',
    index: 1,
    title: 'US Insurance Outbound System',
    type: 'SANDBOX PROTOTYPE · EUBRICS CHALLENGE',
    runtime: '24 MIN WALKTHROUGH',
    badge: 'PROTOTYPE',
    projectContext: 'Assessment Challenge (Eubrics) · Verified Sandbox Prototype',
    tagline: 'Automated ABM outbound operating system with prospect qualification, n8n sequencing, and AI reply handling.',
    client: 'Assessment Challenge (Eubrics)',
    timeline: 'Verified Sandbox Prototype',
    image: '/assets/case-studies/us-insurance-outbound-system/hero-workflow-1.png',
    imageAlt: 'US Insurance Outbound System — Workflow 1: Insurance Prospecting & List Build in n8n',
    isGenuine: true,
    evidenceType: 'AUTHENTIC_PRODUCTION_WORKFLOW',
    primaryMetric: '4 Workflows · 0 Errors',
    metricSubtitle: 'Deterministic state progression & SLA alerting',
    tags: ['n8n', 'Apollo', 'Google Sheets', 'Gmail', 'AI / LLM', 'JavaScript', 'REST APIs'],
    searchIntent: 'Automated B2B outbound workflows, deterministic state machines, and AI reply classification.',
    targetAudience: 'Heads of Sales, Outbound Growth Leaders, and RevOps Engineers evaluating account-based automation.',
    evidenceGallery: [
      {
        id: 'wf1',
        label: 'WF1: Prospecting & ICP Gate',
        title: 'Workflow 1 — Insurance Prospecting & List Build',
        image: '/assets/case-studies/us-insurance-outbound-system/hero-workflow-1.png',
        alt: 'n8n Canvas: Workflow 1 Prospect Ingestion & ICP Qualification',
        tag: 'GENUINE n8n WORKFLOW',
        desc: 'Daily trigger fetches verified commercial insurance leaders, evaluates headcount and licensing through an ICP Acceptance Gate, deduplicates contacts, and prepares sequence queues.'
      },
      {
        id: 'wf2',
        label: 'WF2: Sequence Engine',
        title: 'Workflow 2 — Insurance Outbound Sequence Engine',
        image: '/assets/case-studies/us-insurance-outbound-system/workflow-2-sequence-engine.png',
        alt: 'n8n Canvas: Workflow 2 Outbound Sequence Engine with Gmail dispatch',
        tag: 'GENUINE n8n WORKFLOW',
        desc: 'Loads due contacts and templates, validates recipient status, iterates contacts one-by-one, dynamically personalizes content, dispatches via Gmail, and updates individual touch status.'
      },
      {
        id: 'wf3',
        label: 'WF3: AI Reply Handling',
        title: 'Workflow 3 — Reply Classification & Response Handling',
        image: '/assets/case-studies/us-insurance-outbound-system/workflow-3-reply-classification.png',
        alt: 'n8n Canvas: Workflow 3 AI Reply Classification and Branching',
        tag: 'GENUINE n8n WORKFLOW',
        desc: 'Monitors Gmail replies via webhook, classifies intent across 4 deterministic branches (Positive, Negative, Out of Office, Bounce), extracts alternate contacts or return dates, and schedules next steps.'
      },
      {
        id: 'wf4',
        label: 'WF4: Campaign Analytics & SLA',
        title: 'Workflow 4 — Campaign Analytics & SLA Engine',
        image: '/assets/case-studies/us-insurance-outbound-system/workflow-4-analytics-sla.png',
        alt: 'n8n Canvas: Workflow 4 Campaign Analytics & SLA calculation',
        tag: 'GENUINE n8n WORKFLOW',
        desc: 'Daily analytics aggregation pulling campaign contacts and SLA rules, evaluating operational delivery rates, and updating real-time telemetry tables.'
      },
      {
        id: 'state-store',
        label: 'Deterministic State Store',
        title: 'Google Sheets Single Source of Truth — Real Prospects Data',
        image: '/assets/case-studies/us-insurance-outbound-system/prospects-state-store.png',
        alt: 'Google Sheets Prospect State Store with ICP fit, employee counts, and personalization signals',
        tag: 'REAL PROJECT DATA',
        desc: 'Structured state table with columns for Company Name (Kemper, Goosehead, Arch Insurance), Headcount, Verified Email, Account Tier, ICP Fit, 0-100 Score, and dynamic Personalization Signals.'
      },
      {
        id: 'campaign-contacts',
        label: 'Campaign Contacts & Status',
        title: 'Campaign Contacts Tracking & Reply Progression',
        image: '/assets/case-studies/us-insurance-outbound-system/campaign-contacts.png',
        alt: 'Live Campaign Contacts Table with Sequence Status and Next Touch Dates',
        tag: 'REAL PROJECT DATA',
        desc: 'Live tracking of enrolled contacts, sequence steps (Day 1, 3, 6, 10), sent timestamps, next touch schedules, and recorded positive reply outcomes.'
      },
      {
        id: 'email-templates',
        label: 'Outbound Email Cadence',
        title: 'Multi-Touch Outbound Email Templates & Personalization Variables',
        image: '/assets/case-studies/us-insurance-outbound-system/email-templates.png',
        alt: 'Outbound Email Templates Table with Subject Lines and Personalization Signals',
        tag: 'VERIFIED CADENCE',
        desc: 'Four-step staggered email sequence designed for insurance leaders: Problem + Relevance (Day 1), Account-Specific Personalization (Day 3), Social Proof (Day 6), and Close the Loop (Day 10).'
      },
      {
        id: 'sla-definitions',
        label: 'SLA Matrix & Rules',
        title: 'Operational SLA Matrix & Escalation Rules',
        image: '/assets/case-studies/us-insurance-outbound-system/sla-definitions.png',
        alt: 'Operational SLA Matrix defining response targets, owners, and underperforming actions',
        tag: 'OPERATIONAL PROTOCOL',
        desc: 'Strict performance thresholds for outreach (100%), follow-up (95%), positive reply handoff (<4 business hours), negative reply suppression (100%), and bounced email handling.'
      }
    ],
    problem: {
      headline: 'The Problem: Manual Prospect Qualification & Reply Latency',
      lead: 'Outbound operations in commercial insurance often suffer from slow response times, fragmented qualification criteria, and manual CRM entry bottlenecks.',
      points: [
        'Manual prospect vetting took SDRs 15+ minutes per account, leading to low outbound velocity.',
        'Reply handling was ad-hoc with positive leads waiting up to 48 hours for qualification and calendar booking.',
        'High rate of email bounces and uncoordinated multi-touch touches caused domain reputation risks.'
      ]
    },
    solution: {
      headline: 'The Engineered Solution: 4-Workflow Deterministic Architecture',
      lead: 'Architected a resilient 4-workflow system in n8n featuring strict schema validation, state-driven progression, and AI-powered reply triage.',
      workflows: [
        {
          name: 'Workflow 1: Insurance Prospecting & List Build',
          desc: 'Apollo API queries pull verified commercial insurance decision-makers, evaluating employee headcount, revenue, and state licensing through an ICP Acceptance Gate.'
        },
        {
          name: 'Workflow 2: Insurance Outbound Sequence Engine',
          desc: 'Iterates contacts one-by-one with strict idempotency, merges dynamic personalization variables, and dispatches multi-touch emails via Gmail.'
        },
        {
          name: 'Workflow 3: Reply Classification & Response Handling',
          desc: 'OpenAI GPT-4o analyzes incoming reply sentiment (Positive / Negative / Out of Office / Bounce), extracts alternate contacts or return dates, and schedules immediate actions.'
        },
        {
          name: 'Workflow 4: Campaign Analytics & SLA Engine',
          desc: 'Combines real-time contact events with SLA definitions, calculating response rates, bounce prevention, and SLA compliance scores.'
        }
      ]
    },
    techStack: [
      { name: 'n8n', role: 'Workflow Orchestration & Node Logic' },
      { name: 'Apollo API', role: 'B2B Prospect Sourcing & Verification' },
      { name: 'Google Sheets', role: 'Deterministic State Store & Idempotency' },
      { name: 'OpenAI GPT-4o', role: 'Semantic Reply Classification & Intent Triage' },
      { name: 'Gmail / SMTP', role: 'Rate-Limited Email Dispatch' },
      { name: 'JavaScript', role: 'Custom Code Function Nodes & Payload Formatting' }
    ],
    outcomes: [
      { num: '4', label: 'Automated n8n Workflows Engineered' },
      { num: '100%', label: 'Deterministic State Machine Reliability' },
      { num: '<3m', label: 'Reply SLA Notification Speed' },
      { num: '0', label: 'Duplicate Email Send Incidents' }
    ],
    limitations: [
      'Built as an interview challenge / sandbox prototype using Google Sheets as the state store; enterprise deployments with >50,000 active prospects require PostgreSQL or Supabase for high-throughput locking.',
      'Single-inbox Gmail dispatch is suited for controlled account-based batches (<50 sends/day); production volume requires distributed secondary inbox pools with warmup management (e.g. Smartlead or Instantly).',
      'AI sentiment triage uses temperature=0 and JSON schema validation, but ambiguous edge cases (e.g. conditional interest depending on pricing) are routed to a human SDR review queue.'
    ],
    faq: [
      {
        question: 'How do you build an ABM outbound workflow with n8n and Apollo?',
        answer: 'You connect Apollo API query nodes to fetch ICP-qualified commercial insurance leaders filtered by company headcount, revenue, and state licensing. n8n normalizes the payload, runs deduplication against the central state store, and enrolls approved contacts into the sequence queue.'
      },
      {
        question: 'How does AI classify sales email replies (positive, negative, bounce, OOO)?',
        answer: 'Incoming replies trigger a webhook in n8n, which extracts the email body, strips signatures, and passes the text to OpenAI GPT-4o with strict schema enforcement. The model categorizes intent into Positive (triggers SDR Slack alert), Negative (updates suppression list), Out of Office (snoozes sequence until return date), or Bounce (flags invalid email in CRM).'
      },
      {
        question: 'Why use a deterministic state machine instead of basic marketing automation?',
        answer: 'Basic email sequences lack fine-grained state control, leading to duplicate sends when multiple triggers overlap. A deterministic state machine checks contact status, step count, and suppression tags prior to every dispatch, guaranteeing idempotency and preventing reputational damage.'
      },
      {
        question: 'How do you prevent duplicate email touches in an automated sequence?',
        answer: 'Each contact record possesses an immutable primary key (email + company domain) and a current step index. Before dispatching any email, Workflow 2 verifies that the previous touch timestamp is older than the required cadence delay and that no reply event has been recorded.'
      },
      {
        question: 'What are the essential SLAs for managing sales email replies?',
        answer: 'Key operational SLAs include: positive reply notification to sales rep in under 4 minutes, negative suppression applied across all sequence tracks in 100% of cases, and out-of-office return dates automatically rescheduled without manual human rescheduling.'
      },
      {
        question: 'How can Google Sheets maintain state for outbound workflow automation prototypes?',
        answer: 'In this sandbox prototype, Google Sheets serves as a transparent, auditable relational store with sheets for Prospects, Campaign Contacts, Email Templates, and SLA Rules. n8n reads and writes via structured row lookups, providing full auditability without complex database setup.'
      }
    ],
    relatedProjects: [
      { id: 'gtm-intelligence-hub', title: 'AI-Powered GTM Intelligence Hub', note: 'Supplies real-time buying signals to prioritize outbound accounts.' },
      { id: 'outbound-gtm-audit', title: 'Strategic Outbound GTM Audit', note: 'Provides the diagnostic framework and deliverability hygiene rules.' }
    ],
    nextId: 'gtm-intelligence-hub',
    prevId: 'candidate-screening'
  },

  'gtm-intelligence-hub': {
    id: 'gtm-intelligence-hub',
    index: 2,
    title: 'AI-Powered GTM Intelligence Hub',
    type: 'PERSONAL PROJECT · R&D',
    runtime: '13 MIN WALKTHROUGH',
    badge: 'PERSONAL PROJECT',
    projectContext: 'Internal R&D Framework · Personal Project (Open Architecture)',
    tagline: 'Continuous monitoring of buying signals, AI-driven CRM audit, and automated deal health scoring.',
    client: 'Internal R&D / Open Framework',
    timeline: 'Continuous Production Deployment',
    image: '/assets/case-studies/gtm-intelligence-hub/hero-dashboard.png',
    imageAlt: 'GTM Intelligence Hub — Operations Dashboard: Deal & Account Health Monitor in Airtable',
    isGenuine: true,
    evidenceType: 'AUTHENTIC_SYSTEM_DASHBOARD',
    video: {
      src: '/assets/case-studies/gtm-intelligence-hub/gtm-hub-walkthrough.mp4',
      poster: '/assets/case-studies/gtm-intelligence-hub/video-poster.jpg',
      duration: '13m 42s',
      title: 'AI-Powered GTM Intelligence Hub — Complete Architecture Walkthrough',
      isGenuine: true
    },
    primaryMetric: '94/100 Intent Score',
    metricSubtitle: 'Real-time buying signal enrichment in 118ms',
    tags: ['n8n', 'OpenAI GPT-4', 'Clay', 'HubSpot', 'Slack', 'Airtable', 'Webhooks', 'REST APIs'],
    searchIntent: 'AI-powered GTM intelligence, buying-signal automation, and account prioritization.',
    targetAudience: 'Growth Leaders, Founders, and RevOps Architects looking to replace static cold lists with event-driven signals.',
    evidenceGallery: [
      {
        id: 'dashboard',
        label: 'Operations Dashboard',
        title: 'Deal & Account Health Monitor — Live Airtable Interface',
        image: '/assets/case-studies/gtm-intelligence-hub/hero-dashboard.png',
        alt: 'Airtable Operations Dashboard showing Deal & Account Health Monitor, health scores, and renewal dates',
        tag: 'GENUINE LIVE INTERFACE',
        desc: 'Centralized GTM Operations Dashboard tracking Revenue & Health Risk, Stalled Pipelines, Account Renewal Dates (PixelCraft Studios, UrbanEdge Realty), and priority action items.'
      },
      {
        id: 'wf1',
        label: 'WF1: CRM Health Audit',
        title: 'Workflow 1 — CRM Health Audit Agent (n8n)',
        image: '/assets/case-studies/gtm-intelligence-hub/workflow-crm-health-audit.png',
        alt: 'n8n Canvas: Workflow 1 CRM Health Audit Agent with data normalization and rule engine',
        tag: 'GENUINE n8n WORKFLOW',
        desc: 'Daily CRM sync fetches companies, contacts, and deals from Airtable, normalizes records, generates a unified CRM summary, and evaluates missing fields, duplicates, and stage bottlenecks.'
      },
      {
        id: 'wf2',
        label: 'WF2: AI Sales Coach',
        title: 'Workflow 2 — AI Sales Coach Agent (n8n)',
        image: '/assets/case-studies/gtm-intelligence-hub/workflow-ai-sales-coach.png',
        alt: 'n8n Canvas: Workflow 2 AI Sales Coach Agent with OpenRouter LLM model and structured parser',
        tag: 'GENUINE n8n WORKFLOW',
        desc: 'Autonomous AI Sales Coach powered by OpenRouter LLM models and structured JSON parsers, analyzing every active deal for sales risk, next best action, and strategic positioning.'
      },
      {
        id: 'ai-recomm',
        label: 'AI Recommendations',
        title: 'AI Recommendations & Strategic Action Queue',
        image: '/assets/case-studies/gtm-intelligence-hub/ai-recommendations.png',
        alt: 'Structured AI Recommendations table in Airtable with deal issues, priority, and next actions',
        tag: 'REAL SYSTEM OUTPUT',
        desc: 'Structured database of AI Sales Coach and CRM Health Audit findings, categorizing issues by priority (High, Medium) with actionable deal recovery recommendations.'
      }
    ],
    problem: {
      headline: 'The Problem: Cold Outreach Without Active Buying Signals',
      lead: 'Generic outbound spray-and-pray generates abysmal 1-2% response rates because reps reach out without contextual timing or intent data.',
      points: [
        'Reps spent 60% of their workday searching LinkedIn and job boards for intent triggers.',
        'HubSpot CRM records lacked dynamic technographic data and buying velocity indicators.',
        'High-value signals (e.g., VP Sales hire, RFP launch) were detected days or weeks too late.'
      ]
    },
    solution: {
      headline: 'The Engineered Solution: Signal Listener + Multi-Provider Enrichment',
      lead: 'Built an autonomous pipeline that listens for live signals, scores intent with GPT-4, enriches account context via Clay, and pushes enriched records straight to HubSpot and Slack.',
      workflows: [
        {
          name: 'Signal Ingress & Event Detection',
          desc: 'Webhooks and API pollers monitor hiring announcements, tech stack changes, and funding events across target accounts.'
        },
        {
          name: 'OpenAI Intent Scoring Node',
          desc: 'Custom system prompt evaluates account-to-ICP fit, urgency, and budget authority, generating an objective 0-100 score.'
        },
        {
          name: 'Clay Multi-Provider Enrichment',
          desc: 'Cascades data across Clearbit, Apollo, and LinkedIn to enrich company size, tech stack, and executive contact emails.'
        },
        {
          name: 'HubSpot Upsert & Slack Alert',
          desc: 'Updates CRM records in 118ms and sends an urgent dossier to SDR Slack channels with personalized opening angles.'
        }
      ]
    },
    techStack: [
      { name: 'n8n', role: 'Event-Driven Workflow Automation' },
      { name: 'Clay', role: 'Multi-Source Data Waterfall & Enrichment' },
      { name: 'OpenAI GPT-4', role: 'Intent Reasoning & Score Normalization' },
      { name: 'HubSpot CRM', role: 'Automated Contact & Company Upsert' },
      { name: 'Airtable', role: 'GTM Command Center & Health Monitor' },
      { name: 'Slack API', role: 'Urgent Signal Dispatch & SLA Notification' }
    ],
    outcomes: [
      { num: '94%', label: 'Intent Classification Accuracy' },
      { num: '118ms', label: 'Average CRM Enrichment Sync Speed' },
      { num: '15h', label: 'Manual Account Research Saved / Wk' },
      { num: '3.8x', label: 'Outbound Meeting Conversion Lift' }
    ],
    limitations: [
      'This architecture was built and deployed as a personal R&D framework; it demonstrates technical capability and open architecture patterns rather than a third-party enterprise engagement.',
      'Signal freshness has an operational half-life of 5–7 business days; outreach must occur promptly before the trigger is commoditized by competitor tools.',
      'API credit consumption in Clay and OpenAI must be capped with domain deduplication caches to prevent runaway enrichment costs on broad signal sweeps.'
    ],
    faq: [
      {
        question: 'How can AI identify and score B2B buying signals in real time?',
        answer: 'The system uses webhooks and scheduled pollers to ingest signals such as job postings, leadership changes, and funding rounds. OpenAI GPT-4 evaluates the raw event against an ICP rubric, scoring relevance, budget authority, and timing urgency on a normalized 0–100 scale.'
      },
      {
        question: 'How do you build an automated account research pipeline using n8n and Clay?',
        answer: 'n8n acts as the primary orchestrator that catches signals and passes target domains to Clay’s enrichment waterfall. Clay queries multiple data providers (Apollo, Clearbit, LinkedIn) to extract verified decision-makers, tech stack, and headcount, returning a structured JSON payload to n8n.'
      },
      {
        question: 'What is the difference between static prospect lists and event-driven outbound?',
        answer: 'Static prospect lists go stale within 60–90 days and produce low response rates (1–2%) because outreach lacks context. Event-driven outbound triggers immediately when a high-intent event occurs (e.g. new VP of Sales hired), creating timely, relevant outreach that converts significantly higher.'
      },
      {
        question: 'How does OpenAI evaluate account-to-ICP fit without hallucinations?',
        answer: 'The model prompt uses strict temperature=0 settings, structured JSON Schema constraints, and explicit negative scoring rules. The LLM is provided only verified enrichment parameters (headcount, revenue, industry code) and must output a numeric breakdown explaining its score.'
      },
      {
        question: 'How do you connect Clay, HubSpot, and Slack in a GTM automation workflow?',
        answer: 'Once Clay finishes enriching an account, n8n receives the payload, executes an upsert against HubSpot CRM (matching by company domain to prevent duplicates), and simultaneously constructs a rich Slack Block Kit message sent to the #gtm-signals channel with talking points.'
      },
      {
        question: 'Why is GTM intelligence crucial for modern revenue operations (RevOps)?',
        answer: 'GTM intelligence bridges the gap between sales and marketing data, eliminating manual research waste, preventing CRM decay, and directing sales reps to accounts with active buying intent rather than cold databases.'
      }
    ],
    relatedProjects: [
      { id: 'lead-response-os', title: 'Deterministic Lead Response OS', note: 'Applies deterministic validation and rapid triage to inbound lead streams.' },
      { id: 'us-insurance-outbound-system', title: 'US Insurance Outbound System', note: 'Orchestrates multi-touch cadences using enriched prospect data.' }
    ],
    nextId: 'lead-response-os',
    prevId: 'us-insurance-outbound-system'
  },

  'lead-response-os': {
    id: 'lead-response-os',
    index: 3,
    title: 'Deterministic Lead Response OS',
    type: 'CLIENT ENGAGEMENT · ROMANIA',
    runtime: '2 MIN WALKTHROUGH',
    badge: 'CLIENT ENGAGEMENT',
    projectContext: 'Verified Client Engagement (Nicolae Ionescu, B2B SaaS, Romania)',
    tagline: 'Reduced inbound speed-to-lead from 4 hours to under 3 minutes with 28 hours/week saved.',
    client: 'Nicolae Ionescu (B2B SaaS)',
    timeline: 'Production Deployed · Global Review',
    image: '/assets/case-studies/lead-response-os/hero-workflow.png',
    imageAlt: 'Lead Response OS — Authentic 4-Stage n8n Production Architecture Canvas',
    isGenuine: true,
    evidenceType: 'AUTHENTIC_PRODUCTION_WORKFLOW',
    primaryMetric: '4h → <3m SLA',
    metricSubtitle: '28 hours/week freed for revenue reps',
    tags: ['n8n', 'HubSpot', 'Clay', 'OpenAI', 'Webhooks', 'JSON Schema', 'Slack', 'Jotform'],
    searchIntent: 'AI lead-response and inbound qualification automation with n8n, Clay, and HubSpot.',
    targetAudience: 'B2B SaaS Founders, Revenue Leaders, and Sales Operations Managers suffering from slow inbound response times.',
    evidenceGallery: [
      {
        id: 'full-workflow',
        label: 'Production Workflow Canvas',
        title: 'End-to-End n8n Production Workflow Canvas',
        image: '/assets/case-studies/lead-response-os/hero-workflow.png',
        alt: 'Full n8n Workflow Canvas showing Lead Intake, AI Lead Intelligence, CRM Enrichment, and Slack Notifications',
        tag: 'GENUINE n8n WORKFLOW',
        desc: 'Complete production pipeline: Lead Intake (Jotform webhook) → AI Lead Intelligence (Dual agents for Lead Qualification & Company Intelligence) → CRM Enrichment (HubSpot API upsert) → Instant Slack Triage & Airtable logging.'
      }
    ],
    problem: {
      headline: 'The Problem: Inbound Lead Stagnation & 4-Hour Response Delay',
      lead: 'Inbound demo requests took an average of 4 hours to be processed by human reps, leading to cold buyer enthusiasm and missed revenue opportunities.',
      points: [
        'Form submissions sat in an inbox waiting for manual SDR review and CRM entry.',
        'High-value enterprise leads were treated with the same priority as low-intent students.',
        'Rep research across LinkedIn, website, and tech stack consumed 28 hours per week.'
      ]
    },
    solution: {
      headline: 'The Engineered Solution: Flight-Critical Deterministic Lead Ingress',
      lead: 'Engineered an avionics-inspired deterministic pipeline that validates payload schemas, enriches company data, routes tier-1 opportunities, and alerts sales in under 3 minutes.',
      workflows: [
        {
          name: 'Schema Validation & Webhook Ingress',
          desc: 'Payload validated against JSON schema in 38ms; malformed submissions are sanitized with 0 pipeline crashes.'
        },
        {
          name: 'Instant Clay Waterfall Enrichment',
          desc: 'Enriches headcount, company revenue, funding tier, and buyer role before the rep opens the notification.'
        },
        {
          name: 'HubSpot CRM Bi-Directional Upsert',
          desc: 'Creates contact and opportunity records with custom telemetry tags and attribution data.'
        },
        {
          name: 'Urgent Slack Triage with 3-Min SLA Timer',
          desc: 'Sends rich card to #gtm-inbound-urgent with direct calendar links, dialing prep, and countdown timer.'
        }
      ]
    },
    techStack: [
      { name: 'n8n', role: 'Deterministic Workflow Engine' },
      { name: 'HubSpot CRM', role: 'Central Records & Deal Pipeline' },
      { name: 'Clay', role: 'Real-Time Enrichment Waterfall' },
      { name: 'OpenAI GPT-4o', role: 'Account Fit Categorization' },
      { name: 'Slack Webhooks', role: 'Instant Rep Notification & Timer SLA' }
    ],
    outcomes: [
      { num: '<3m', label: 'Speed-to-Lead Response SLA' },
      { num: '28h', label: 'Hours/Wk Freed for Revenue Reps' },
      { num: '100%', label: 'Pipeline Inbound Schema Integrity' },
      { num: '5★', label: 'Verified Client Rating (Nicolae Ionescu)' }
    ],
    testimonial: {
      quote: 'Varun engineered a deterministic lead response operating system that completely transformed our speed-to-lead. What used to take hours now executes in seconds with flawless reliability.',
      author: 'Nicolae Ionescu',
      title: 'Founder & Revenue Leader, Romania',
      role: 'Founder & Revenue Leader (Romania)'
    },
    limitations: [
      'Enrichment hit rate depends on email provider type; personal webmail domains (gmail.com, yahoo.com) require secondary company extraction or manual rep prompts.',
      'HubSpot API limits must be managed with batch queueing if sudden lead influxes occur (e.g. webinar broadcasts).',
      'The 28 hours/week savings and 4-hour to <3-minute reduction were measured over the client’s inbound baseline volume; results vary based on team size and qualification criteria.'
    ],
    faq: [
      {
        question: 'How does an AI-powered inbound lead response workflow work in n8n?',
        answer: 'When a prospect submits a demo request, a webhook delivers the raw data to n8n in under 40ms. The workflow validates the payload schema, invokes Clay for company and contact enrichment, prompts OpenAI to classify buyer intent, upserts the record into HubSpot, and triggers an urgent Slack alert with a 3-minute SLA timer.'
      },
      {
        question: 'How can Clay enrich inbound leads before CRM synchronization?',
        answer: 'Clay uses waterfall enrichment across multiple providers (Clearbit, Apollo, LinkedIn) to find company size, annual revenue, tech stack, and LinkedIn profile URLs. This data is merged into a unified object before touching the CRM, ensuring zero incomplete records enter HubSpot.'
      },
      {
        question: 'How do you validate inbound lead data payloads to prevent pipeline crashes?',
        answer: 'An avionics-inspired JSON Schema validator checks incoming fields (email format, company domain, required fields) at the webhook entry node. Any malformed payload is intercepted, sanitized, and logged to a dead-letter queue, preventing pipeline halts.'
      },
      {
        question: 'How does automated speed-to-lead impact B2B sales conversion rates?',
        answer: 'Research indicates that responding to an inbound inquiry within 5 minutes increases conversion rates by up to 8x compared to waiting 30 minutes. Automated qualification ensures reps reach high-intent buyers while their attention is highest.'
      },
      {
        question: 'What happens when an inbound enrichment API or webhook fails?',
        answer: 'The system implements exponential backoff retry nodes and a dead-letter queue in Airtable. If an enrichment endpoint times out, the workflow falls back to basic domain extraction, creates the HubSpot record, and alerts the SDR with a partial enrichment notice.'
      },
      {
        question: 'How do you automate lead routing and sales rep alerts in HubSpot and Slack?',
        answer: 'n8n determines account tier using ICP scoring rules. Tier-1 enterprise leads trigger high-priority Slack notifications in #gtm-inbound-urgent with rep @mentions, one-click calendar booking links, and a 3-minute response timer, while lower-tier leads receive automated nurturing.'
      }
    ],
    relatedProjects: [
      { id: 'gtm-intelligence-hub', title: 'AI-Powered GTM Intelligence Hub', note: 'Provides deep buying signals and account health monitoring.' },
      { id: 'newsletter-automation', title: 'Autonomous AI Newsletter Operations', note: 'Shares the same event-driven n8n infrastructure and webhook architecture.' }
    ],
    nextId: 'newsletter-automation',
    prevId: 'gtm-intelligence-hub'
  },

  'newsletter-automation': {
    id: 'newsletter-automation',
    index: 4,
    title: 'Autonomous AI Newsletter Operations',
    type: 'CLIENT ENGAGEMENT · SINGAPORE',
    runtime: 'WALKTHROUGH READY',
    badge: 'CLIENT ENGAGEMENT',
    projectContext: 'Verified Client Engagement (Ivanna Dela Torre, Head of Content, Digital Media, Singapore)',
    tagline: 'Automated newsletter research, curation, and staging with AI-powered editorial operations.',
    client: 'Ivanna Dela Torre (Digital Media)',
    timeline: 'Weekly Production Pipeline',
    image: '/assets/case-studies/newsletter-automation/hero-workflow.png',
    imageAlt: 'Content & Newsletter Automation — Authentic System Architecture & Node Pipeline',
    isGenuine: true,
    evidenceType: 'AUTHENTIC_SYSTEM_ARCHITECTURE',
    primaryMetric: '6 hrs/wk freed',
    metricSubtitle: '100% on-time weekly publishing cadence',
    tags: ['Beehiiv', 'n8n', 'OpenAI', 'Buffer', 'Google Sheets', 'RSS Parsing', 'REST APIs'],
    searchIntent: 'AI newsletter workflow automation, content curation, and CMS auto-staging.',
    targetAudience: 'Media Companies, Publication Editors, and Content Marketing Teams looking to automate research and staging.',
    evidenceGallery: [
      {
        id: 'newsletter-arch',
        label: 'System Architecture Blueprint',
        title: 'Content & Newsletter Automation — Singapore Client Architecture',
        image: '/assets/case-studies/newsletter-automation/hero-workflow.png',
        alt: 'Detailed n8n workflow architecture diagram for automated Beehiiv newsletter production',
        tag: 'CLIENT PRODUCTION ARCHITECTURE',
        desc: 'Comprehensive diagram showing Schedule Trigger/RSS Feed, Google Sheets topic ingestion, SerpAPI web search, GPT-4 summarization, dual-branch brand voice refinement (Newsletter HTML vs Buffer social summaries), and editor review alerts.'
      }
    ],
    problem: {
      headline: 'The Problem: Manual Content Curation Consuming 8-10 Hours Weekly',
      lead: 'Producing a high-quality weekly industry publication required tedious manual scanning of 50+ sources, manual summarization, and repetitive CMS staging.',
      points: [
        'Scanning newsletters, tech blogs, and Twitter consumed entire working days.',
        'Formatting and styling content in Beehiiv was error-prone and time-consuming.',
        'Editorial fatigue threatened consistent weekly publishing deadlines.'
      ]
    },
    solution: {
      headline: 'The Engineered Solution: Autonomous Research, AI Drafting & Beehiiv Staging',
      lead: 'Developed an end-to-end editorial pipeline that ingests RSS feeds, categorizes stories using customized OpenAI prompt chains, and drafts formatted editions directly in Beehiiv.',
      workflows: [
        {
          name: 'Multi-Source Content Aggregation',
          desc: 'Parses 40+ RSS feeds, newsletters, and Reddit discussions on automated 6-hour cron intervals.'
        },
        {
          name: 'AI Summarization & Style Alignment',
          desc: 'OpenAI GPT-4 evaluates story relevance, drafts punchy takeaways, and matches the publication’s signature editorial voice.'
        },
        {
          name: 'Human-in-the-Loop Review Dashboard',
          desc: 'Presents structured summaries in Notion/Airtable for single-click editorial approval.'
        },
        {
          name: 'Beehiiv CMS Auto-Staging',
          desc: 'Dispatches finalized Markdown and HTML content via Beehiiv REST API into a formatted ready-to-send draft.'
        }
      ]
    },
    techStack: [
      { name: 'n8n', role: 'Scheduled Orchestration & API Connector' },
      { name: 'Beehiiv API', role: 'Newsletter Staging & Post Management' },
      { name: 'OpenAI GPT-4', role: 'Contextual Summarization & Headline Crafting' },
      { name: 'Buffer API', role: 'Multi-Channel Social Scheduling' },
      { name: 'Google Sheets', role: 'Topic Matrix & Publishing Log' }
    ],
    outcomes: [
      { num: '6h', label: 'Editorial Hours Freed Every Week' },
      { num: '100%', label: 'On-Time Publishing Reliability' },
      { num: '40+', label: 'Automated Feeds Monitored Continuously' },
      { num: '5★', label: 'Client Feedback (Ivanna Dela Torre)' }
    ],
    testimonial: {
      quote: 'Varun automated our entire newsletter workflow from raw research to Beehiiv staging. His attention to operational reliability and tone consistency is unmatched.',
      author: 'Ivanna Dela Torre',
      title: 'Head of Content, Singapore',
      role: 'Head of Content, Digital Media (Singapore)'
    },
    limitations: [
      'The system produces staged drafts, not unmonitored auto-sends; human editors maintain final sign-off authority to uphold journalistic integrity.',
      'Reported time savings (~6 hours per week freed) were verified across the client’s editorial workflow; complex investigative issues still require manual research.',
      'RSS parsing nodes must handle feed changes, dead links, and paywalled articles with automated exception logging.'
    ],
    faq: [
      {
        question: 'How do you automate newsletter curation and drafting using n8n and OpenAI?',
        answer: 'An n8n schedule trigger polls over 40 RSS feeds and content endpoints on a regular cadence. Raw articles are normalized and processed through OpenAI GPT-4 with a specialized system prompt that summarizes key findings, matches the brand voice, and generates structured draft cards.'
      },
      {
        question: 'How does the Beehiiv REST API enable automated draft staging?',
        answer: 'Using Beehiiv’s API endpoint `/posts`, n8n programmatically uploads HTML and markdown content directly into the publication backend as a draft post, including title, subtitle, thumbnail image, and content blocks ready for editorial preview.'
      },
      {
        question: 'How do you maintain a consistent brand voice when using AI for content creation?',
        answer: 'Brand voice consistency is achieved through few-shot prompt examples, clear constraints against generic AI clichés, and explicit formatting rubrics (e.g., bulleted takeaways, bold technical terms, and punchy editorial commentary).'
      },
      {
        question: 'Why is human-in-the-loop review essential for AI-assisted editorial workflows?',
        answer: 'While AI drastically reduces curation and drafting time, human editors ensure nuanced judgment, fact-check claims, and preserve editorial reputation before any newsletter reaches subscribers.'
      },
      {
        question: 'How can media companies scale content operations without expanding headcount?',
        answer: 'By automating repetitive ingestion, drafting, and CMS staging, editors can shift their time from administrative formatting to high-value analysis and investigative journalism, effectively doubling publication output.'
      },
      {
        question: 'How do you handle RSS feed failures or broken sources in an automated pipeline?',
        answer: 'n8n utilizes try-catch error routing nodes. If a specific RSS endpoint returns a 404 or invalid XML, the error is logged to Google Sheets and bypassed without stopping the remaining 39+ feeds.'
      }
    ],
    relatedProjects: [
      { id: 'candidate-screening', title: 'AI-Assisted Candidate Screening', note: 'Applies similar LLM rubric extraction and human review patterns to hiring.' },
      { id: 'lead-response-os', title: 'Deterministic Lead Response OS', note: 'Demonstrates real-time API integrations and webhook-based workflow orchestration.' }
    ],
    nextId: 'outbound-gtm-audit',
    prevId: 'lead-response-os'
  },

  'outbound-gtm-audit': {
    id: 'outbound-gtm-audit',
    index: 5,
    title: 'Strategic Outbound GTM & Architecture Teardown',
    type: 'STRATEGIC GTM CASE STUDY',
    runtime: 'FRAMEWORK BLUEPRINT',
    badge: 'STRATEGIC GTM',
    projectContext: 'Strategic Assessment & Architecture Teardown Deliverable (Diagnostic Blueprint, not deployed code)',
    tagline: 'Comprehensive audit, deliverability diagnostic, and architectural teardown of a SaaS outbound engine.',
    client: 'Strategic Assessment & Architecture Teardown',
    timeline: 'Comprehensive Blueprint',
    image: '/assets/case-studies/outbound-gtm-audit/hero-framework.jpg',
    imageAlt: 'Strategic B2B Outbound GTM Audit Framework Blueprint',
    isGenuine: false,
    evidenceType: 'STRATEGIC_FRAMEWORK_BLUEPRINT',
    primaryMetric: '25-Page Blueprint',
    metricSubtitle: 'Full diagnostic across deliverability, data & orchestration',
    tags: ['GTM Scorecard', 'Automation Roadmap', 'System Architecture', 'Priority Matrix', 'Deliverability'],
    searchIntent: 'B2B outbound GTM audit, sales process diagnosis, and automation strategy.',
    targetAudience: 'SaaS Executives, VP Sales, and RevOps Leaders seeking an objective assessment of outbound conversion bottlenecks.',
    evidenceGallery: [
      {
        id: 'audit-framework',
        label: 'GTM Audit Framework',
        title: 'Strategic B2B Outbound GTM Audit Framework',
        image: '/assets/case-studies/outbound-gtm-audit/hero-framework.jpg',
        alt: 'Strategic Outbound GTM Audit Framework showing ICP Scorecard, Buying Signals, CRM Health, and Automation Roadmap',
        tag: 'STRATEGIC SPECIFICATION',
        desc: 'End-to-end framework evaluating ICP Fit, Digital Intent & Technographic Triggers, CRM Data Completeness (88%), Deduplication (3%), Sequence Optimization, and an Impact vs Complexity Priority Matrix.'
      }
    ],
    problem: {
      headline: 'The Problem: Declining Deliverability & Bloated GTM Tool Silos',
      lead: 'A B2B software team was burning through domains with high bounce rates, duplicate CRM records, and zero visibility into outbound conversion bottlenecks.',
      points: [
        'Domain sender reputation degraded due to unverified email lists and lack of SPF/DKIM/DMARC alignment.',
        'Data silos between Apollo, HubSpot, and sequencing tools resulted in conflicting contact ownership.',
        'Executive team lacked an objective engineering scorecard to guide revenue tech decisions.'
      ]
    },
    solution: {
      headline: 'The Engineered Solution: Full-Stack GTM Diagnostic & Modern Architecture',
      lead: 'Executed a deep technical audit evaluating deliverability health, ICP tiering, signal integration, and workflow orchestration, culminating in a prioritized execution roadmap.',
      workflows: [
        {
          name: 'Domain & Deliverability Diagnostic',
          desc: 'Audited DNS records, inbox warming protocols, and bounce thresholds to restore 99%+ inbox placement.'
        },
        {
          name: 'Data Hygiene & CRM Mapping Audit',
          desc: 'Identified duplicate fields and inconsistent lifecycle progression rules inside HubSpot.'
        },
        {
          name: 'Signal Architecture Framework',
          desc: 'Architected modern Clay + n8n waterfall to replace static list blasting with event-driven outbound.'
        },
        {
          name: 'Prioritized 90-Day Execution Roadmap',
          desc: 'Delivered an actionable engineering matrix categorized by impact, difficulty, and revenue leverage.'
        }
      ]
    },
    techStack: [
      { name: 'DNS & Deliverability Diagnostic', role: 'SPF, DKIM, DMARC & Inbox Placement Audit' },
      { name: 'GTM Scorecard Framework', role: 'Quantitative Revenue Operations Assessment' },
      { name: 'System Architecture Blueprint', role: 'Deterministic Data Flow Diagram' },
      { name: 'HubSpot CRM Audit', role: 'Field Deduplication & Lifecycle Optimization' }
    ],
    outcomes: [
      { num: '25', label: 'Pages of Comprehensive Architectural Analysis' },
      { num: '4', label: 'Critical Data Leakage Points Remediated' },
      { num: '99%', label: 'Deliverability Hygiene Benchmark Established' },
      { num: '90-Day', label: 'Actionable Engineering Implementation Roadmap' }
    ],
    limitations: [
      'This deliverable was a strategic audit, diagnostic evaluation, and architectural blueprint—not a deployed software implementation; claims of automated deployment are deliberately excluded.',
      'Outbound performance gains require executive buy-in to enforce data governance across SDR and marketing teams.',
      'Domain deliverability recovery is not instantaneous; rebuilding sender reputation requires 4 to 6 weeks of disciplined inbox warming and low-volume sending.'
    ],
    faq: [
      {
        question: 'What is included in a B2B outbound GTM audit?',
        answer: 'A comprehensive GTM audit evaluates four core pillars: technical domain deliverability (SPF/DKIM/DMARC, warmup, inbox reputation), data hygiene and CRM architecture (HubSpot deduplication, lifecycle stages), ICP and buying signal targeting, and workflow orchestration tooling.'
      },
      {
        question: 'How do you diagnose and resolve email deliverability issues (SPF, DKIM, DMARC)?',
        answer: 'Deliverability diagnosis inspects DNS records for correct SPF syntax, aligned 2048-bit DKIM keys, strict DMARC policies, and custom tracking domains. Resolving issues involves purging unverified prospect lists, configuring dedicated secondary sending domains, and implementing automated warmup pools.'
      },
      {
        question: 'How do you identify data leakage and CRM hygiene bottlenecks in HubSpot?',
        answer: 'By auditing field population completeness, property duplication, and lifecycle transition automation. Incomplete technographic data and conflicting rep ownership are identified and mapped into structured validation rules.'
      },
      {
        question: 'What is the difference between an outbound strategy audit and software implementation?',
        answer: 'An outbound audit is a strategic diagnostic deliverable that identifies systemic friction, data leakage, and technical vulnerabilities, providing a prioritized blueprint. Software implementation is the subsequent phase where automation scripts, APIs, and workflows are physically built and deployed.'
      },
      {
        question: 'How do you define an Ideal Customer Profile (ICP) for modern outbound sales?',
        answer: 'Modern ICPs go beyond firmographics (industry, headcount) to include technographic markers (current software tools), hiring signals (open roles indicating strategic priorities), and historical deal velocity from closed-won CRM records.'
      },
      {
        question: 'How should revenue teams prioritize GTM automation initiatives?',
        answer: 'Using an Impact vs. Complexity prioritization matrix. High-impact, low-complexity initiatives (such as deliverability fixes and webhook lead alerts) are executed in weeks 1–4, while complex multi-system workflows (e.g. multi-provider waterfalls) are scheduled for weeks 5–12.'
      }
    ],
    relatedProjects: [
      { id: 'us-insurance-outbound-system', title: 'US Insurance Outbound System', note: 'Represents the deterministic execution of the outbound cadence framework.' },
      { id: 'gtm-intelligence-hub', title: 'AI-Powered GTM Intelligence Hub', note: 'Provides the signal-listening engine recommended in the audit blueprint.' }
    ],
    nextId: 'candidate-screening',
    prevId: 'newsletter-automation'
  },

  'candidate-screening': {
    id: 'candidate-screening',
    index: 6,
    title: 'AI-Assisted Candidate Screening & Hiring Pipeline',
    type: 'CLIENT ENGAGEMENT · US (NAME WITHHELD)',
    runtime: 'WALKTHROUGH READY',
    badge: 'CLIENT ENGAGEMENT',
    projectContext: 'Client Engagement · US Technology Recruitment Firm (Client identity withheld under NDA)',
    tagline: 'Structured, explainable candidate evaluation across resume, HR screening, and technical interview stages.',
    client: 'US Technology Company (Name Withheld under NDA)',
    timeline: 'Production Pipeline Deployment',
    image: '/assets/case-studies/candidate-screening/hero-pipeline.png',
    imageAlt: 'AI Candidate Screening Pipeline — Authentic System Architecture Diagram',
    isGenuine: true,
    evidenceType: 'AUTHENTIC_SYSTEM_ARCHITECTURE',
    primaryMetric: '85% Screening Time Saved (Est.)',
    metricSubtitle: 'From 14-day turnaround to <24 hours',
    tags: ['n8n', 'OpenAI', 'Resume Parsing', 'Semantic Matching', 'Human-in-the-Loop', 'ATS Integration'],
    searchIntent: 'AI-assisted resume screening with human review, semantic matching, and explainable scoring.',
    targetAudience: 'Talent Acquisition Leaders, Recruitment Agencies, and Engineering Hiring Managers experiencing applicant volume overload.',
    evidenceGallery: [
      {
        id: 'candidate-arch',
        label: 'Pipeline Architecture',
        title: 'AI Candidate Screening Pipeline — US Recruitment Firm Architecture',
        image: '/assets/case-studies/candidate-screening/hero-pipeline.png',
        alt: 'Detailed n8n workflow architecture diagram for AI-assisted candidate screening pipeline',
        tag: 'CLIENT PRODUCTION ARCHITECTURE',
        desc: 'Structured 10-node pipeline: Webhook Trigger → Download File → Text Extraction (OCR) → GPT-4 JSON Parsing → Job Requirements Ingestion (Google Docs) → Rubric Comparison & 0-100 Scoring → Database Sync → Dual Alerts (Email + Slack) with scoring logic breakdown.'
      }
    ],
    problem: {
      headline: 'The Problem: Inbound Application Deluge & Inconsistent Screening',
      lead: 'Hiring teams received over 500 applications per open technical role, leading to reviewer burnout, 2-week delays, and lost top talent.',
      points: [
        'Recruiters spent 8+ hours daily manually reading PDFs and scanning resumes.',
        'Screening criteria varied wildly between individual reviewers, introducing bias.',
        'Top-tier engineering candidates accepted competing offers before first contact.'
      ]
    },
    solution: {
      headline: 'The Engineered Solution: Explainable AI Evaluation with Human-in-the-Loop',
      lead: 'Built an automated pipeline that extracts structured resume data, scores competencies against objective job rubrics, and generates human-readable justification scorecards.',
      workflows: [
        {
          name: 'Resume Ingress & Standardized Extraction',
          desc: 'Parses PDF and DOCX attachments into standardized JSON containing skills, tenure, and project achievements.'
        },
        {
          name: 'Competency Scoring Engine',
          desc: 'Evaluates candidate experience against specific technical rubrics using OpenAI GPT-4 with temperature=0 for consistency.'
        },
        {
          name: 'Explainable Justification Dossier',
          desc: 'Generates concise bullet points explaining why a candidate was scored high or low, avoiding opaque black-box decisions.'
        },
        {
          name: 'Human-in-the-Loop Recruiter Review',
          desc: 'Pushes pre-scored candidates to recruiter Slack channel for quick 1-click approval before any communication.'
        }
      ]
    },
    techStack: [
      { name: 'n8n', role: 'Workflow Orchestration & Webhook Handling' },
      { name: 'OpenAI GPT-4', role: 'Semantic Extraction & Rubric Evaluation' },
      { name: 'ATS REST APIs', role: 'Applicant Profile & Stage Management' },
      { name: 'Slack API', role: 'Human Recruiter Review Cards' }
    ],
    outcomes: [
      { num: '85%', label: 'Reduction in Manual Resume Review Time (Est.)' },
      { num: '<24h', label: 'Candidate Turnaround Time (down from 14 days)' },
      { num: '100%', label: 'Explainable Scoring Trail for Compliance' },
      { num: '0', label: 'Unreviewed Inbound Applications' }
    ],
    limitations: [
      'The system operates strictly as an assistive evaluation copilot for human recruiters; it does NOT make autonomous hiring or rejection decisions.',
      'Reported metrics (~85% review time reduction, from ~10m to ~2m per profile) represent operational estimates measured across 60-candidate screening batches, not independently verified academic studies.',
      'Multi-column resume designs and creative graphics can affect OCR parsing accuracy; an automatic fallback flag alerts human recruiters to inspect unparseable files directly.'
    ],
    faq: [
      {
        question: 'How does AI-assisted candidate screening work with n8n and OpenAI?',
        answer: 'When a candidate applies, n8n receives the resume attachment via webhook, downloads the file, and runs text extraction. OpenAI GPT-4 parses the text into standardized JSON, compares the candidate’s qualifications against an objective rubric, and generates a structured scorecard with explainable rationale.'
      },
      {
        question: 'How do you ensure AI resume screening is explainable, unbiased, and compliant?',
        answer: 'The system explicitly strips demographic indicators (such as name, gender, age, and graduation dates) before evaluation. The LLM is restricted to scoring defined technical competencies against an explicit rubric and must produce written justifications for every point awarded or deducted.'
      },
      {
        question: 'Why is human-in-the-loop review essential for AI hiring workflows?',
        answer: 'Human recruiters must retain 100% of final hiring and rejection decisions to ensure empathy, compliance with employment regulations, and contextual evaluation of non-traditional career paths.'
      },
      {
        question: 'How does semantic matching differ from basic keyword resume search?',
        answer: 'Traditional ATS keyword filters reject qualified candidates who use synonyms or different phrasing (e.g. \'Kubernetes clustering\' vs \'K8s orchestration\'). Semantic matching understands technical context and conceptual equivalence, providing a fairer evaluation.'
      },
      {
        question: 'How do you parse unstructured PDF resumes into structured JSON schemas?',
        answer: 'The workflow uses document extraction nodes to convert PDF streams to clean text, which is processed by OpenAI using structured JSON outputs (JSON mode) adhering to a strict schema for work history, skills, education, and notable projects.'
      },
      {
        question: 'What are the ethical and operational limits of AI in recruitment?',
        answer: 'AI should never be permitted to issue autonomous rejections or final hiring determinations without human sign-off. Models must be audited regularly for rubric drift, and candidates must be protected under strict data privacy and consent standards.'
      }
    ],
    relatedProjects: [
      { id: 'lead-response-os', title: 'Deterministic Lead Response OS', note: 'Uses the same avionics-grade webhook validation and rapid triage architecture.' },
      { id: 'newsletter-automation', title: 'Autonomous AI Newsletter Operations', note: 'Applies similar prompt chaining and human-in-the-loop editorial patterns.' }
    ],
    nextId: 'us-insurance-outbound-system',
    prevId: 'outbound-gtm-audit'
  }
};
