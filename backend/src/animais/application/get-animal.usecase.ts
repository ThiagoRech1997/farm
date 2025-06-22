import { AnimalRepository } from '../domain/animal.repository';

export class GetAnimalUseCase {
  constructor(private readonly repo: AnimalRepository) {}

  async execute(id: number) {
    return this.repo.findById(id);
  }
} 