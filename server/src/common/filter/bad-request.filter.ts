import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Inject,
} from '@nestjs/common';

import { UserRequest } from '../types';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<UserRequest>();
    const res = ctx.getResponse<Response>();

    let exceptionMessage;
    const exceptionResponse = exception.getResponse();
    if (typeof exceptionResponse === 'string')
      exceptionMessage = exceptionResponse;
    else
      exceptionMessage = (exceptionResponse as { message: string[] }).message;

    this.logger.info('BadRequestException occurred', {
      exceptionMessage,
      userId: req.user?.id,
      api: `${req.method} ${req.path}`,
      query: req.query,
      body: req.body,
    });

    res.status(HttpStatus.BAD_REQUEST).json(exception.getResponse());
  }
}
