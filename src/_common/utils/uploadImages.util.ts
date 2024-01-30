import { extname } from 'path';
import { diskStorage } from 'multer';

export const generateFileName = (file) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  return name + randomName + fileExtName;
};

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
    req.fileValidationError =
      'only these extensions are allowed jpg,jpeg,png and gif';
    return callback(new Error('Invalid file type'), false);
  }
  callback(null, true);
};

export const getFileInterceptorObj = () => {
  return {
    storage: diskStorage({
      destination: './uploads/productImages',
      filename: generateFileName,
    }),
    fileFilter: imageFileFilter,
  };
};
