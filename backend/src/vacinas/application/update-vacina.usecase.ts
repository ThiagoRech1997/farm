import { Inject, Injectable } from '@nestjs/common';
import { UpdateVacinaDto } from '../dto/update-vacina.dto';
import { Vacina } from '../domain/vacina.entity';
import { VacinaRepository } from '../domain/vacina.repository';

@Injectable()
export class UpdateVacinaUseCase {
  constructor(
    @Inject('VacinaRepository')
    private readonly vacinaRepository: VacinaRepository,
  ) {}

  async execute(id: number, updateVacinaDto: UpdateVacinaDto): Promise<Vacina> {
    return this.vacinaRepository.update(id, updateVacinaDto);
  }
} 