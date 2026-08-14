import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollAnimationService {
  private platformId = inject(PLATFORM_ID);

  initScrollAnimations() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Wait for DOM to be ready
    setTimeout(() => {
      // Clear any existing visible classes to re-trigger animations
      const existingElements = document.querySelectorAll('.fade-in-up, .fade-in, .slide-in-left, .slide-in-right, .scale-in, .footer-link-slide');
      existingElements.forEach(el => {
        el.classList.remove('visible');
      });

      const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -100px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      // Observe all elements with animation classes
      const animatedElements = document.querySelectorAll(
        '.fade-in-up, .fade-in, .slide-in-left, .slide-in-right, .scale-in, .footer-link-slide'
      );

      animatedElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const rect = htmlEl.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (htmlEl.classList.contains('fade-in-up')) {
          htmlEl.classList.remove('visible');
          htmlEl.style.opacity = '0';
          htmlEl.style.transform = 'translateY(100px)';
          htmlEl.style.transition = 'opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1), transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)';
          const isHeroSection = htmlEl.closest('.hero-section') !== null || htmlEl.classList.contains('max-w-4xl') || htmlEl.classList.contains('max-w-5xl');
          if (isInViewport) {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                const delay = isHeroSection ? 600 : 500;
                setTimeout(() => {
                  htmlEl.style.opacity = '';
                  htmlEl.style.transform = '';
                  htmlEl.style.transition = '';
                  htmlEl.classList.add('visible');
                }, delay);
              });
            });
          }
        }
        observer.observe(htmlEl);
      });
    }, 200);
  }
}

