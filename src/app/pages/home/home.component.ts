import { Component, OnInit, AfterViewInit, inject, PLATFORM_ID, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ScrollAnimationService } from '../../services/scroll-animation.service';
import { CounterAnimationService } from '../../services/counter-animation.service';
import { MagneticButtonService } from '../../services/magnetic-button.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit, OnInit {
  private scrollAnimationService = inject(ScrollAnimationService);
  private counterService = inject(CounterAnimationService);
  private magneticService = inject(MagneticButtonService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  @ViewChild('heroTitle', { static: false }) heroTitle?: ElementRef;
  @ViewChild('particleCanvas', { static: false }) particleCanvas?: ElementRef<HTMLCanvasElement>;



  features = [
    {
      icon: 'fa-solid fa-boxes',
      title: 'Drag & Drop with AI',
      description: 'No Dev time app. Visual workflow builder with intuitive drag-and-drop interface.'
    },
    {
      icon: 'fa-solid fa-rotate',
      title: 'Agent Lifecycle Management',
      description: 'Complete agent lifecycle from design to deployment in one unified platform.'
    },
    {
      icon: 'fa-solid fa-shield-halved',
      title: 'Re-usable Guardrails',
      description: 'Compliance by default with built-in safety and regulatory controls.'
    },
    {
      icon: 'fa-solid fa-gauge-high',
      title: 'API Gateway & LLMOPS',
      description: 'Full observability with unified gateway for all LLM interactions.'
    },
    {
      icon: 'fa-solid fa-database',
      title: 'Data Connectors',
      description: 'MCP & API integrations for seamless data connectivity.'
    },
    {
      icon: 'fa-solid fa-microchip',
      title: 'DIOnce Operating System',
      description: 'Learning kept forever. Intelligent memory and context retention.'
    }
  ];

   capabilities = [
  { icon: 'fa-solid fa-network-wired', label: 'LLM API Gateway' },
  { icon: 'fa-solid fa-eye', label: 'Real-Time Monitoring' },
  { icon: 'fa-solid fa-shield-halved', label: 'Guardrails & Compliance' },
  { icon: 'fa-solid fa-arrow-trend-down', label: 'Cost Optimization' },
  { icon: 'fa-solid fa-diagram-project', label: 'Visual Workflow Creation' },
  { icon: 'fa-solid fa-users-gear', label: 'Multi-Agent Orchestration' }
];


  heroStats = [
    { value: '1 Hour', label: 'To Production', icon: 'fa-solid fa-bolt' },
    { value: '100%', label: 'Reliability', icon: 'fa-solid fa-shield-halved' },
    { value: '75%', label: 'Productivity Gain', icon: 'fa-solid fa-chart-line' }
  ];

  lifecycleSteps = ['Design', 'Test', 'Deploy', 'Monitor', 'Optimize'];

  lifeCycleIcons = [
    'fa-solid fa-pencil-ruler',
    'fa-solid fa-vial',
    'fa-solid fa-rocket',
    'fa-solid fa-eye',
    'fa-solid fa-gears'
  ];

  platformFeatures = [
    { step: 1, name: 'Visual Workflow Creation', icon: 'fa-solid fa-diagram-project' },
    { step: 2, name: 'Multi-Agent Orchestration', icon: 'fa-solid fa-users-gear' },
    { step: 3, name: 'LLM API Gateway', icon: 'fa-solid fa-network-wired' },
    { step: 4, name: 'Real-Time Monitoring', icon: 'fa-solid fa-eye' },
    { step: 5, name: 'Guardrails & Compliance', icon: 'fa-solid fa-shield-check' },
    { step: 6, name: 'Cost Optimization', icon: 'fa-solid fa-dollar-sign' }
  ];

  stats = [
    { value: 1, suffix: ' Hour', label: 'To Production', displayValue: '0 Hour' },
    { value: 100, suffix: '%', label: 'Reliability', displayValue: '0%' },
    { value: 75, suffix: '%', label: 'Productivity Gain', displayValue: '0%' }
  ];

  testimonials = [
    {
      quote: 'DIOnce AI reduced our integration time from 8 weeks to just 7 days. Incredible platform!',
      author: 'CTO',
      company: 'Leading Bank',
      icon: 'fa-solid fa-microchip'
    },
    {
      quote: 'The multi-agent orchestration capabilities are game-changing. We\'ve seen 75% productivity gains.',
      author: 'VP of Operations',
      company: 'Fintech Company',
      icon: 'fa-solid fa-gears'
    },
    {
      quote: 'Best AI platform we\'ve used. The guardrails and monitoring give us confidence in production.',
      author: 'Head of AI',
      company: 'Financial Services',
      icon: 'fa-solid fa-building-columns'
    }
  ];

  typingText = '';
  fullText = ``;
  isTyping = true;
  showFullTitle = false;

ngOnInit() {
  setTimeout(() => {
    if (isPlatformBrowser(this.platformId)) {
      this.startTypingEffect();
      this.initializeParticles();
    }
  }, 100);
}

private initializeParticles() {
  this.initParticleBackground();
}

  ngAfterViewInit() {
    setTimeout(() => {
      this.scrollAnimationService.initScrollAnimations();
      this.initParticleBackground();
      this.initMagneticButtons();
      this.initCounterAnimations();
    }, 100);
  }

  startTypingEffect() {
    if (!isPlatformBrowser(this.platformId)) {
      this.showFullTitle = true;
      return;
    }
    
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < this.fullText.length) {
        this.typingText += this.fullText.charAt(charIndex);
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          this.isTyping = false;
          this.showFullTitle = true;
        }, 500);
      }
    }, 50);
  }


  initParticleBackground() {
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

  initMagneticButtons() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    setTimeout(() => {
      const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
      buttons.forEach(btn => {
        this.magneticService.initMagneticEffect(btn as HTMLElement);
      });
    }, 500);
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
      const statsSection = document.querySelector('.hero-stats');
      if (statsSection) {
        observer.observe(statsSection);
      }
    }, 500);
  }

  nodeClick(nodeNumber: number) {
    console.log(`Node ${nodeNumber} clicked`);
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

  navigateToPlatform() {
    this.router.navigate(['/platform'], { 
      fragment: 'top'
    }).then(() => {
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  Math = Math;

  getOrbitingNodePosition(index: number, total: number): { left: number; top: number } {
    const angle = (index * 2 * Math.PI) / total;
    const radius = 32;
    return {
      left: 50 + radius * Math.cos(angle),
      top: 50 + radius * Math.sin(angle)
    };
  }
}
