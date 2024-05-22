import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DynamicMailingModule } from './dynamic-mailing/dynamic-mailing.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DynamicMailingModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
