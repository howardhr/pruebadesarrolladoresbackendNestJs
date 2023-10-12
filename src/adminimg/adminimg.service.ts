import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ImageModel } from '../common/models/models';
import { Iimage } from '../common/interfaces/image.interface';

@Injectable()
export class AdminimgService {
  constructor(@InjectModel(ImageModel.name) private readonly model: Model<Iimage> ) {}

  async searchImagesByDates(startDate: Date, endDate: Date): Promise<Iimage[]> {
    const allImages = await this.model.find().exec();
  
    const filteredImages = allImages.filter((image) => {
      const imageDate = new Date(image.date);
      return (
        (!startDate || imageDate >= startDate) &&
        (!endDate || imageDate <= endDate)
      );
    });
  
    return filteredImages;
  }
  async getAllImagesGroupedByHour(): Promise<{ hour: string; count: number; urls: string[]; uploaders: string[] }[]> {
    const images = await this.model.find().exec();
  
    const groupedImages: { [hour: string]: { count: number; urls: string[]; uploaders: string[] } } = {};
  
    images.forEach((image: any) => {
      const imageHour = image.hour; 
      if (!groupedImages[imageHour]) {
        groupedImages[imageHour] = { count: 0, urls: [], uploaders: [] };
      }
      groupedImages[imageHour].count += 1;
      groupedImages[imageHour].urls.push(image.url);
      groupedImages[imageHour].uploaders.push(image.userUpload);
    });
  
    const result = Object.keys(groupedImages).map((hour) => ({
      hour,
      count: groupedImages[hour].count,
      urls: groupedImages[hour].urls,
      uploaders: groupedImages[hour].uploaders,
    }));
  
    return result;
  }
  
  

  
}
