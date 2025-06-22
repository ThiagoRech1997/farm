import { Animal } from './animal.entity';

export interface AnimalRepository {
  findById(id: number): Promise<Animal | null>;
  findAll(): Promise<Animal[]>;
  save(animal: Animal): Promise<Animal>;
  update(animal: Animal): Promise<Animal>;
  remove(id: number): Promise<void>;
  // outros métodos conforme necessidade
} 