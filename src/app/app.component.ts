import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet, NavigationEnd, Router } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScrollProgressComponent } from './components/scroll-progress/scroll-progress.component';
import { ToastComponent } from './components/toast/toast.component';
import { AiChatWidgetComponent } from './components/ai-chat-widget/ai-chat-widget.component';
import { ScrollAnimationService } from './services/scroll-animation.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ScrollProgressComponent, ToastComponent, AiChatWidgetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Dionce AI';

  readonly showSiteHeader = signal(true);
  readonly showSiteFooter = signal(true);

  private scrollAnimationService = inject(ScrollAnimationService);
  private router = inject(Router);

  ngOnInit() {
    this.syncSiteChrome();
    // Initialize scroll animations
    setTimeout(() => {
      this.scrollAnimationService.initScrollAnimations();
    }, 100);

    // Re-initialize on route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.syncSiteChrome();
        setTimeout(() => {
          this.scrollAnimationService.initScrollAnimations();
        }, 100);
      });
  }

  private syncSiteChrome(): void {
    this.showSiteHeader.set(true);
    this.showSiteFooter.set(true);
  }
}

