import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DynamicMailingModule } from './dynamic-mailing/dynamic-mailing.module';

@Module({
  imports: [AuthModule, DynamicMailingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
