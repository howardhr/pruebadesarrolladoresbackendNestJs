import { BadRequestException, Controller, Get, Param, Query } from '@nestjs/common';
import { AdminimgService } from './adminimg.service';

@Controller('adminimg')
export class AdminimgController {
    constructor(private readonly imageService: AdminimgService) {}

    @Get('search/:startDate/:endDate')
    async searchImagesByDates(
      @Param('startDate') startDateStr: string,
      @Param('endDate') endDateStr: string,
    ) {
      const startDate = new Date(startDateStr);
      const endDate = new Date(endDateStr);
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new BadRequestException('Fechas no válidas.');
      }
      return this.imageService.searchImagesByDates(startDate, endDate);
    }
    
    @Get('groupByHour')
  async getImagesGroupedByHour() {
    try {
      const imagesByHour = await this.imageService.getAllImagesGroupedByHour();
      return imagesByHour;
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener imágenes agrupadas por hora.');
    }
  }
    


}
