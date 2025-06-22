import { AnimalUnificadoRepository } from '../domain/animal-unificado.repository';
import { CreateAnimalUnificadoDto } from '../dto/create-animal-unificado.dto';

export class CreateAnimalUnificadoUseCase {
  constructor(private readonly repo: AnimalUnificadoRepository) {}

  async execute(dto: CreateAnimalUnificadoDto) {
    return this.repo.createAnimalUnificado(dto);
  }
} 