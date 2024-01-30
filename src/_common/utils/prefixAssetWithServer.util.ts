import Config from "../config/config";

export const prefixImageWithServer = (url: string): string => {
  const fullUrl = url ? `${Config.APP_PATH_URL}/${url}` : url;
  return fullUrl;
};
