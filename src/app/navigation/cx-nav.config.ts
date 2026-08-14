export interface CxNavLink {
  label: string;
  fragment: string;
  description: string;
  /** Font Awesome 6 solid class, e.g. `fa-solid fa-microphone` */
  icon: string;
  badge?: 'New';
}

export interface CxNavFeaturedCard {
  title: string;
  description: string;
  path: string;
  fragment?: string;
  icon: string;
  accent: 'cyan' | 'violet';
}

/** Global header — Customer Experience mega-menu (single nav entry). */
export const CX_NAV_OVERVIEW_PATH = '/cx';

export const CX_NAV_BY_JOB: readonly CxNavLink[] = [
  {
    label: 'Voice Agents',
    fragment: 'voice-agents',
    description: 'Natural voice AI for inbound and outbound calls',
    icon: 'fa-solid fa-microphone-lines'
  },
  {
    label: 'Self-Service',
    fragment: 'self-service',
    description: 'Resolve issues without waiting on hold',
    icon: 'fa-solid fa-circle-question'
  },
  {
    label: 'Agent Assist',
    fragment: 'agent-assist',
    description: 'Real-time guidance for human agents',
    icon: 'fa-solid fa-headset',
    badge: 'New'
  },
  {
    label: 'Post-Call Automation',
    fragment: 'post-call-automation',
    description: 'Summaries, QA, and follow-ups after every call',
    icon: 'fa-solid fa-clipboard-list'
  },
  {
    label: 'Conversation Intelligence',
    fragment: 'conversation-intelligence',
    description: 'Analytics and insights across every interaction',
    icon: 'fa-solid fa-chart-line'
  },
  {
    label: 'Outbound',
    fragment: 'outbound',
    description: 'Proactive campaigns with compliant dialing',
    icon: 'fa-solid fa-phone-volume'
  }
];

export const CX_NAV_BY_CAPABILITY: readonly CxNavLink[] = [
  {
    label: 'Platform',
    fragment: 'platform',
    description: 'Orchestrate CX workflows in one stack',
    icon: 'fa-solid fa-layer-group'
  },
  {
    label: 'Knowledge',
    fragment: 'knowledge',
    description: 'Ground agents in approved content',
    icon: 'fa-solid fa-book'
  },
  {
    label: 'Channels',
    fragment: 'channels',
    description: 'Voice, chat, and messaging together',
    icon: 'fa-solid fa-comments'
  },
  {
    label: 'Always-on',
    fragment: 'always-on',
    description: '24/7 coverage without extra headcount',
    icon: 'fa-solid fa-clock'
  },
  {
    label: 'Interruption',
    fragment: 'interruption',
    description: 'Handle barge-in and turn-taking gracefully',
    icon: 'fa-solid fa-wave-square'
  },
  {
    label: 'Integrations',
    fragment: 'integrations',
    description: 'Connect CRM, telephony, and data lakes',
    icon: 'fa-solid fa-plug'
  },
  {
    label: 'Reliability',
    fragment: 'reliability',
    description: 'Uptime and failover built for contact centers',
    icon: 'fa-solid fa-shield-halved'
  },
  {
    label: 'Trust',
    fragment: 'trust',
    description: 'Transparent AI your customers can rely on',
    icon: 'fa-solid fa-handshake'
  },
  {
    label: 'Compliance',
    fragment: 'compliance',
    description: 'Policies, recording, and audit-ready controls',
    icon: 'fa-solid fa-file-shield'
  }
];

export const CX_NAV_FEATURED: readonly CxNavFeaturedCard[] = [
  {
    title: 'CX overview',
    description: 'See the full Customer Experience platform on one page.',
    path: CX_NAV_OVERVIEW_PATH,
    icon: 'fa-solid fa-compass',
    accent: 'cyan'
  },
  {
    title: 'Request a demo',
    description: 'Walk through voice agents and agent assist with our team.',
    path: '/contact',
    icon: 'fa-solid fa-rocket',
    accent: 'violet'
  }
];
