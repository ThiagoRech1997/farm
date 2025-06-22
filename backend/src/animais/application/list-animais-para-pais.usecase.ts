import { Inject, Injectable } from '@nestjs/common';
import { AnimalUnificadoRepository } from '../domain/animal-unificado.repository';

@Injectable()
export class ListAnimaisParaPaisUseCase {
  constructor(
    @Inject('AnimalUnificadoRepository')
    private readonly repository: AnimalUnificadoRepository,
  ) {}

  async execute(): Promise<any[]> {
    return this.repository.findAnimaisParaPais();
  }
} 