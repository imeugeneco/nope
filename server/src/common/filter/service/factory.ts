import { Response } from 'express';
import { Logger } from 'winston';
import { UserRequest } from '~/common/types';
import { ServiceException } from '~/common/types/exception/service.exception';

import { ArgumentsHost, ContextType } from '@nestjs/common';

export function getServiceExceptionHandler(contextType: ContextType) {
  if (contextType === 'http') return httpExceptionHandler;
  return null;
}

function httpExceptionHandler(
  exception: ServiceException,
  host: ArgumentsHost,
  logger?: Logger,
) {
  const ctx = host.switchToHttp();
  const req = ctx.getRequest<UserRequest>();
  const res = ctx.getResponse<Response>();

  logger?.info(`${exception.code} occurred`, {
    exceptionMessage: exception.message,
    userId: req.user?.id,
    api: `${req.method} ${req.path}`,
  });

  res.status(200).json({
    error: exception.toJson(),
  });
}
