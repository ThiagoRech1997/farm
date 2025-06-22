import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateHistoricoSaudeDto {
  @IsNumber()
  @IsNotEmpty()
  Animal_ID: number;

  @IsDateString()
  @IsOptional()
  Data_Evento?: string;

  @IsString()
  @IsNotEmpty()
  Descricao: string;

  @IsString()
  @IsOptional()
  Tratamento?: string;

  @IsString()
  @IsOptional()
  Veterinario?: string;
}
