import { Relacionamento } from './relacionamento.entity';

export interface CreateRelacionamentoDto {
  animalPaiId: number;
  animalMaeId: number;
  filhoteId: number;
  tipoRelacao: string;
}

export interface UpdateRelacionamentoDto {
  animalPaiId?: number;
  animalMaeId?: number;
  filhoteId?: number;
  tipoRelacao?: string;
}

export interface RelacionamentoRepository {
  create(data: CreateRelacionamentoDto): Promise<Relacionamento>;
  findAll(): Promise<Relacionamento[]>;
  findById(id: number): Promise<Relacionamento | null>;
  update(id: number, data: UpdateRelacionamentoDto): Promise<Relacionamento | null>;
  remove(id: number): Promise<void>;
}