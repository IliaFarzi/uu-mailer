import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { localConfig } from './local-config/local-config';
@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${localConfig.mongodbSetup.username}:${localConfig.mongodbSetup.password}@${localConfig.mongodbSetup.host}:${localConfig.mongodbSetup.port}`),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}