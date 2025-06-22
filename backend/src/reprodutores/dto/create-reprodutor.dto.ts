import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';

export class CreateReprodutorDto {
  @IsString()
  @IsNotEmpty()
  Nome: string;

  @IsNumber()
  @IsOptional()
  Matriz_ID?: number;

  @IsDateString()
  @IsOptional()
  Data_Concepcao?: string;

  @IsDateString()
  @IsOptional()
  Data_Nascimento?: string;

  @IsString()
  @IsOptional()
  Ninhada_Descricao?: string;

  @IsString()
  @IsOptional()
  Perdas?: string;
}
