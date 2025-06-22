import { Inject, Injectable } from '@nestjs/common';
import { Pesagem } from '../domain/pesagem.entity';
import { PesagemRepository } from '../domain/pesagem.repository';

@Injectable()
export class ListPesagensUseCase {
  constructor(
    @Inject('PesagemRepository')
    private readonly pesagemRepository: PesagemRepository,
  ) {}

  async execute(): Promise<Pesagem[]> {
    return this.pesagemRepository.findAll();
  }
} 