import { Module } from '@nestjs/common';
import { UploadimgController } from './uploadimg.controller';
import { UploadimgService } from './uploadimg.service';
import { ImageModel } from '../common/models/models';
import { MongooseModule } from '@nestjs/mongoose';
import { ImgSchema } from './schema/uplodadimg.schema';

@Module({
  controllers: [UploadimgController],
  providers: [UploadimgService],
  imports: [MongooseModule.forFeatureAsync([{name: ImageModel.name, useFactory:()=>{
    return ImgSchema
  }}])]
})
export class UploadimgModule {}
