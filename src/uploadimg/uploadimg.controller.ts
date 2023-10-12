import { Body, Controller, Post, UploadedFile, UseInterceptors, Request, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadimgService } from './uploadimg.service';
import { ImgDTO } from './dto/uplodaimg.dto';
import * as moment from 'moment';

@Controller('uploadimg')
export class UploadimgController {
  constructor(private readonly uploadimgService: UploadimgService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image', {
    dest: './uploads',
  }))
  async uploadImage(@UploadedFile() fileSend: Express.Multer.File, @Body() imgDTO: ImgDTO, @Request() req) {
    if (!fileSend) {
      throw new Error('No se obtuvo ninguna imagen.');
    }
    try {
      const convertedImage = await this.uploadimgService.saveImage(fileSend);
      const uploadDateTime = moment();
      const uploaderName = imgDTO.userUpload;
      imgDTO.date = uploadDateTime.format('YYYY-MM-DD');
      imgDTO.hour = uploadDateTime.format('HH:mm:ss');
      imgDTO.userUpload = uploaderName;
      imgDTO.url = `http://howard/uploads/${convertedImage.uniqueFileName}`;
      return this.uploadimgService.createDataImg(imgDTO);
    } catch (error) {
      throw new HttpException('Error al crear la imagen.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
