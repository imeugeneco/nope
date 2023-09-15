import { Language } from '../../lib';

const KeyMessage = {
  postNotFound: {
    en: 'The post has been deleted or does not exist.',
    ko: '삭제되었거나 존재하지 않는 게시글이에요.',
  },
  wordNotFound: {
    en: 'Word could not be found.',
    ko: '해당 단어를 찾을 수 없어요.',
  },
  wordOfTheDayNotFound: {
    en: 'Word of the day could not be found for this date.',
    ko: '해당 날짜의 단어를 찾을 수 없어요.',
  },
};

export type MessageKey = keyof typeof KeyMessage;

export const getMessageByKey = (
  key: MessageKey,
  lang: Language = 'en',
): string => {
  return KeyMessage[key][lang];
};
