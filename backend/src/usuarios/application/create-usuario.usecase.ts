import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { Usuario } from '../domain/usuario.entity';
import { UsuarioRepository } from '../domain/usuario.repository';

@Injectable()
export class CreateUsuarioUseCase {
  constructor(
    @Inject('UsuarioRepository')
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async execute(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const emailExists = await this.usuarioRepository.findByEmail(createUsuarioDto.Email);
    if (emailExists) {
      throw new ConflictException('O e-mail fornecido já está em uso.');
    }

    // TODO: Fazer o hash da senha antes de salvar
    // Ex: const hashedPassword = await bcrypt.hash(createUsuarioDto.Senha, 10);
    // const dtoWithHashedPassword = { ...createUsuarioDto, Senha: hashedPassword };

    return this.usuarioRepository.create(createUsuarioDto);
  }
} 