import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AnimalUnificadoRepository } from '../domain/animal-unificado.repository';

@Injectable()
export class GetAnimalCompletoUseCase {
  constructor(
    @Inject('AnimalUnificadoRepository')
    private readonly repository: AnimalUnificadoRepository,
  ) {}

  async execute(id: number): Promise<any> {
    const animal = await this.repository.findAnimalCompleto(id);
    if (!animal) {
      throw new NotFoundException(`Animal com ID ${id} não encontrado.`);
    }
    return animal;
  }
} 