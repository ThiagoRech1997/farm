import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Ninhada } from '../domain/ninhada.entity';
import { NinhadaRepository } from '../domain/ninhada.repository';

@Injectable()
export class GetNinhadaUseCase {
  constructor(
    @Inject('NinhadaRepository')
    private readonly ninhadaRepository: NinhadaRepository,
  ) {}

  async execute(id: number): Promise<Ninhada> {
    const ninhada = await this.ninhadaRepository.findOne(id);
    if (!ninhada) {
      throw new NotFoundException(`Ninhada com ID ${id} não encontrada.`);
    }
    return ninhada;
  }
} 