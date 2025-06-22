import { IsString, IsNotEmpty, IsOptional, IsDateString, IsNumber, IsPositive } from 'class-validator';

export class CreateAnimalUnificadoDto {
  // Dados do Animal
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

  // Espécie e Raça
  @IsNumber()
  @IsOptional()
  @IsPositive()
  Especie_ID?: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  Raca_ID?: number;

  // Peso Inicial
  @IsNumber()
  @IsPositive()
  PesoInicial: number;

  @IsDateString()
  @IsOptional()
  DataPesagem?: string;

  // Relacionamentos (IDs dos pais)
  @IsNumber()
  @IsOptional()
  Animal_Pai_ID?: number;

  @IsNumber()
  @IsOptional()
  Animal_Mae_ID?: number;
} 