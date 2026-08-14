import { Component, inject, PLATFORM_ID, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

@Component({
  selector: 'app-use-cases',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './use-cases.component.html',
  styleUrl: './use-cases.component.scss'
})
export class UseCasesComponent implements AfterViewInit {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private scrollAnimationService = inject(ScrollAnimationService);

  @ViewChild('particleCanvas', { static: false }) particleCanvas?: ElementRef<HTMLCanvasElement>;

  useCases = [
    {
      icon: 'fa-solid fa-building-columns',
      title: 'Banking & Financial Services',
      description: 'AI-driven automation for core banking operations, compliance, and risk management. Delivers high productivity with enterprise-grade reliability and regulatory control.',
      capabilities: [
        'Real-time fraud monitoring, AML & KYC automation',
        'Credit risk assessment and regulatory reporting',
        'Multi-agent investigations with hybrid AI-human decision workflows',
      ],
      color: 'from-blue-500 to-cyan-400',
    },
    {
      icon: 'fa-solid fa-wallet',
      title: 'Fintech',
      description: 'Autonomous AI workflows to accelerate payments, lending, and financial analytics. Enables faster product launches with built-in compliance and security.',
      capabilities: [
        'Payments, lending, and risk automation',
        'Real-time fraud prevention and profiling',
        'API orchestration with multi-modal data processing',
      ],
      color: 'from-purple-500 to-pink-400',
    },
    {
      icon: 'fa-solid fa-gear',
      title: 'Operations & BPM',
      description: 'Intelligent automation to orchestrate and optimize end-to-end business processes. Reduces manual effort while improving speed, accuracy, and visibility.',
      capabilities: [
        'Workflow orchestration, task routing, and approvals',
        'Exception handling with KPIs and monitoring',
        'Legacy system integration with document automation',
      ],
      color: 'from-orange-500 to-amber-400',
    },
    {
      icon: 'fa-solid fa-box',
      title: 'Product Management',
      description: 'AI-powered insights to guide product decisions, prioritization, and releases. Turns user feedback and data into faster, smarter execution.',
      capabilities: [
        'Feedback analysis, sentiment, and feature scoring',
        'Product analytics and competitive intelligence',
        'A/B testing and release automation',
      ],
      color: 'from-green-500 to-emerald-400',
    },
    {
      icon: 'fa-solid fa-users',
      title: 'Customer Experience',
      description: 'AI-enabled support and engagement across channels with real-time intelligence. Delivers faster responses and consistently personalized interactions.',
      capabilities: [
        'AI call centers and intelligent support workflows',
        'Sentiment analysis with automated routing',
        'Customer journey and knowledge-base integration',
      ],
      color: 'from-rose-500 to-pink-400',
    },
    {
      icon: 'fa-solid fa-chart-bar',
      title: 'Research & Analytics',
      description: 'AI agents that analyze data, extract insights, and generate reports at scale. Compresses complex research cycles into hours instead of weeks.',
      capabilities: [
        'Data analysis, trend detection, and forecasting',
        'Multi-source aggregation with insight extraction',
        'Automated reporting and knowledge graph creation',
      ],
      color: 'from-indigo-500 to-violet-400',
    },
  ];

  successStories = [
    {
      number: '01',
      category: 'Global Banking Leader',
      title: '8 Weeks → 7 Days',
      description: '"DIOnce AI reduced our integration time dramatically. The multi-agent orchestration transformed our compliance workflows entirely."',
      icon: 'fa-solid fa-building-columns',
      role: 'Chief Technology Officer',
      company: 'Leading Bank',
      stats: [
        { value: '91%', label: 'Faster Integration' },
      ],
      alignLeft: true,
    },
    {
      number: '02',
      category: 'Leading Fintech',
      title: '75% Productivity Gains',
      description: '"The multi-agent orchestration capabilities are game-changing. Our team now focuses on strategy while AI handles the heavy lifting."',
      icon: 'fa-solid fa-wallet',
      role: 'VP of Operations',
      company: 'Series D Fintech',
      stats: [
        { value: '10x', label: 'Faster Decisions' },
      ],
      alignLeft: false,
    },
    {
      number: '03',
      category: 'Enterprise Financial Services',
      title: 'Production Confidence',
      description: '"Best AI platform we\'ve used. The guardrails and monitoring give us confidence in production deployments across all regions."',
      icon: 'fa-solid fa-chart-bar',
      role: 'Head of AI',
      company: 'Global Financial Services',
      stats: [
        { value: '99.9%', label: 'Uptime' },
      ],
      alignLeft: true,
    },
  ];

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initParticleBackground();
        this.scrollAnimationService.initScrollAnimations();
      }, 100);
    }
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

  getGradientStyle(colorClass: string): string {
    const gradientMap: { [key: string]: string } = {
      'from-blue-500 to-cyan-400': 'linear-gradient(to bottom right, #3b82f6, #22d3ee)',
      'from-purple-500 to-pink-400': 'linear-gradient(to bottom right, #a855f7, #f472b6)',
      'from-orange-500 to-amber-400': 'linear-gradient(to bottom right, #f97316, #fbbf24)',
      'from-green-500 to-emerald-400': 'linear-gradient(to bottom right, #22c55e, #34d399)',
      'from-rose-500 to-pink-400': 'linear-gradient(to bottom right, #f43f5e, #f472b6)',
      'from-indigo-500 to-violet-400': 'linear-gradient(to bottom right, #6366f1, #a78bfa)',
    };
    return gradientMap[colorClass] || 'linear-gradient(to bottom right, #3b82f6, #22d3ee)';
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

