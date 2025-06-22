import { Module } from '@nestjs/common';
import { NinhadasController } from './ninhadas.controller';
import { DatabaseModule, DATABASE_CONNECTION } from 'src/database/database.module';
import { SqliteNinhadaRepository } from './infrastructure/sqlite-ninhada.repository';
import { CreateNinhadaUseCase } from './application/create-ninhada.usecase';
import { ListNinhadasUseCase } from './application/list-ninhadas.usecase';
import { GetNinhadaUseCase } from './application/get-ninhada.usecase';
import { UpdateNinhadaUseCase } from './application/update-ninhada.usecase';
import { RemoveNinhadaUseCase } from './application/remove-ninhada.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [NinhadasController],
  providers: [
    {
      provide: 'NinhadaRepository',
      useFactory: (db) => new SqliteNinhadaRepository(db),
      inject: [DATABASE_CONNECTION],
    },
    {
      provide: CreateNinhadaUseCase,
      useFactory: (repo) => new CreateNinhadaUseCase(repo),
      inject: ['NinhadaRepository'],
    },
    {
      provide: ListNinhadasUseCase,
      useFactory: (repo) => new ListNinhadasUseCase(repo),
      inject: ['NinhadaRepository'],
    },
    {
      provide: GetNinhadaUseCase,
      useFactory: (repo) => new GetNinhadaUseCase(repo),
      inject: ['NinhadaRepository'],
    },
    {
      provide: UpdateNinhadaUseCase,
      useFactory: (repo) => new UpdateNinhadaUseCase(repo),
      inject: ['NinhadaRepository'],
    },
    {
      provide: RemoveNinhadaUseCase,
      useFactory: (repo) => new RemoveNinhadaUseCase(repo),
      inject: ['NinhadaRepository'],
    },
  ],
})
export class NinhadasModule {}
