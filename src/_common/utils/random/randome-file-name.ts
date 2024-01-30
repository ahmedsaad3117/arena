import { extname } from 'path';

export const generateUniqueFileName = (file) => {
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');
  const randomString = Math.random().toString(36).substring(2, 8);
  const fileExtension = extname(file.originalname);

  return `${timestamp}_${randomString}${fileExtension}`;
};
