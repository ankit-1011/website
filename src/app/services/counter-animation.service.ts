import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CounterAnimationService {
  private platformId = inject(PLATFORM_ID);

  animateCounter(element: HTMLElement, target: number, duration: number = 2000, suffix: string = ''): void {
    if (!isPlatformBrowser(this.platformId)) {
      element.textContent = target + suffix;
      return;
    }

    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        element.textContent = Math.floor(current) + suffix;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + suffix;
      }
    }, 16);
  }
}

