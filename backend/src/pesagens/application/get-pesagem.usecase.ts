import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Pesagem } from '../domain/pesagem.entity';
import { PesagemRepository } from '../domain/pesagem.repository';

@Injectable()
export class GetPesagemUseCase {
  constructor(
    @Inject('PesagemRepository')
    private readonly pesagemRepository: PesagemRepository,
  ) {}

  async execute(id: number): Promise<Pesagem> {
    const pesagem = await this.pesagemRepository.findOne(id);
    if (!pesagem) {
      throw new NotFoundException(`Pesagem com ID ${id} não encontrada.`);
    }
    return pesagem;
  }
} 