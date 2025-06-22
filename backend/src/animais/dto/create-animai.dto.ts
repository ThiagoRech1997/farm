import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateAnimaiDto {
  @IsString()
  @IsNotEmpty()
  Nome: string;

  @IsString()
  @IsOptional()
  Cor?: string;

  @IsString()
  @IsOptional()
  Sexo?: string;

  @IsDateString()
  @IsOptional()
  Data_Nascimento?: string;

  @IsString()
  @IsOptional()
  Observacoes?: string;
}
