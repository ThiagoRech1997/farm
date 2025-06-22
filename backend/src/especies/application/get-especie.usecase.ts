import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Especie } from '../domain/especie.entity';
import { EspecieRepository } from '../domain/especie.repository';

@Injectable()
export class GetEspecieUseCase {
  constructor(
    @Inject('EspecieRepository')
    private readonly especieRepository: EspecieRepository,
  ) {}

  async execute(id: number): Promise<Especie> {
    const especie = await this.especieRepository.findOne(id);
    if (!especie) {
      throw new NotFoundException(`Espécie com ID ${id} não encontrada.`);
    }
    return especie;
  }
} 