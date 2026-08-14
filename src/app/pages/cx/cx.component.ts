import { Component, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { CxFontLoaderService } from './services/cx-font-loader.service';
import { CxPlaceholderAuditService } from './services/cx-placeholder-audit.service';

const DEFAULT_TITLE =
  'DIOnce.AI - Build , Test , Deploy & Monitor AI Workflows in Under 1 Hour';

@Component({
  selector: 'app-cx',
  standalone: true,
  imports: [],
  templateUrl: './cx.component.html',
  styleUrl: './cx.component.scss',
  host: { class: 'cx-page' }
})
export class CxComponent implements OnInit, OnDestroy {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly cxFonts = inject(CxFontLoaderService);
  private readonly cxPlaceholderAudit = inject(CxPlaceholderAuditService);
  private readonly hostEl = inject(ElementRef<HTMLElement>);

  ngOnInit(): void {
    this.cxFonts.loadForCxPage();
    this.title.setTitle('CX | DIOnce.AI');

    if (!environment.cxPageIndexable) {
      this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    }

    if (this.cxPlaceholderAudit.shouldRunAudit()) {
      queueMicrotask(() =>
        this.cxPlaceholderAudit.runAudit(this.hostEl.nativeElement)
      );
    }
  }

  ngOnDestroy(): void {
    this.cxPlaceholderAudit.teardown(this.hostEl.nativeElement);
    this.title.setTitle(DEFAULT_TITLE);
    this.meta.removeTag('name="robots"');
  }
}
