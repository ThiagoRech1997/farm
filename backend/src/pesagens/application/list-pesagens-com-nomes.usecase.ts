import { Inject, Injectable } from '@nestjs/common';
import { PesagemComNomeAnimal, PesagemRepository } from '../domain/pesagem.repository';

@Injectable()
export class ListPesagensComNomesUseCase {
  constructor(
    @Inject('PesagemRepository')
    private readonly pesagemRepository: PesagemRepository,
  ) {}

  async execute(): Promise<PesagemComNomeAnimal[]> {
    return this.pesagemRepository.findAllWithAnimalNames();
  }
} 