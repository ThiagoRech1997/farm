import { Inject, Injectable } from '@nestjs/common';
import { EspecieRepository } from '../domain/especie.repository';

@Injectable()
export class RemoveEspecieUseCase {
  constructor(
    @Inject('EspecieRepository')
    private readonly especieRepository: EspecieRepository,
  ) {}

  async execute(id: number): Promise<void> {
    return this.especieRepository.remove(id);
  }
} 