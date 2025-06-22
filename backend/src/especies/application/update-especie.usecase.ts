import { Inject, Injectable } from '@nestjs/common';
import { UpdateEspecieDto } from '../dto/update-especie.dto';
import { Especie } from '../domain/especie.entity';
import { EspecieRepository } from '../domain/especie.repository';

@Injectable()
export class UpdateEspecieUseCase {
  constructor(
    @Inject('EspecieRepository')
    private readonly especieRepository: EspecieRepository,
  ) {}

  async execute(id: number, updateEspecieDto: UpdateEspecieDto): Promise<Especie> {
    return this.especieRepository.update(id, updateEspecieDto);
  }
} 