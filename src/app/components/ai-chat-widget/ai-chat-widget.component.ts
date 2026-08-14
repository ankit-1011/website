import {
  Component,
  ElementRef,
  Injector,
  ViewChild,
  afterNextRender,
  effect,
  inject,
  signal
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';

type ChatAction = { label: string; route: string; primary?: boolean };

type ChatMessage = { role: 'user' | 'assistant'; text: string; actions?: ChatAction[] };

@Component({
  selector: 'app-ai-chat-widget',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './ai-chat-widget.component.html',
  styleUrl: './ai-chat-widget.component.scss'
})
export class AiChatWidgetComponent {
  private readonly injector = inject(Injector);
  private readonly router = inject(Router);

  @ViewChild('messagesEl') private messagesEl?: ElementRef<HTMLElement>;
  @ViewChild('messagesEnd') private messagesEnd?: ElementRef<HTMLElement>;

  readonly chatOpen = signal(false);
  readonly messages = signal<ChatMessage[]>([this.welcomeMessage()]);

  draft = '';

  constructor() {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      this.messages.set([this.welcomeMessage()]);
    });

    effect(() => {
      this.messages();
      this.chatOpen();
      if (!this.chatOpen()) {
        return;
      }
      afterNextRender(() => this.scrollChatToBottom(), { injector: this.injector });
    });
  }

  toggleChat(): void {
    this.chatOpen.update((open) => !open);
  }

  closeChat(): void {
    this.chatOpen.set(false);
  }

  onChatSubmit(event: Event): void {
    event.preventDefault();
    const text = this.draft.trim();
    if (!text) {
      return;
    }
    this.messages.update((list) => [...list, { role: 'user', text }]);
    this.draft = '';
    const reply = this.buildReply(text);
    setTimeout(() => {
      this.messages.update((list) => [...list, reply]);
    }, 320);
  }

  placeholder(): string {
    return this.onSlmPage() ? 'Ask about model evaluation…' : 'Ask DIOnce.AI anything…';
  }

  private onSlmPage(): boolean {
    return this.router.url.includes('slm-factory');
  }

  private welcomeMessage(): ChatMessage {
    if (this.onSlmPage()) {
      return {
        role: 'assistant',
        text: 'Hi, I can help you understand SLM Factory: catalog sync, leaderboard shortlists, the advisor, inference probe, and human test sessions. What would you like to know?'
      };
    }
    return {
      role: 'assistant',
      text: 'Hi, I am the DIOnce.AI assistant. Ask about the Platform, TrustBridge, Customer Experience, SLM Factory, or how to request a demo.'
    };
  }

  private scrollChatToBottom(): void {
    const container = this.messagesEl?.nativeElement;
    const anchor = this.messagesEnd?.nativeElement;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
    if (anchor) {
      anchor.scrollIntoView({ block: 'end', behavior: 'auto' });
    }
  }

  private buildReply(input: string): ChatMessage {
    const q = input.toLowerCase();
    const assistant = (text: string, actions?: ChatAction[]): ChatMessage => ({
      role: 'assistant',
      text,
      actions
    });

    if (this.onSlmPage()) {
      if (q.includes('catalog') || q.includes('hugging')) {
        return assistant(
          'The catalog syncs metadata from Hugging Face so every candidate stays current in one browsable view, no manual tracking sheets.'
        );
      }
      if (q.includes('leaderboard') || q.includes('benchmark')) {
        return assistant(
          'The leaderboard ranks 19 curated small-model IDs side by side. Scores are a fixed dataset for stable comparisons; live ingestion is on the roadmap.'
        );
      }
      if (q.includes('advisor') || q.includes('recommend')) {
        return assistant(
          'The advisor reads your catalog and benchmark data plus project context and returns a grounded shortlist instead of cross-referencing tabs and threads.'
        );
      }
      if (q.includes('probe') || q.includes('inference') || q.includes('gated')) {
        return assistant(
          'The inference probe checks Hugging Face availability: accessible, not gated, provider enabled, before you commit engineering time.'
        );
      }
      if (q.includes('session') || q.includes('human') || q.includes('test')) {
        return assistant(
          'Human-reviewed test sessions capture qualitative failures benchmarks miss, with a recorded verdict per model and session.'
        );
      }
    }

    if (q.includes('platform') || q.includes('trustbridge') || q.includes('govern')) {
      return assistant(
        'The Platform is where teams design agent workflows in a visual studio and enforce policy at runtime with an audit trail compliance teams accept.'
      );
    }
    if (q.includes('slm') || q.includes('small model') || q.includes('factory')) {
      return assistant(
        'SLM Factory helps you discover, benchmark, probe, and human-test small language models in one pipeline. Visit the SLM Factory page for the full workflow.',
        [
          { label: 'SLM Factory →', route: '/slm-factory' },
          { label: 'Request demo →', route: '/contact', primary: true }
        ]
      );
    }
    if (q.includes('cx') || q.includes('customer')) {
      return assistant(
        'Customer Experience solutions focus on autonomous agents across voice, chat, and messaging with guardrails and memory built in.'
      );
    }
    if (q.includes('demo') || q.includes('start') || q.includes('contact')) {
      if (this.onSlmPage()) {
        return assistant(
          'Book a model evaluation walkthrough or jump straight to the workflow on this page.',
          [
            { label: 'Evaluate a model →', route: '/contact', primary: true },
            { label: 'See workflow', route: '/slm-factory' }
          ]
        );
      }
      return assistant(
        'Book a walkthrough with our team. Pick an option below or use Request Demo in the header anytime.',
        [
          { label: 'Request demo →', route: '/contact', primary: true },
          { label: 'Explore Platform', route: '/platform' }
        ]
      );
    }
    return assistant(
      'DIOnce.AI covers agent design, governance, and specialized products like SLM Factory. Try asking about Platform, demos, or model evaluation.'
    );
  }
}
