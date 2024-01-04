// src/minio/minio.service.ts

import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';

@Injectable()
export class MinioService {
  private readonly minioClient: Minio.Client;

  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: '82.157.233.6',
      port: 9000,
      useSSL: false,
      accessKey: 'minioadmin',
      secretKey: 'minioadmin',
    });
  }

  async uploadFile(bucketName: string, objectName: string, data: Buffer) {
    await this.minioClient.putObject(bucketName, objectName, data);
  }

  getFileAccessUrl(bucketName: string, objectName: string) {
    // Replace 'expiryTimeInSeconds' with the desired expiry time for the URL
    const expiryTimeInSeconds = 60;

    // Generate a presigned URL for the file
    const fileUrl = this.minioClient.presignedGetObject(
      bucketName,
      objectName,
      expiryTimeInSeconds,
    );

    return fileUrl;
  }
}
