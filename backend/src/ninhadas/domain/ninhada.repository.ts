import { CreateNinhadaDto } from '../dto/create-ninhada.dto';
import { UpdateNinhadaDto } from '../dto/update-ninhada.dto';
import { Ninhada } from './ninhada.entity';

export interface NinhadaRepository {
  create(createNinhadaDto: CreateNinhadaDto): Promise<Ninhada>;
  findAll(): Promise<Ninhada[]>;
  findOne(id: number): Promise<Ninhada | null>;
  update(id: number, updateNinhadaDto: UpdateNinhadaDto): Promise<Ninhada>;
  remove(id: number): Promise<void>;
} 