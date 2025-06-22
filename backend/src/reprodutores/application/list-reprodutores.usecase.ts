import { Inject, Injectable } from '@nestjs/common';
import { Reprodutor } from '../domain/reprodutor.entity';
import { ReprodutorRepository } from '../domain/reprodutor.repository';

@Injectable()
export class ListReprodutoresUseCase {
  constructor(
    @Inject('ReprodutorRepository')
    private readonly reprodutorRepository: ReprodutorRepository,
  ) {}

  async execute(): Promise<Reprodutor[]> {
    return this.reprodutorRepository.findAll();
  }
} 