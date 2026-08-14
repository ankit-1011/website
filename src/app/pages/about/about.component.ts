import { Component, inject, PLATFORM_ID, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ScrollAnimationService } from '../../services/scroll-animation.service';
import { CounterAnimationService } from '../../services/counter-animation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private scrollAnimationService = inject(ScrollAnimationService);
  private counterService = inject(CounterAnimationService);

  @ViewChild('timelineRef') timelineEl!: ElementRef;
  @ViewChild('timelineContainer', { static: false }) timelineContainer?: ElementRef<HTMLDivElement>;
  @ViewChild('particleCanvas', { static: false }) particleCanvas?: ElementRef<HTMLCanvasElement>;

  activeIndex = 0;
  progressHeight = '0%';

  stats = [
    { value: 150, suffix: '+', label: 'Years of Combined Experience', icon: 'fa-solid fa-trophy', displayValue: '0+' },
    { value: 25, suffix: '', label: 'Team Members', icon: 'fa-solid fa-users', displayValue: '0' },
    { value: 3, suffix: '', label: 'Global Locations', icon: 'fa-solid fa-globe', displayValue: '0' },
    { value: 100, suffix: '%', label: 'Customer Satisfaction', icon: 'fa-solid fa-heart', displayValue: '0%' },
  ];

  timeline = [
    {
      date: 'Jan 2025',
      title: 'Company Founded',
      description: 'DIOnce AI was founded in Bangalore, India with global operations in Princeton, New Jersey. Established with a vision to democratize Agentic AI.',
    },
    {
      date: 'Q1 2025',
      title: 'Platform Development',
      description: 'Built our proprietary Agentic AI engine with focus on reliability, safety, and simplicity. Assembled a team of experts with over 150 years of combined BPM experience.',
    },
    {
      date: 'Q2 2025',
      title: 'Platform Launch',
      description: 'Released our unified Agentic AI platform enabling teams to build, test, and deploy AI workflows in under 1 hour.',
    },
    {
      date: 'Q3 2025',
      title: 'First Enterprise Customers',
      description: 'Onboarded leading financial institutions and fintech companies, demonstrating 75% productivity gains and 100% reliability.',
    },
    {
      date: 'Ongoing',
      title: 'Continuous Innovation',
      description: 'Expanding platform capabilities with advanced multi-agent orchestration, enhanced guardrails, and industry-specific solutions.',
    },
  ];

  whatMakesUsDifferent = [
    'Proprietary Agentic AI engine designed for enterprise reliability',
    'Complete lifecycle management from design to production in one platform',
    'Built-in guardrails, monitoring, and compliance for safe AI deployment',
    'Deep BPM expertise combined with cutting-edge AI technology',
  ];

  values = [
    {
      icon: 'fa-solid fa-shield-halved',
      title: 'Reliability First',
      description: '100% reliability is not just a goal - it\'s our commitment to every customer.',
    },
    {
      icon: 'fa-solid fa-lightbulb',
      title: 'Innovation',
      description: 'Pioneering the future of Agentic AI with cutting-edge technology.',
    },
    {
      icon: 'fa-solid fa-lock',
      title: 'Safety & Security',
      description: 'Enterprise-grade security, compliance, and ethical AI practices built in.',
    },
    {
      icon: 'fa-solid fa-bolt',
      title: 'Speed to Value',
      description: 'Go from concept to production in under 1 hour with our intuitive platform.',
    },
  ];

  expertise = [
    {
      icon: 'fa-solid fa-brain',
      title: 'Agentic AI',
      description: 'Building autonomous AI agents that think, decide, and act independently while maintaining human oversight.',
    },
    {
      icon: 'fa-solid fa-building',
      title: 'BFSI Solutions',
      description: 'Specialized solutions for banking including fraud detection, AML compliance, and customer onboarding.',
    },
    {
      icon: 'fa-solid fa-diagram-project',
      title: 'Workflow Automation',
      description: 'End-to-end workflow automation with intelligent orchestration and real-time monitoring.',
    },
    {
      icon: 'fa-solid fa-shield-halved',
      title: 'Compliance & Security',
      description: 'Enterprise-grade security ensuring safe AI deployment in regulated industries.',
    },
  ];

  locations = [
    { city: 'Princeton, New Jersey', country: 'United States', type: 'Headquarters' },
    { city: 'Bangalore', country: 'India', type: 'Development Center' },
    { city: 'Pune', country: 'India', type: 'Regional Sales Office' },
  ];


  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', this.onScroll.bind(this));
      this.onScroll();
      setTimeout(() => {
        this.initParticleBackground();
        this.scrollAnimationService.initScrollAnimations();
        this.initTimelineScroll();
        this.initCounterAnimations();
      }, 100);
    }
  }

  initTimelineScroll(): void {
    if (!this.timelineContainer?.nativeElement) return;

    const container = this.timelineContainer.nativeElement;
    const updateProgress = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerTop = rect.top;
      const containerHeight = rect.height;

      const viewportCenter = windowHeight * 0.5;
      const containerStart = containerTop;
      const containerEnd = containerTop + containerHeight;
      
      const totalDistance = containerHeight + viewportCenter;
      const scrolledDistance = viewportCenter - containerStart;
      
      const scrollProgress = Math.max(0, Math.min(1, scrolledDistance / totalDistance));

      this.progressHeight = `${scrollProgress * 100}%`;

      const items = container.querySelectorAll('.timeline-item-wrapper');
      const containerRect = container.getBoundingClientRect();
      let maxActiveIndex = -1;
      
      const totalItems = items.length;
      
      items.forEach((item: Element, index: number) => {
        const itemRect = item.getBoundingClientRect();
        
        const itemTop = itemRect.top - containerRect.top;
        const itemHeight = itemRect.height;
        const itemCenterY = itemTop + (itemHeight / 2);
        
        const timelineTotalHeight = containerHeight;
        
        const itemProgressPosition = Math.max(0, Math.min(1, itemCenterY / timelineTotalHeight));
        
        const isLastItem = index === totalItems - 1;
        let activationThreshold: number;
        
        if (isLastItem) {
          const secondLastIndex = totalItems - 2;
          const secondLastItem = items[secondLastIndex];
          if (secondLastItem) {
            const secondLastRect = secondLastItem.getBoundingClientRect();
            const secondLastTop = secondLastRect.top - containerRect.top;
            const secondLastHeight = secondLastRect.height;
            const secondLastCenterY = secondLastTop + (secondLastHeight / 2);
            const secondLastProgressPosition = Math.max(0, Math.min(1, secondLastCenterY / timelineTotalHeight));
            activationThreshold = secondLastProgressPosition;
          } else {
            activationThreshold = itemProgressPosition;
          }
        } else {
          const offsetBeforePoint = 0.12;
          activationThreshold = Math.max(0, itemProgressPosition - offsetBeforePoint);
        }
        
        if (scrollProgress >= activationThreshold) {
          maxActiveIndex = Math.max(maxActiveIndex, index);
        }
      });
      
      this.activeIndex = Math.max(0, maxActiveIndex);
    };

    updateProgress();
    const scrollHandler = () => {
      requestAnimationFrame(updateProgress);
    };
    window.addEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener('resize', scrollHandler, { passive: true });
  }

  initParticleBackground(): void {
    if (!isPlatformBrowser(this.platformId) || !this.particleCanvas?.nativeElement) return;

    const canvas = this.particleCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number }> = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 217, 255, 0.3)';
        ctx.fill();

        particles.forEach(other => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(0, 217, 255, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  onScroll(): void {
  }

  isTimelineItemActive(index: number): boolean {
    return index <= this.activeIndex;
  }

  isTimelineItemLeft(index: number): boolean {
    return index % 2 === 1;
  }

  isOngoing(date: string): boolean {
    return date === 'Ongoing';
  }

  initCounterAnimations() {
    if (!isPlatformBrowser(this.platformId)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statElements = entry.target.querySelectorAll('.stat-number');
          statElements.forEach((el, index) => {
            const stat = this.stats[index];
            if (stat && el) {
              const suffix = stat.suffix;
              this.counterService.animateCounter(el as HTMLElement, stat.value, 2000, suffix);
            }
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    setTimeout(() => {
      const statsSection = document.querySelector('.about-stats');
      if (statsSection) {
        observer.observe(statsSection);
      }
    }, 500);
  }

  navigateToContact() {
    this.router.navigate(['/contact'], { 
      fragment: 'contact-form'
    }).then(() => {
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          const formElement = document.getElementById('contact-form');
          if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    });
  }
}
