import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';

const PRELOAD_FONTS = [
  '/assets/cx/fonts/bricolage-grotesque-latin-600-normal.woff2',
  '/assets/cx/fonts/instrument-sans-latin-400-normal.woff2'
] as const;

const DEFERRED_STYLESHEET = '/assets/cx/cx-font-faces-deferred.css';

@Injectable({
  providedIn: 'root'
})
export class CxFontLoaderService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private started = false;

  /** Preload hero/body faces; defer remaining weights and mono / Devanagari. */
  loadForCxPage(): void {
    if (!isPlatformBrowser(this.platformId) || this.started) {
      return;
    }
    this.started = true;

    for (const href of PRELOAD_FONTS) {
      this.preloadFont(href);
    }

    this.loadDeferredStylesheet();
  }

  private preloadFont(href: string): void {
    const head = this.document.head;
    if (head.querySelector(`link[rel="preload"][href="${href}"]`)) {
      return;
    }

    const link = this.document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.href = href;
    link.crossOrigin = 'anonymous';
    head.appendChild(link);
  }

  private loadDeferredStylesheet(): void {
    const head = this.document.head;
    if (head.querySelector(`link[href="${DEFERRED_STYLESHEET}"]`)) {
      return;
    }

    const link = this.document.createElement('link');
    link.rel = 'stylesheet';
    link.href = DEFERRED_STYLESHEET;
    link.media = 'print';
    link.onload = () => {
      link.media = 'all';
    };
    head.appendChild(link);
  }
}
