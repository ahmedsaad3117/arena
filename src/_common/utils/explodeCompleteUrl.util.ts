export const explodeCompleteUrl = (url: string) => {
  let splitter = "uploads";
  let link = splitter + url.split(splitter)[1];
  return link;
};
