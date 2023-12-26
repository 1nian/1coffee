// src/minio/minio.controller.ts

import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { MinioService } from '../minio/minio.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('minio')
export class MinioController {
  constructor(private readonly minioService: MinioService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any) {
    let bucketName = '1coffee-image';
    let objectName = file.originalname;
    let data = file.buffer;

    await this.minioService.uploadFile(bucketName, objectName, data);

    let fileUrl = await this.minioService.getFileAccessUrl(
      bucketName,
      objectName,
    );
    return {
      message: 'File uploaded successfully',
      fileUrl,
    };
  }
}
