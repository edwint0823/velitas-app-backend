import * as dotenv from 'dotenv';
import { Inject, Injectable } from '@nestjs/common';
import { Cloudinary } from '../../adapters/Cloudinary.provider';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';
import * as process from 'node:process';

dotenv.config();

@Injectable()
export class CloudinaryService {
  private v2: any;

  constructor(
    @Inject(Cloudinary)
    private cloudinary,
  ) {
    this.cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    this.v2 = cloudinary.v2;
  }

  async upload(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = this.v2.uploader.upload_stream({ folder: process.env.CLOUDINARY_FOLDER }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      Readable.from(file.buffer).pipe(upload);
    });
  }

  async destroy(publicId: string) {
    const realPublicID = `${process.env.CLOUDINARY_FOLDER}/${publicId}`;
    return await this.v2.uploader.destroy(realPublicID);
  }
}
