import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ContactController } from './contact/contact.controller';
import { ContactService } from './contact/contact.service';

@Module({
  imports: [],
  controllers: [AppController, ContactController],
  providers: [ContactService],
})
export class AppModule {}
