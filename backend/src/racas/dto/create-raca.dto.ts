import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRacaDto {
  @IsString()
  @IsNotEmpty()
  Nome: string;

  @IsString()
  @IsOptional()
  Descricao?: string;
}
