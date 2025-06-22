import { Inject, Injectable } from '@nestjs/common';
import { Especie } from '../domain/especie.entity';
import { EspecieRepository } from '../domain/especie.repository';

@Injectable()
export class ListEspeciesUseCase {
  constructor(
    @Inject('EspecieRepository')
    private readonly especieRepository: EspecieRepository,
  ) {}

  async execute(): Promise<Especie[]> {
    return this.especieRepository.findAll();
  }
} 