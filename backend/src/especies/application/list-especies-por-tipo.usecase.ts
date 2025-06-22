import { Inject, Injectable } from '@nestjs/common';
import { Especie } from '../domain/especie.entity';
import { EspecieRepository } from '../domain/especie.repository';

@Injectable()
export class ListEspeciesPorTipoUseCase {
  constructor(
    @Inject('EspecieRepository')
    private readonly especieRepository: EspecieRepository,
  ) {}

  async execute(tipo: string): Promise<Especie[]> {
    return this.especieRepository.findByTipo(tipo);
  }
} 