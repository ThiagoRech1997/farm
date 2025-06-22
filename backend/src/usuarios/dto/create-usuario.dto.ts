import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  Nome_Usuario: string;

  @IsEmail()
  @IsNotEmpty()
  Email: string;

  @IsString()
  @IsNotEmpty()
  Senha: string;

  @IsString()
  @IsNotEmpty()
  Nivel_Acesso: string;
}
