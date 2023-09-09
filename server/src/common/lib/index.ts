export const LOGGER_FORMAT =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status ":referrer" ":user-agent" - :response-time ms';

export const toLiteral = <V extends string>(v: V) => v;

export type Language = 'en' | 'ko';
