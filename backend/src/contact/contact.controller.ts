import { Controller, Post, Get, Body, HttpException, HttpStatus, ValidationPipe, UsePipes } from '@nestjs/common';
import { ContactFormDto } from './contact.dto';
import { ContactService } from './contact.service';

@Controller('api/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  getStatus() {
    return {
      success: true,
      message: 'Contact API is running!',
      endpoint: '/api/contact',
      method: 'POST',
      description: 'Send contact form data to this endpoint'
    };
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false }))
  async handleContactForm(@Body() body: ContactFormDto) {
    // Validate required fields
    if (!body.name || !body.email) {
      throw new HttpException(
        { success: false, error: 'Name and email are required fields' },
        HttpStatus.BAD_REQUEST
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      throw new HttpException(
        { success: false, error: 'Please provide a valid email address' },
        HttpStatus.BAD_REQUEST
      );
    }

    try {
      const result = await this.contactService.sendDiOnceEmail(body);
      return { 
        success: true, 
        message: 'Contact form submitted successfully',
        result 
      };
    } catch (error: any) {
      console.error('Email Error:', error);
      
      // Provide more specific error messages
      let errorMessage = 'Failed to send email. Please try again later.';
      if (error.message?.includes('API key')) {
        errorMessage = 'Email service configuration error. Please contact support.';
      } else if (error.message?.includes('Invalid email')) {
        errorMessage = 'Invalid email address provided.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      throw new HttpException(
        { success: false, error: errorMessage },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
