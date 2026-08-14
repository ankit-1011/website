import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      success: true,
      message: 'Dionce Backend API is running!',
      version: '1.0.0',
      endpoints: {
        contact: {
          url: '/api/contact',
          methods: ['GET', 'POST'],
          description: 'Contact form endpoint'
        }
      }
    };
  }
}
