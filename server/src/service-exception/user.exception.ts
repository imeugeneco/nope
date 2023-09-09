import { ServiceException } from '~/common/types/exception/service.exception';

export class UserNotfoundException extends ServiceException {
  constructor() {
    super({
      code: 'userNotFound',
      type: 'toast',
    });
  }
}
