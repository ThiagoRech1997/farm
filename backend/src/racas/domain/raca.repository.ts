import { CreateRacaDto } from '../dto/create-raca.dto';
import { UpdateRacaDto } from '../dto/update-raca.dto';
import { Raca } from './raca.entity';

export interface RacaRepository {
  create(createRacaDto: CreateRacaDto): Promise<Raca>;
  findAll(): Promise<Raca[]>;
  findOne(id: number): Promise<Raca | null>;
  update(id: number, updateRacaDto: UpdateRacaDto): Promise<Raca>;
  remove(id: number): Promise<void>;
} 