import { Inject, Injectable } from '@nestjs/common';
import { CreateEspecieDto } from '../dto/create-especie.dto';
import { Especie } from '../domain/especie.entity';
import { EspecieRepository } from '../domain/especie.repository';

@Injectable()
export class CreateEspecieUseCase {
  constructor(
    @Inject('EspecieRepository')
    private readonly especieRepository: EspecieRepository,
  ) {}

  async execute(createEspecieDto: CreateEspecieDto): Promise<Especie> {
    return this.especieRepository.create(createEspecieDto);
  }
} 