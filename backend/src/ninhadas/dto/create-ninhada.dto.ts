import { IsNumber, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateNinhadaDto {
  @IsNumber()
  @IsOptional()
  Matriz_ID?: number;

  @IsNumber()
  @IsOptional()
  Reprodutor_ID?: number;

  @IsDateString()
  @IsOptional()
  Data_Concepcao?: string;

  @IsDateString()
  @IsOptional()
  Data_Nascimento?: string;

  @IsString()
  @IsOptional()
  Descricao?: string;

  @IsString()
  @IsOptional()
  Perdas?: string;
}
