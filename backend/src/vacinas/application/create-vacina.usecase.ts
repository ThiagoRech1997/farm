import { Inject, Injectable } from '@nestjs/common';
import { CreateVacinaDto } from '../dto/create-vacina.dto';
import { Vacina } from '../domain/vacina.entity';
import { VacinaRepository } from '../domain/vacina.repository';

@Injectable()
export class CreateVacinaUseCase {
  constructor(
    @Inject('VacinaRepository')
    private readonly vacinaRepository: VacinaRepository,
  ) {}

  async execute(createVacinaDto: CreateVacinaDto): Promise<Vacina> {
    return this.vacinaRepository.create(createVacinaDto);
  }
} 