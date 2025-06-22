import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Usuario } from './usuario.entity';

export interface UsuarioRepository {
  create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>;
  findAll(): Promise<Usuario[]>;
  findOne(id: number): Promise<Usuario | null>;
  // Opcional: buscar por email, útil para login ou validação
  findByEmail(email: string): Promise<Usuario | null>;
  update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario>;
  remove(id: number): Promise<void>;
} 