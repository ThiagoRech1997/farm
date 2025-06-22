import { Inject, Injectable } from '@nestjs/common';
import { PesagemRepository } from '../domain/pesagem.repository';

@Injectable()
export class RemovePesagemUseCase {
  constructor(
    @Inject('PesagemRepository')
    private readonly pesagemRepository: PesagemRepository,
  ) {}

  async execute(id: number): Promise<void> {
    return this.pesagemRepository.remove(id);
  }
} 