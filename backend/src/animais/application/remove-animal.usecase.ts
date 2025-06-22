import { AnimalRepository } from '../domain/animal.repository';

export class RemoveAnimalUseCase {
  constructor(private readonly repo: AnimalRepository) {}

  async execute(id: number) {
    return this.repo.remove(id);
  }
} 