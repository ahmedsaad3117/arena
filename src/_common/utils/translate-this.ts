import { I18nContext } from 'nestjs-i18n';

export const translateThis = (message: string): string => {
  // const i18n = UserRequest.geti18();
  const i18n = I18nContext.current();

  let translatedMessage = i18n.t(message) as string;
  return translatedMessage;
};
