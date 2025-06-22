export class Usuario {
  constructor(
    public readonly id: number,
    public readonly nomeUsuario: string,
    public readonly email: string,
    public readonly nivelAcesso: string,
  ) {}
} 