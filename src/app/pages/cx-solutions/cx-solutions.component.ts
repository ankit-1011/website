import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

const DEFAULT_TITLE =
  'DIOnce.AI - Build , Test , Deploy & Monitor AI Workflows in Under 1 Hour';

const PAGE_TITLE = 'Agentic AI for Customer Experience | DIOnce.AI';

@Component({
  selector: 'app-cx-solutions',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cx-solutions.component.html',
  styleUrl: './cx-solutions.component.scss',
  host: { class: 'cx-solutions-page' }
})
export class CxSolutionsComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);

  private revealObserver?: IntersectionObserver;

  openFaqIndex = 0;

  ngOnInit(): void {
    this.title.setTitle(PAGE_TITLE);
    this.meta.updateTag({
      name: 'description',
      content:
        'Autonomous agents that resolve customer issues end to end across voice, chat, WhatsApp and email. Build one in an hour. Pay only for what it resolves.'
    });

    if (!environment.cxPageIndexable) {
      this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    }
  }

  ngAfterViewInit(): void {
    this.initScrollReveal();
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();
    this.title.setTitle(DEFAULT_TITLE);
    this.meta.removeTag('name="description"');
    this.meta.removeTag('name="robots"');
  }

  toggleFaq(index: number, event: Event): void {
    event.preventDefault();
    this.openFaqIndex = this.openFaqIndex === index ? -1 : index;
  }

  private initScrollReveal(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const root = this.elementRef.nativeElement;
    const staggerSelector =
      '.pillar, .uc__item, .step, .ch__i, .ao-grid > div, .int > div, .feat > div, .duo__p, .pf, .faq > details, .kn-list div';

    const selectors = [
      '.sec .wrap > .eyebrow',
      '.sec .wrap > .h2',
      '.sec .wrap > .lede',
      '.stmt-grid > div',
      '.kn-layout__head',
      '.kn-layout__viz',
      '.kn-layout__body',
      '.pillar',
      '.uc__item',
      '.step',
      '.kn-list div',
      '.ch__i',
      '.ao-grid > div',
      '.int > div',
      '.feat > div',
      '.duo__p',
      '.pf',
      '.statbar',
      '.faq > details',
      '.hours',
      '.hours-lab'
    ];

    const seen = new Set<Element>();

    for (const selector of selectors) {
      root.querySelectorAll(selector).forEach((el: Element) => {
        if (seen.has(el)) {
          return;
        }
        seen.add(el);
        el.classList.add('cx-reveal');

        if (el.matches(staggerSelector) && el.parentElement) {
          const index = Array.from(el.parentElement.children).indexOf(el);
          (el as HTMLElement).style.setProperty(
            '--cx-reveal-delay',
            `${Math.min(index * 0.07, 0.42)}s`
          );
        }
      });
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
      { threshold: 0.08, rootMargin: '0px 0px -48px 0px' }
    );

    root.querySelectorAll('.cx-reveal').forEach((el: Element) => this.revealObserver?.observe(el));
  }
}
