import { Component, HostListener, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  imports: [CommonModule],
  template: '<div class="scroll-progress-bar" [style.width.%]="scrollProgress"></div>',
  styles: [`
    .scroll-progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--accent-cyan), var(--accent-purple));
      z-index: 9999;
      transition: width 0.1s ease-out;
      box-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
    }
  `]
})
export class ScrollProgressComponent implements OnInit {
  scrollProgress = 0;
  private platformId = inject(PLATFORM_ID);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollableHeight = documentHeight - windowHeight;
    
    this.scrollProgress = (scrollTop / scrollableHeight) * 100;
  }

  ngOnInit() {
    this.onWindowScroll();
  }
}

