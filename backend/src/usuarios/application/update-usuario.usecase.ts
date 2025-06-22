import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Usuario } from '../domain/usuario.entity';
import { UsuarioRepository } from '../domain/usuario.repository';

@Injectable()
export class UpdateUsuarioUseCase {
  constructor(
    @Inject('UsuarioRepository')
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async execute(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    if (updateUsuarioDto.Email) {
      const emailExists = await this.usuarioRepository.findByEmail(updateUsuarioDto.Email);
      // Se o email existe E pertence a um usuário diferente do que está sendo atualizado
      if (emailExists && emailExists.id !== id) {
        throw new ConflictException('O e-mail fornecido já está em uso por outro usuário.');
      }
    }

    // TODO: Se a senha estiver no DTO, fazer o hash antes de passar para o repositório.
    // Ex: if (updateUsuarioDto.Senha) { ... }
    
    return this.usuarioRepository.update(id, updateUsuarioDto);
  }
} 