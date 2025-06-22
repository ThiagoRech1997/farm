import { Inject, Injectable } from '@nestjs/common';
import { Usuario } from '../domain/usuario.entity';
import { UsuarioRepository } from '../domain/usuario.repository';

@Injectable()
export class ListUsuariosUseCase {
  constructor(
    @Inject('UsuarioRepository')
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async execute(): Promise<Usuario[]> {
    return this.usuarioRepository.findAll();
  }
} 