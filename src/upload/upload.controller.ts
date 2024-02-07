import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  BadRequestException,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import * as path from 'path';
import Config from 'src/_common/config/config';
@Controller(['admin/upload', 'customer/upload'])
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post(':param')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const param = req.params.param;
          let folderPath = `./uploads/${param}/`;

          if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true }); // recursive: true ensures that all nested folders are created
          }
          cb(null, folderPath);
        },

        filename: (req, file, cb) => {
          const randomName =
            Math.random().toString(36).slice(2, 14) +
            Math.random().toString(36).slice(2, 14);
          const newFilename = `${randomName}${extname(file.originalname)}`;
          cb(null, newFilename);
        },
      }),
      limits: { fileSize: 1024 * 1024 }, // 1 MB limit
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          // allow storing only jpeg, png, and gif
          cb(null, true);
        } else {
          cb(
            new BadRequestException(['Image Only image files are allowed!']),
            false,
          );
        }
      },
    }),
  )
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 })],
      }),
    )
    image: Express.Multer.File,
  ) {
    return {
      url: image['path'],
      preview: `${Config.APP_PATH_URL}/${image['path']}`,
    };
  }
}
