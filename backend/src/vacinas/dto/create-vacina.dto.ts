import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateVacinaDto {
  @IsNumber()
  @IsNotEmpty()
  Animal_ID: number;

  @IsString()
  @IsNotEmpty()
  Nome_Vacina: string;

  @IsDateString()
  @IsOptional()
  Data_Aplicacao?: string;

  @IsDateString()
  @IsOptional()
  Proxima_Aplicacao?: string;

  @IsString()
  @IsOptional()
  Veterinario?: string;
}
