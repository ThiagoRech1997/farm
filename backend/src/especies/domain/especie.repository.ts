import { CreateEspecieDto } from '../dto/create-especie.dto';
import { UpdateEspecieDto } from '../dto/update-especie.dto';
import { Especie } from './especie.entity';

export interface EspecieRepository {
  create(createEspecieDto: CreateEspecieDto): Promise<Especie>;
  findAll(): Promise<Especie[]>;
  findOne(id: number): Promise<Especie | null>;
  findByTipo(tipo: string): Promise<Especie[]>;
  update(id: number, updateEspecieDto: UpdateEspecieDto): Promise<Especie>;
  remove(id: number): Promise<void>;
} 