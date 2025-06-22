import { AnimalRepository } from '../domain/animal.repository';

export class ListAnimalsUseCase {
  constructor(private readonly repo: AnimalRepository) {}

  async execute() {
    return this.repo.findAll();
  }
} 