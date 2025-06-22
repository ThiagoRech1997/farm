import { Pesagem } from './pesagem.entity';

export type PesagemComNomeAnimal = Pesagem & { animalNome: string };

export interface PesagemRepository {
  create(createPesagemDto: any): Promise<Pesagem>;
  findAll(): Promise<Pesagem[]>;
  findAllWithAnimalNames(): Promise<PesagemComNomeAnimal[]>;
  findOne(id: number): Promise<Pesagem | null>;
  update(id: number, updatePesagemDto: any): Promise<Pesagem>;
  remove(id: number): Promise<void>;
} 