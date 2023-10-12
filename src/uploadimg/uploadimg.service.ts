import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ImageModel } from '../common/models/models';
import { InjectModel } from '@nestjs/mongoose';
import { Iimage } from 'src/common/interfaces/image.interface';
import { ImgDTO } from './dto/uplodaimg.dto';
import { v4 as uuidv4 } from 'uuid';
import * as sharp from 'sharp';
import * as fs from 'fs';


@Injectable()
export class UploadimgService {
  constructor(@InjectModel(ImageModel.name) private readonly model: Model<Iimage>) { }
  async saveImage(file: Express.Multer.File) {
    const uniqueFileName = uuidv4() + '.png';
    const outputPath = `./uploads/${uniqueFileName}`;
    await sharp(file.path)
      .toFormat('png')
      .toFile(outputPath);
    fs.unlinkSync(file.path);
    return {
      uniqueFileName: uniqueFileName,
      outputPath: outputPath,
    };
  }
  

  async createDataImg(imgDTO: ImgDTO): Promise<Iimage> {
    try {
      const img = new this.model(imgDTO)
      return await img.save()
    } catch (error) {
      throw new HttpException('Error al crear la imagen.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}


