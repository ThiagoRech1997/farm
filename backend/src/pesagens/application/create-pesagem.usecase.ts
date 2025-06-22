import { Inject, Injectable } from '@nestjs/common';
import { Pesagem } from '../domain/pesagem.entity';
import { PesagemRepository } from '../domain/pesagem.repository';

@Injectable()
export class CreatePesagemUseCase {
  constructor(
    @Inject('PesagemRepository')
    private readonly pesagemRepository: PesagemRepository,
  ) {}

  async execute(createPesagemDto: any): Promise<Pesagem> {
    return this.pesagemRepository.create(createPesagemDto);
  }
} 