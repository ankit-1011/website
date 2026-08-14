import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { ContactFormDto } from './contact.dto';

@Injectable()
export class ContactService {
  private resend: Resend;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('WARNING: RESEND_API_KEY is not set in environment variables');
    }
    this.resend = new Resend(apiKey);
  }

  async sendDiOnceEmail({
    name,
    email,
    phone,
    companyName,
    message,
  }: ContactFormDto) {
    // Sanitize HTML to prevent XSS
    const sanitize = (str: string | undefined): string => {
      if (!str) return '';
      return str
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
    };

    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color:#0D47A1;">🚀 New Contact Request – diOnce</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-top: 20px;">
          <p><strong>Name:</strong> ${sanitize(name)}</p>
          <p><strong>Email:</strong> ${sanitize(email)}</p>
          <p><strong>Phone:</strong> ${sanitize(phone) || 'N/A'}</p>
          <p><strong>Company:</strong> ${sanitize(companyName) || 'N/A'}</p>
          <p><strong>Message:</strong><br/>${sanitize(message) || 'N/A'}</p>
        </div>
      </div>
    `;

    const userReplyHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color:#00796B;">Thank you for contacting diOnce 🌟</h2>
        <p>Hi ${sanitize(name)},</p>
        <p>Thank you for reaching out! Our team will connect with you within 24–48 hours.</p>
        <p>Best Regards,<br/>diOnce Team</p>
      </div>
    `;

    const adminEmail = process.env.ADMIN_EMAIL || 'hatagale99@gmail.com';
    const fromEmail = process.env.FROM_EMAIL || 'diOnce <onboarding@resend.dev>';

    // Send to Admin
    const adminResult = await this.resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `New Contact Request – ${sanitize(name)}`,
      html: adminEmailHtml,
    });

    // Auto-reply to User
    const userResult = await this.resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'We received your message ✔',
      html: userReplyHtml,
    });

    return {
      adminEmailSent: !!adminResult.data,
      userEmailSent: !!userResult.data,
    };
  }
}
