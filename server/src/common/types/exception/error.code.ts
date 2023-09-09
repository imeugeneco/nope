import { Language } from '../../lib';

const DefaultMessages = {
  defaultMessage: {
    en: 'An error occurred.',
    ko: '오류가 발생했어요.',
  },
  userNotFound: {
    en: 'User information could not be found.',
    ko: '유저 정보를 찾을 수 없어요.',
  },
  recordNotFound: {
    en: 'The requested record was not found.',
    ko: '해당 내용을 찾을 수 없어요.',
  },
  recordAlreadyExists: {
    en: 'The record already exists.',
    ko: '이미 존재하는 내용이에요.',
  },
  noPermission: {
    en: 'You do not have permission to do this.',
    ko: '권한이 없어요.',
  },
  badRequest: {
    en: 'The request was invalid or malformed.',
    ko: '잘못된 요청이에요.',
  },
};

export type ErrorCode = keyof typeof DefaultMessages;

export const getDefaultMessage = (
  code: ErrorCode,
  lang: Language = 'en',
): string => {
  return DefaultMessages[code][lang];
};
