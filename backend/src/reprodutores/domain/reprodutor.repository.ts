import { Reprodutor } from './reprodutor.entity';

export interface ReprodutorRepository {
  create(createReprodutorDto: any): Promise<Reprodutor>;
  findAll(): Promise<Reprodutor[]>;
  findOne(id: number): Promise<Reprodutor | null>;
  update(id: number, updateReprodutorDto: any): Promise<Reprodutor>;
  remove(id: number): Promise<void>;
} 