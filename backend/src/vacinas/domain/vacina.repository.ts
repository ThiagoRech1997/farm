import { CreateVacinaDto } from '../dto/create-vacina.dto';
import { UpdateVacinaDto } from '../dto/update-vacina.dto';
import { Vacina } from './vacina.entity';

export interface VacinaRepository {
  create(createVacinaDto: CreateVacinaDto): Promise<Vacina>;
  findAll(): Promise<Vacina[]>;
  findOne(id: number): Promise<Vacina | null>;
  update(id: number, updateVacinaDto: UpdateVacinaDto): Promise<Vacina>;
  remove(id: number): Promise<void>;
} 