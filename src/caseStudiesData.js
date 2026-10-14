export const CASE_STUDIES = {
  'us-insurance-outbound-system': {
    id: 'us-insurance-outbound-system',
    index: 1,
    title: 'US Insurance Outbound System',
    type: 'SANDBOX PROTOTYPE · EUBRICS CHALLENGE',
    runtime: '24 MIN WALKTHROUGH',
    badge: 'PROTOTYPE',
    tagline: 'Automated ABM outbound operating system with prospect qualification, n8n sequencing, and AI reply handling.',
    client: 'Assessment Challenge (Eubrics)',
    timeline: 'Verified Sandbox Prototype',
    image: '/assets/us-insurance-system.jpg',
    imageAlt: 'US Insurance Outbound System Architecture Diagram',
    primaryMetric: '4 Workflows · 0 Errors',
    metricSubtitle: 'Deterministic state progression & SLA alerting',
    tags: ['n8n', 'Apollo', 'Google Sheets', 'Gmail', 'AI / LLM', 'JavaScript', 'REST APIs'],
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
          name: 'Workflow 1: Prospect Ingestion & ICP Qualification',
          desc: 'Apollo API queries pull verified commercial insurance decision-makers, validating employee headcount, revenue, and state licensing.'
        },
        {
          name: 'Workflow 2: Deterministic State Store (Google Sheets)',
          desc: 'Acts as the single source of truth with strict idempotent updates: if a contact is already queued or unsubscribed, next touch is suppressed.'
        },
        {
          name: 'Workflow 3: Multi-Touch Personalized Sequencing',
          desc: 'Dispatches staggered email touches via Gmail with tailored policy pain points, maintaining sub-minute delay intervals.'
        },
        {
          name: 'Workflow 4: AI Reply Classification & SLA Escalation',
          desc: 'OpenAI GPT-4o analyzes incoming reply sentiment (Positive / Objection / Unsubscribe / Out of Office) and triggers real-time alerts.'
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
    tagline: 'Prioritized high-intent outbound engine using real-time buying signals and automated enrichment.',
    client: 'Internal R&D / Open Framework',
    timeline: 'Continuous Production Deployment',
    image: '/assets/gtm-intelligence-hub.jpg',
    imageAlt: 'AI-Powered GTM Intelligence Hub Architecture Diagram',
    primaryMetric: '94/100 Intent Score',
    metricSubtitle: 'Real-time buying signal enrichment in 118ms',
    tags: ['n8n', 'OpenAI GPT-4', 'Clay', 'HubSpot', 'Slack', 'Webhooks', 'REST APIs'],
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
      { name: 'Slack API', role: 'Urgent Signal Dispatch & SLA Notification' }
    ],
    outcomes: [
      { num: '94%', label: 'Intent Classification Accuracy' },
      { num: '118ms', label: 'Average CRM Enrichment Sync Speed' },
      { num: '15h', label: 'Manual Account Research Saved / Wk' },
      { num: '3.8x', label: 'Outbound Meeting Conversion Lift' }
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
    tagline: 'Reduced inbound speed-to-lead from 4 hours to under 3 minutes with 28 hours/week saved.',
    client: 'Nicolae Ionescu (B2B SaaS)',
    timeline: 'Production Deployed · Global Review',
    image: '/assets/lead-response-os.jpg',
    imageAlt: 'Lead Response OS Architecture Diagram',
    primaryMetric: '4h → <3m SLA',
    metricSubtitle: '28 hours/week freed for revenue reps',
    tags: ['n8n', 'HubSpot', 'Clay', 'OpenAI', 'Webhooks', 'JSON Schema', 'Slack'],
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
      title: 'Founder & Revenue Leader, Romania'
    },
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
    tagline: 'Automated newsletter research, curation, and staging with AI-powered editorial operations.',
    client: 'Ivanna Dela Torre (Digital Media)',
    timeline: 'Weekly Production Production Pipeline',
    image: '/assets/newsletter-operations.jpg',
    imageAlt: 'AI Newsletter Operations Architecture Diagram',
    primaryMetric: '6 hrs/wk freed',
    metricSubtitle: '100% on-time weekly publishing cadence',
    tags: ['Beehiiv', 'n8n', 'OpenAI', 'Make', 'RSS Parsing', 'REST APIs'],
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
      { name: 'Notion / Airtable', role: 'Human-in-the-Loop Approval Queue' }
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
      title: 'Head of Content, Singapore'
    },
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
    tagline: 'Comprehensive audit, deliverability diagnostic, and architectural teardown of a SaaS outbound engine.',
    client: 'Strategic Assessment & Architecture Teardown',
    timeline: 'Comprehensive Blueprint',
    image: '/assets/outbound-gtm-audit.jpg',
    imageAlt: 'Outbound GTM Audit Architecture Diagram',
    primaryMetric: '25-Page Blueprint',
    metricSubtitle: 'Full diagnostic across deliverability, data & orchestration',
    tags: ['GTM Scorecard', 'Automation Roadmap', 'System Architecture', 'Priority Matrix', 'Deliverability'],
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
    tagline: 'Structured, explainable candidate evaluation across resume, HR screening, and technical interview stages.',
    client: 'US Technology Company (Name Withheld under NDA)',
    timeline: 'Production Pipeline Deployment',
    image: '/assets/candidate-screening.jpg',
    imageAlt: 'AI Candidate Screening Architecture Diagram',
    primaryMetric: '85% Screening Time Saved',
    metricSubtitle: 'From 14-day turnaround to <24 hours',
    tags: ['n8n', 'OpenAI', 'Resume Parsing', 'Semantic Matching', 'Human-in-the-Loop', 'ATS Integration'],
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
      { num: '85%', label: 'Reduction in Manual Resume Review Time' },
      { num: '<24h', label: 'Candidate Turnaround Time (down from 14 days)' },
      { num: '100%', label: 'Explainable Scoring Trail for Compliance' },
      { num: '0', label: 'Unreviewed Inbound Applications' }
    ],
    nextId: 'us-insurance-outbound-system',
    prevId: 'outbound-gtm-audit'
  }
};
