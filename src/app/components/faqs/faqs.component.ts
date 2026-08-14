import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqComponent {
  openIndex: number | null = null;

  faqsData = [
   {
      question: 'Can I change plans later?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any charges. Downgrades take effect at the end of your current billing cycle.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and wire transfers for Enterprise plans. All payments are processed securely through Stripe.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes, the Pro plan includes a 14-day free trial with full access to all features. No credit card required to start. You can also use our Free plan indefinitely with no trial period needed.'
    },
    {
      question: 'Do you offer discounts for annual plans?',
      answer: 'Yes, annual plans receive a 20% discount compared to monthly billing. Enterprise customers can negotiate custom pricing based on volume and requirements. Contact our sales team for details.'
    },
    {
      question: 'What happens if I exceed my plan limits?',
      answer: 'For Free plan users, you\'ll be notified when approaching limits and can upgrade. Pro and Enterprise plans include unlimited executions, so you won\'t face overage charges.'
    },
    {
      question: 'Can I get a custom plan?',
      answer: 'Yes, Enterprise customers can get fully customized plans tailored to their specific needs, including custom pricing, SLAs, and feature sets. Contact our sales team to discuss your requirements.'
    }
  ];

  toggleFaq(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }
}
