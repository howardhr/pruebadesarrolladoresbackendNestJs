import { IsDate, IsOptional } from 'class-validator';

export class SearchDatesDto {
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;
}
