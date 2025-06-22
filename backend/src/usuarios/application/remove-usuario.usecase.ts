import { Inject, Injectable } from '@nestjs/common';
import { UsuarioRepository } from '../domain/usuario.repository';

@Injectable()
export class RemoveUsuarioUseCase {
  constructor(
    @Inject('UsuarioRepository')
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async execute(id: number): Promise<void> {
    // Adicionar lógica de negócio aqui se necessário, 
    // por exemplo, não permitir a remoção do último administrador.
    return this.usuarioRepository.remove(id);
  }
} 