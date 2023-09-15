import { ServiceException } from '~/common/types/exception/service.exception';

export class WordNotFoundException extends ServiceException {
  constructor() {
    super({
      code: 'recordNotFound',
      messageKey: 'wordNotFound',
      type: 'toast',
    });
  }
}

export class WordOfTheDayNotfoundException extends ServiceException {
  constructor() {
    super({
      code: 'recordNotFound',
      messageKey: 'wordOfTheDayNotFound',
      type: 'toast',
    });
  }
}
