import { Inject, Injectable } from '@nestjs/common';
import { Pesagem } from '../domain/pesagem.entity';
import { PesagemRepository } from '../domain/pesagem.repository';

@Injectable()
export class UpdatePesagemUseCase {
  constructor(
    @Inject('PesagemRepository')
    private readonly pesagemRepository: PesagemRepository,
  ) {}

  async execute(id: number, updatePesagemDto: any): Promise<Pesagem> {
    return this.pesagemRepository.update(id, updatePesagemDto);
  }
} 