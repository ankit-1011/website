import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CX_NAV_BY_CAPABILITY,
  CX_NAV_BY_JOB,
  CX_NAV_FEATURED,
  CX_NAV_OVERVIEW_PATH
} from '../../../navigation/cx-nav.config';

@Component({
  selector: 'app-cx-mega-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cx-mega-menu.component.html',
  styleUrl: './cx-mega-menu.component.scss'
})
export class CxMegaMenuComponent {
  @Input({ required: true }) open = false;
  @Output() navigated = new EventEmitter<void>();

  readonly overviewPath = CX_NAV_OVERVIEW_PATH;
  readonly byJob = CX_NAV_BY_JOB;
  readonly byCapability = CX_NAV_BY_CAPABILITY;
  readonly featured = CX_NAV_FEATURED;

  onLinkClick(): void {
    this.navigated.emit();
  }
}
