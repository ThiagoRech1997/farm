import { IsString, IsNotEmpty, IsOptional, IsNumber, IsPositive } from 'class-validator';

export class CreateEspecieDto {
  @IsString()
  @IsNotEmpty()
  Nome: string;

  @IsString()
  @IsOptional()
  Nome_Cientifico?: string;

  @IsString()
  @IsOptional()
  Descricao?: string;

  @IsString()
  @IsOptional()
  Tipo_Animal?: string;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  Expectativa_Vida?: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  Peso_Adulto_Min?: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  Peso_Adulto_Max?: number;
} 