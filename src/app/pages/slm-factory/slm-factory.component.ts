import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

const DEFAULT_TITLE =
  'DIOnce.AI - Build , Test , Deploy & Monitor AI Workflows in Under 1 Hour';

const PAGE_TITLE = 'SLM Factory by DIOnce.AI — Prove which small model to ship';

@Component({
  selector: 'app-slm-factory',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './slm-factory.component.html',
  styleUrl: './slm-factory.component.scss',
  host: { class: 'slm-factory-page' }
})
export class SlmFactoryComponent implements OnInit, OnDestroy {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  ngOnInit(): void {
    this.title.setTitle(PAGE_TITLE);
    this.meta.updateTag({
      name: 'description',
      content:
        'SLM Factory is one place to discover, benchmark, verify and human-test small language models — so you shortlist the model you can defend, before you commit compute to it.'
    });
  }

  ngOnDestroy(): void {
    this.title.setTitle(DEFAULT_TITLE);
    this.meta.removeTag('name="description"');
  }
}
