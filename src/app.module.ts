import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { UploadimgModule } from './uploadimg/uploadimg.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminimgModule } from './adminimg/adminimg.module';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath:['.env'], isGlobal: true}), 
    UploadimgModule,
    MongooseModule.forRoot(process.env.URI_MONGODB),
    AdminimgModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
