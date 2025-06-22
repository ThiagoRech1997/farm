import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { DatabaseModule, DATABASE_CONNECTION } from 'src/database/database.module';
import { SqliteUsuarioRepository } from './infrastructure/sqlite-usuario.repository';
import { CreateUsuarioUseCase } from './application/create-usuario.usecase';
import { ListUsuariosUseCase } from './application/list-usuarios.usecase';
import { GetUsuarioUseCase } from './application/get-usuario.usecase';
import { UpdateUsuarioUseCase } from './application/update-usuario.usecase';
import { RemoveUsuarioUseCase } from './application/remove-usuario.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [UsuariosController],
  providers: [
    {
      provide: 'UsuarioRepository',
      useFactory: (db) => new SqliteUsuarioRepository(db),
      inject: [DATABASE_CONNECTION],
    },
    {
      provide: CreateUsuarioUseCase,
      useFactory: (repo) => new CreateUsuarioUseCase(repo),
      inject: ['UsuarioRepository'],
    },
    {
      provide: ListUsuariosUseCase,
      useFactory: (repo) => new ListUsuariosUseCase(repo),
      inject: ['UsuarioRepository'],
    },
    {
      provide: GetUsuarioUseCase,
      useFactory: (repo) => new GetUsuarioUseCase(repo),
      inject: ['UsuarioRepository'],
    },
    {
      provide: UpdateUsuarioUseCase,
      useFactory: (repo) => new UpdateUsuarioUseCase(repo),
      inject: ['UsuarioRepository'],
    },
    {
      provide: RemoveUsuarioUseCase,
      useFactory: (repo) => new RemoveUsuarioUseCase(repo),
      inject: ['UsuarioRepository'],
    },
  ],
})
export class UsuariosModule {}
