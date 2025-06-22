import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreatePesagenDto {
  @IsNumber()
  @IsNotEmpty()
  Animal_ID: number;

  @IsDateString()
  @IsOptional()
  Data_Pesagem?: string;

  @IsNumber()
  @IsNotEmpty()
  Peso: number;
}
