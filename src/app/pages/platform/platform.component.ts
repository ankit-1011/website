import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

interface IntegrationItem {
  label: string;
  iconSrc?: string;
  iconMono?: boolean;
  faIcon?: string;
  iconBg?: string;
}

interface IntegrationGroup {
  label: string;
  items: IntegrationItem[];
}

interface HeroStat {
  value: string;
  label: string;
}

interface HowItWorksStep {
  step: string;
  title: string;
  description: string;
}

interface CustomerStory {
  industry: string;
  quote: string;
  outcome: string;
}

interface TrustBadge {
  label: string;
  faIcon: string;
}

interface SectionNavItem {
  id: string;
  label: string;
}

interface Capability {
  id: string;
  title: string;
  description: string;
  preview: string;
  anchor: string;
}

const DEFAULT_TITLE =
  'DIOnce.AI - Build , Test , Deploy & Monitor AI Workflows in Under 1 Hour';

const PAGE_TITLE = 'Trustbridge Platform — Design, Govern & Audit AI Agents';

@Component({
  selector: 'app-platform',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './platform.component.html',
  styleUrl: './platform.component.scss',
})
export class PlatformComponent implements OnInit, AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private meta = inject(Meta);
  private title = inject(Title);
  private revealObserver?: IntersectionObserver;
  private sectionObserver?: IntersectionObserver;
  private scrollListener?: () => void;

  navVisible = false;
  activeSection = 'capabilities';

  heroStats: HeroStat[] = [
    { value: '20+', label: 'stack integrations' },
    { value: 'Every step', label: 'policy-checked at runtime' },
    { value: '100%', label: 'actions in audit trail' },
  ];

  howItWorks: HowItWorksStep[] = [
    {
      step: '01',
      title: 'Design',
      description:
        'Build agent workflows visually in the studio — test, debug, and ship changes without a rebuild.',
    },
    {
      step: '02',
      title: 'Govern',
      description:
        'Enforce deny-by-default policy on every action — PII scans, tool gates, and human approval where needed.',
    },
    {
      step: '03',
      title: 'Audit',
      description:
        'Query decision records with the exact policy version that fired — evidence your security team accepts.',
    },
  ];

  customerStories: CustomerStory[] = [
    {
      industry: 'Financial services',
      quote:
        'We needed to prove why an agent was allowed to act — not just that it ran. Trustbridge gave us that record on day one.',
      outcome: 'Policy layer live in 3 weeks · zero rip-and-replace',
    },
    {
      industry: 'Platform engineering',
      quote:
        'Our teams already used LangChain and OpenTelemetry. Trustbridge dropped in as the control layer without forcing a migration.',
      outcome: '4 agent workflows governed · OTel traces linked to decisions',
    },
  ];

  trustBadges: TrustBadge[] = [
    { label: 'OpenTelemetry-ready', faIcon: 'fa-solid fa-chart-line' },
    { label: 'Enterprise deployment', faIcon: 'fa-solid fa-building' },
    { label: 'SOC 2 in progress', faIcon: 'fa-solid fa-shield-halved' },
    { label: 'Deny-by-default policy', faIcon: 'fa-solid fa-lock' },
  ];

  sectionNav: SectionNavItem[] = [
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'how-it-works', label: 'How it works' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'demo', label: 'Demo' },
  ];

  capabilities: Capability[] = [
    {
      id: 'studio',
      title: 'Visual Workflow Studio',
      description:
        'Drag-and-drop design, test, and debug for complex agent workflows, no rebuild to ship a change. Reusable templates across teams.',
      preview: 'Node graph · drag-and-drop · live test run',
      anchor: '#how-it-works',
    },
    {
      id: 'orchestration',
      title: 'Multi-Agent Orchestration',
      description:
        'Coordinate agents with defined roles, shared memory, and collaboration, with policy that applies to every participant in the workflow.',
      preview: 'Role graph · shared memory · policy per agent',
      anchor: '#how-it-works',
    },
    {
      id: 'policy',
      title: 'Runtime Policy Enforcement',
      description:
        'Deny-by-default checks on every step, PII, prompt-injection and unsafe-tool scanning, applied inline before an action runs.',
      preview: 'Inline scan · block / allow / escalate',
      anchor: '#how-it-works',
    },
    {
      id: 'authority',
      title: 'Execution Authority',
      description:
        'Per-step gates, allow, block, or require human approval. Retry-safe replays and a kill switch for any agent in production.',
      preview: 'Approval gates · kill switch · safe replay',
      anchor: '#how-it-works',
    },
    {
      id: 'audit',
      title: 'Decision Records & Audit Trail',
      description:
        'A queryable account of why each action was allowed or blocked, with the exact policy version that fired. Built for evidence and review.',
      preview: 'Decision log · policy version · queryable',
      anchor: '#how-it-works',
    },
    {
      id: 'gateway',
      title: 'Governed LLM Gateway',
      description:
        'A single gateway across providers with intelligent routing and fallback. Every call is scanned and logged before it leaves your environment.',
      preview: 'Multi-provider · routing · scan before send',
      anchor: '#integrations',
    },
    {
      id: 'fallback',
      title: 'Fallback & Recovery',
      description:
        "Built-in resilience with automatic provider failover, retries, and circuit breakers, so a single dependency can't take an agent down.",
      preview: 'Failover · retries · circuit breaker',
      anchor: '#benefits',
    },
    {
      id: 'cost',
      title: 'Cost & Lifecycle Visibility',
      description:
        'Per-step cost and latency tracking with versioning, safe deploys, and rollback across the whole agent lifecycle, design to production.',
      preview: 'Cost per step · version · rollback',
      anchor: '#benefits',
    },
  ];

  duplicateMarqueeItems(items: IntegrationItem[]): IntegrationItem[] {
    const minPerHalf = 14;
    const repeats = Math.max(1, Math.ceil(minPerHalf / items.length));
    const half: IntegrationItem[] = [];
    for (let r = 0; r < repeats; r++) {
      half.push(...items);
    }
    return [...half, ...half];
  }

  marqueeDuration(group: IntegrationGroup): string {
    const unique = group.items.length;
    const seconds = Math.min(88, Math.max(44, unique * 11));
    return `${seconds}s`;
  }

  integrationGroups: IntegrationGroup[] = [
    {
      label: 'LLM Providers',
      items: [
        {
          label: 'OpenAI',
          iconSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg',
          iconMono: true,
          iconBg: 'rgba(16, 163, 127, 0.22)',
        },
        {
          label: 'Anthropic',
          iconSrc: 'https://cdn.simpleicons.org/anthropic/e8edf4',
          iconBg: 'rgba(204, 153, 102, 0.2)',
        },
        {
          label: 'Google Gemini',
          iconSrc: 'https://cdn.simpleicons.org/googlegemini/e8edf4',
          iconBg: 'rgba(66, 133, 244, 0.2)',
        },
        {
          label: 'AWS Bedrock',
          iconSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazonaws.svg',
          iconMono: true,
          iconBg: 'rgba(255, 153, 0, 0.18)',
        },
        {
          label: 'Azure OpenAI',
          iconSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoftazure.svg',
          iconMono: true,
          iconBg: 'rgba(0, 120, 212, 0.2)',
        },
        {
          label: 'Local / Ollama',
          iconSrc: 'https://cdn.simpleicons.org/ollama/e8edf4',
          iconBg: 'rgba(255, 255, 255, 0.1)',
        },
      ],
    },
    {
      label: 'Observability & Telemetry',
      items: [
        {
          label: 'OpenTelemetry',
          iconSrc: 'https://cdn.simpleicons.org/opentelemetry/e8edf4',
          iconBg: 'rgba(244, 90, 66, 0.2)',
        },
        {
          label: 'Datadog',
          iconSrc: 'https://cdn.simpleicons.org/datadog/e8edf4',
          iconBg: 'rgba(98, 44, 144, 0.22)',
        },
        {
          label: 'New Relic',
          iconSrc: 'https://cdn.simpleicons.org/newrelic/e8edf4',
          iconBg: 'rgba(28, 231, 131, 0.16)',
        },
      ],
    },
    {
      label: 'Channels & APIs',
      items: [
        { label: 'REST API', faIcon: 'fa-solid fa-code', iconBg: 'rgba(0, 230, 255, 0.14)' },
        { label: 'Webhooks', faIcon: 'fa-solid fa-link', iconBg: 'rgba(255, 179, 71, 0.16)' },
        {
          label: 'Slack',
          iconSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/slack.svg',
          iconMono: true,
          iconBg: 'rgba(224, 30, 90, 0.2)',
        },
        {
          label: 'Microsoft Teams',
          iconSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoftteams.svg',
          iconMono: true,
          iconBg: 'rgba(98, 100, 167, 0.22)',
        },
      ],
    },
    {
      label: 'Agent-framework adapters',
      items: [
        {
          label: 'LangChain',
          iconSrc: 'https://cdn.simpleicons.org/langchain/e8edf4',
          iconBg: 'rgba(31, 147, 255, 0.2)',
        },
        {
          label: 'LangGraph',
          faIcon: 'fa-solid fa-diagram-project',
          iconBg: 'rgba(139, 92, 246, 0.2)',
        },
        {
          label: 'CrewAI',
          iconSrc: 'https://cdn.simpleicons.org/crewai/e8edf4',
          iconBg: 'rgba(255, 107, 53, 0.2)',
        },
        {
          label: 'MCP',
          faIcon: 'fa-solid fa-plug',
          iconBg: 'rgba(0, 230, 255, 0.12)',
        },
      ],
    },
  ];

  ngOnInit(): void {
    this.title.setTitle(PAGE_TITLE);
    this.meta.updateTag({
      name: 'description',
      content:
        'Trustbridge is the agent governance platform — design workflows visually, enforce policy at runtime, and produce audit trails your security and compliance teams accept.',
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            this.revealObserver?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    document
      .querySelectorAll('.tb-platform .tb-reveal')
      .forEach((el) => this.revealObserver?.observe(el));

    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    this.sectionNav.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        this.sectionObserver?.observe(el);
      }
    });

    const hero = document.querySelector('.tb-hero');
    const root = document.documentElement;

    this.scrollListener = () => {
      const y = window.scrollY;
      this.navVisible = y > (hero?.clientHeight ?? 400) * 0.55;
      root.style.setProperty('--tb-hero-scroll', `${Math.min(y * 0.18, 120)}px`);
      root.style.setProperty(
        '--tb-hero-fade',
        `${Math.max(0, 1 - y / ((hero?.clientHeight ?? 600) * 0.85))}`
      );
    };

    this.scrollListener();
    window.addEventListener('scroll', this.scrollListener, { passive: true });
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();
    this.sectionObserver?.disconnect();

    if (this.scrollListener && isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.scrollListener);
    }

    this.title.setTitle(DEFAULT_TITLE);
    this.meta.removeTag('name="description"');
  }
}
