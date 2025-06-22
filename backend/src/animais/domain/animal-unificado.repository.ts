import { CreateAnimalUnificadoDto } from '../dto/create-animal-unificado.dto';

export interface AnimalUnificadoRepository {
  createAnimalUnificado(dto: CreateAnimalUnificadoDto): Promise<any>;
  findAnimaisParaPais(): Promise<any[]>;
  findAnimalCompleto(id: number): Promise<any>;
} 