import { IsString, IsNotEmpty, IsOptional, IsNumber, IsPositive, IsDateString } from 'class-validator';

export class CreateSaidaAnimalDto {
  @IsNumber()
  @IsPositive()
  Animal_ID: number;

  @IsString()
  @IsNotEmpty()
  Tipo_Saida: string; // venda, perda, abate

  @IsDateString()
  Data_Saida: string;

  @IsString()
  @IsOptional()
  Observacao?: string;

  @IsString()
  @IsOptional()
  Comprador?: string;

  @IsNumber()
  @IsOptional()
  Valor?: number;

  @IsString()
  @IsOptional()
  Motivo_Perda?: string;
} 