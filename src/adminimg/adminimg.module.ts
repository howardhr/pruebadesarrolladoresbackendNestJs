import { Module } from '@nestjs/common';
import { AdminimgService } from './adminimg.service';
import { AdminimgController } from './adminimg.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageModel } from 'src/common/models/models';
import { ImgSchema } from './schema/uplodadimg.schema';

@Module({
  providers: [AdminimgService],
  controllers: [AdminimgController],
  imports: [MongooseModule.forFeatureAsync([{name: ImageModel.name, useFactory:()=>{
    return ImgSchema
  }}])]
})
export class AdminimgModule {}
