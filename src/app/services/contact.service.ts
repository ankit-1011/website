import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, from, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  message?: string;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
  result?: any;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly serviceID = environment.emailjs.serviceID;
  private readonly templateID = environment.emailjs.templateID;
  private readonly publicKey = environment.emailjs.publicKey;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      if (this.publicKey) {
        emailjs.init(this.publicKey);
      }
    }
  }

  sendContactForm(formData: ContactFormData): Observable<ContactResponse> {
    if (!isPlatformBrowser(this.platformId)) {
      return throwError(() => ({
        error: { message: 'Email service is only available in browser' }
      }));
    }

    const emailContent = this.formatEmailContent(formData);

    const templateParams: { [key: string]: string } = {
      email: formData.email,
      to_email: 'Sales@DIonce.AI',
      from_name: 'Dionce-Email-Agent',
      reply_to: formData.email,
      user_name: formData.name,
      name: formData.name,
      user_email: formData.email,
      user_phone: formData.phone || 'Not provided',
      phone: formData.phone || 'Not provided',
      company_name: formData.companyName || 'Not provided',
      company: formData.companyName || 'Not provided',
      message: formData.message || 'No message provided',
      email_content: emailContent,
      contact_details: emailContent,
      subject: 'New Contact Form Submission - Dionce AI'
    };

    return from(
      emailjs.send(
        this.serviceID,
        this.templateID,
        templateParams
      )
    ).pipe(
      map((response) => {
        return {
          success: true,
          message: 'Email sent successfully!',
          result: response
        } as ContactResponse;
      }),
      catchError((error) => {
        console.error('EmailJS Error:', error);
        let errorMessage = 'Failed to send message. Please try again later.';
        
        if (error.text) {
          errorMessage = error.text;
        } else if (error.message) {
          errorMessage = error.message;
        } else if (error.status === 0 || error.status === 400) {
          if (error.text?.includes('public key')) {
            errorMessage = 'EmailJS Public Key is required. Please configure it in contact.service.ts';
          } else {
            errorMessage = error.text || 'Invalid request. Please check your EmailJS configuration.';
          }
        }
        
        return throwError(() => ({
          error: {
            message: errorMessage,
            status: error.status || 500
          }
        }));
      })
    );
  }

  private formatEmailContent(formData: ContactFormData): string {
    let content = '';
    content += `Name: ${formData.name}\n`;
    content += `Email: ${formData.email}\n`;
    content += `Phone: ${formData.phone || 'Not provided'}\n`;
    content += `Company Name: ${formData.companyName || 'Not provided'}\n`;
    content += `Message: ${formData.message || 'No message provided'}\n`;
    
    return content;
  }
}
