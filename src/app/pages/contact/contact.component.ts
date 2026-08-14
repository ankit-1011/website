import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ContactService } from '../../services/contact.service';
import { ToastService } from '../../services/toast.service';
import { ScrollAnimationService } from '../../services/scroll-animation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  host: { class: 'contact-page' }
})
export class ContactComponent implements OnInit, AfterViewInit {
  @ViewChild('particleCanvas', { static: false }) particleCanvas?: ElementRef<HTMLCanvasElement>;
  
  private contactService = inject(ContactService);
  private toastService = inject(ToastService);
  private fb = inject(FormBuilder);
  private scrollAnimationService = inject(ScrollAnimationService);
  private platformId = inject(PLATFORM_ID);
  private route = inject(ActivatedRoute);
  
  contactForm!: FormGroup;
  isSubmitting = false;

  contactInfo = [
    {
      icon: 'fa-solid fa-envelope',
      label: 'Email',
      value: 'Sales@DIonce.AI',
      href: 'mailto:Sales@DIonce.AI',
    },
    {
      icon: 'fa-solid fa-map-marker-alt',
      label: 'Headquarters',
      value: 'Princeton, New Jersey',
    },
    {
      icon: 'fa-solid fa-building',
      label: 'Development Center',
      value: 'Bangalore, India',
    },
  ];

  ngOnInit(): void {
    this.initializeForm();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initParticleBackground();
        this.scrollAnimationService.initScrollAnimations();
        
        // Check if we need to scroll to form (from CTA button)
        this.route.fragment.subscribe(fragment => {
          if (fragment === 'contact-form') {
            setTimeout(() => {
              const formElement = document.getElementById('contact-form');
              if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 300);
          }
        });
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

  private initializeForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      company: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid || this.isSubmitting) {
      this.markFormGroupTouched(this.contactForm);
      return;
    }

    this.isSubmitting = true;
    const formData = this.contactForm.value;

    this.contactService.sendContactForm(formData).subscribe({
      next: (response) => {
        this.toastService.success('Message sent! We\'ll get back to you as soon as possible.');
        this.contactForm.reset();
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Error submitting form:', error);
        const errorMessage = error?.error?.error?.message || error?.error?.error || error?.error?.message || 'Failed to send. Please try again later.';
        this.toastService.error(errorMessage);
        this.isSubmitting = false;
      }
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const control = this.contactForm.get(fieldName);
    if (control?.hasError('required') && control?.touched) {
      return `${this.getFieldLabel(fieldName)} is required`;
    }
    if (control?.hasError('email') && control?.touched) {
      return 'Please enter a valid email address';
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      name: 'Name',
      email: 'Email',
      company: 'Company',
      message: 'Message'
    };
    return labels[fieldName] || fieldName;
  }
}

