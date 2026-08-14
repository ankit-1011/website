import { Component, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FaqComponent } from '../../components/faqs/faqs.component';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, RouterModule,FaqComponent],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent implements AfterViewInit {
  private scrollAnimationService = inject(ScrollAnimationService);
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with AI workflows',
      features: [
        'Up to 100 workflow executions/month',
        'Basic workflow creation studio',
        'Community support via Discord',
        '1 LLM API integration (OpenAI or Anthropic)',
        'Basic monitoring dashboard',
        'Email support (48-hour response)',
        'Public workflow templates',
        'Basic analytics'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      price: '$99',
      period: 'per month',
      description: 'For teams building production AI applications',
      features: [
        'Unlimited workflow executions',
        'Advanced workflow studio with version control',
        'Priority email support (24-hour response)',
        'Multiple LLM API integrations (20+ providers)',
        'Advanced monitoring & analytics',
        'Guardrails & compliance features',
        'Automatic fallback mechanisms',
        'Cost optimization tools & recommendations',
        'Multi-agent orchestration',
        'Custom integrations',
        'Advanced security features',
        'SLA: 99.9% uptime',
        'Team collaboration tools',
        'API access',
        'Webhook support'
      ],
      cta: 'Subscribe Now',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For organizations with advanced requirements',
      features: [
        'Everything in Pro plan',
        'Dedicated account manager',
        'Custom integrations & connectors',
        'SLA guarantees (99.99% uptime)',
        'On-premise deployment options',
        'Advanced security & compliance',
        'Custom training & onboarding',
        '24/7 priority support',
        'Custom guardrails & policies',
        'White-label options',
        'Advanced analytics & reporting',
        'Dedicated infrastructure',
        'Custom SLAs',
        'Quarterly business reviews',
        'Co-development opportunities'
      ],
      cta: 'Subscribe Now',
      popular: false
    }
  ];

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.scrollAnimationService.initScrollAnimations();
      }, 100);
    }
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

