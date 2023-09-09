import { Language, toLiteral } from '../../lib';
import { ErrorCode, getDefaultMessage } from './error.code';
import { getMessageByKey, MessageKey } from './message.key';

export const ServiceExceptionType = {
  TOAST: toLiteral('toast'),
  ALERT: toLiteral('alert'),
};

type ServiceExceptionStringType =
  (typeof ServiceExceptionType)[keyof typeof ServiceExceptionType];

export type ServiceErrorJson = {
  code: string;
  message: string;
  type: ServiceExceptionStringType;
  title: string | null;
};

export class ServiceException extends Error {
  private _message: string | null;
  private _code: ErrorCode;
  private _type: ServiceExceptionStringType;
  private _messageKey: MessageKey | null;
  private _title: string | null;

  constructor(exception: {
    code: ErrorCode;
    type: ServiceExceptionStringType;
    message?: string;
    messageKey?: MessageKey;
    title?: string;
    lang?: Language;
  }) {
    super();
    this._code = exception.code;
    this._type = exception.type;
    this._messageKey = exception.messageKey ?? null;
    this._message = exception.message ?? null;
    this._title = exception.title ?? null;
  }

  get code() {
    return this._code;
  }

  get message() {
    if (this._messageKey) return getMessageByKey(this._messageKey);
    if (this._message) return this._message;

    return getDefaultMessage(this._code);
  }

  get messageKey() {
    return this._messageKey;
  }

  get type() {
    return this._type;
  }

  get title() {
    return this._title;
  }

  toJson(): ServiceErrorJson {
    const message = this._messageKey
      ? getMessageByKey(this._messageKey)
      : this.message;

    return {
      code: this.code,
      message,
      type: this.type,
      title: this._title,
    };
  }
}
