import { IsString } from "class-validator";

export class ImgDTO {
    @IsString()
    userUpload: string;
    @IsString()
    url: string;
    @IsString()
    date: string;
    @IsString()
    hour: string;
}