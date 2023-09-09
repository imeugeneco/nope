import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { ArgumentsHost, Catch, ExceptionFilter, Inject } from '@nestjs/common';

import { ServiceException } from '../types/exception/service.exception';
import { getServiceExceptionHandler } from './service/factory';

@Catch(ServiceException)
export class ServiceExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  catch(exception: ServiceException, host: ArgumentsHost) {
    const contextType = host.getType();

    const handler = getServiceExceptionHandler(contextType);
    return handler?.(exception, host, this.logger);
  }
}
