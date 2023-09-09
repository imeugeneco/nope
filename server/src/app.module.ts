import { WinstonModule } from 'nest-winston';

import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BadRequestExceptionFilter } from './common/filter/bad-request.filter';
import { ServiceExceptionFilter } from './common/filter/service.filter';
import { winstonConfig } from './config/winston.config';

@Module({
  imports: [WinstonModule.forRoot(winstonConfig)],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ServiceExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: BadRequestExceptionFilter,
    },
  ],
})
export class AppModule {}
