import { Language } from '../../lib';

const KeyMessage = {
  postNotFound: {
    en: 'The post has been deleted or does not exist.',
    ko: '삭제되었거나 존재하지 않는 게시글이에요.',
  },
};

export type MessageKey = keyof typeof KeyMessage;

export const getMessageByKey = (
  key: MessageKey,
  lang: Language = 'en',
): string => {
  return KeyMessage[key][lang];
};
