import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';

export interface CxPlaceholderReportItem {
  index: number;
  text: string;
  note: string;
  sectionId: string;
}

@Injectable({
  providedIn: 'root'
})
export class CxPlaceholderAuditService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private panelEl: HTMLElement | null = null;

  /** Query `?cx-ph=1` or `?cx-ph=audit`, or non-production when cxPlaceholderAudit is enabled. */
  shouldRunAudit(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    const param = new URLSearchParams(window.location.search).get('cx-ph');
    if (param === '1' || param === 'audit' || param === 'true') {
      return true;
    }

    return !environment.production && environment.cxPlaceholderAudit;
  }

  runAudit(host: HTMLElement): CxPlaceholderReportItem[] {
    const items = this.collectPlaceholders(host);
    if (items.length === 0) {
      this.removePanel();
      return items;
    }

    host.classList.add('cx-page--ph-audit');
    this.renderPanel(items);
    return items;
  }

  collectPlaceholders(root: ParentNode): CxPlaceholderReportItem[] {
    const nodes = root.querySelectorAll<HTMLElement>('.ph');
    return Array.from(nodes).map((el, index) => ({
      index: index + 1,
      text: (el.textContent ?? '').trim().slice(0, 120),
      note: el.getAttribute('data-ph-note') ?? '(missing data-ph-note)',
      sectionId: el.closest('section[id]')?.id ?? '(no section)'
    }));
  }

  teardown(host: HTMLElement): void {
    host.classList.remove('cx-page--ph-audit');
    this.removePanel();
  }

  private renderPanel(items: CxPlaceholderReportItem[]): void {
    this.removePanel();

    const panel = this.document.createElement('aside');
    panel.className = 'cx-ph-audit-panel';
    panel.setAttribute('aria-live', 'polite');
    panel.setAttribute('aria-label', 'CX placeholder audit');

    const title = this.document.createElement('p');
    title.className = 'cx-ph-audit-panel__title';
    title.textContent = `Placeholder gate — ${items.length} unverified marker(s)`;
    panel.appendChild(title);

    const list = this.document.createElement('ol');
    list.className = 'cx-ph-audit-panel__list';

    for (const item of items) {
      const li = this.document.createElement('li');
      li.textContent = `#${item.index} [${item.sectionId}] ${item.text || '(empty)'} — ${item.note}`;
      list.appendChild(li);
    }

    panel.appendChild(list);

    const hint = this.document.createElement('p');
    hint.className = 'cx-ph-audit-panel__hint';
    hint.textContent =
      'Remove every .ph before launch. Production build fails while markers remain (unless CX_ALLOW_PLACEHOLDERS=true).';
    panel.appendChild(hint);

    this.document.body.appendChild(panel);
    this.panelEl = panel;
  }

  private removePanel(): void {
    this.panelEl?.remove();
    this.panelEl = null;
  }
}
