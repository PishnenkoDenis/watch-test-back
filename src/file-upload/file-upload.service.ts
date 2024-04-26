import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { FileUpload } from 'graphql-upload';
import * as path from 'path';
import { Filename } from 'src/models/filename.model';
import { pipeline } from 'stream/promises';
import * as uuid from 'uuid';

const url = process.env.UPLOAD_URL || 'http://localhost:4337/api/upload';

const filePath = path.resolve('./src/', 'upload');

@Injectable()
export class FileUploadService {
  async createFile(file: FileUpload): Promise<Filename> {
    try {
      const { createReadStream, filename } = file;
      const fileExt = filename.substring(filename.lastIndexOf('.') + 1);
      const name = `${uuid.v4()}-${Date.now()}.${fileExt}`;
      pipeline(
        createReadStream(),
        createWriteStream(path.join(filePath, name)),
      );
      return { filename: `${url}/${name}` };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
