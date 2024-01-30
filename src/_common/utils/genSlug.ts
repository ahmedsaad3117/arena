export const generateSlugHelper = (name: string): string => {
  const slug = name.trim().toLowerCase().replace(' ', '_');
  return slug;
};
