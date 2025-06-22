import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRelacionamentoDto {
  @IsNumber()
  @IsOptional()
  Animal_Pai_ID?: number;

  @IsNumber()
  @IsOptional()
  Animal_Mae_ID?: number;

  @IsNumber()
  @IsOptional()
  Filhote_ID?: number;

  @IsString()
  @IsOptional()
  Tipo_Relacao?: string;
}
