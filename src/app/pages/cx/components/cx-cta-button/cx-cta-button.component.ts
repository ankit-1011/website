import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export type CxCtaVariant = 'primary' | 'ghost' | 'ink';

@Component({
  selector: 'cx-cta-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cx-cta-button.component.html',
  styleUrl: './cx-cta-button.component.scss',
  host: {
    class: 'cx-cta',
    '[class.cx-cta--primary]': 'variant === "primary"',
    '[class.cx-cta--ghost]': 'variant === "ghost"',
    '[class.cx-cta--ink]': 'variant === "ink"'
  }
})
export class CxCtaButtonComponent {
  @Input() variant: CxCtaVariant = 'primary';

  /** Internal route — renders an anchor with `routerLink`. */
  @Input() routerLink?: string | unknown[];

  /** External URL — renders a plain anchor. */
  @Input() href?: string;

  @Input() type: 'button' | 'submit' = 'button';

  @Input() disabled = false;

  get isLink(): boolean {
    return this.routerLink != null || this.href != null;
  }
}
