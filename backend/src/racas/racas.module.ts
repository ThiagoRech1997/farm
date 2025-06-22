import { Module } from '@nestjs/common';
import { RacasController } from './racas.controller';
import { DatabaseModule, DATABASE_CONNECTION } from 'src/database/database.module';
import { SqliteRacaRepository } from './infrastructure/sqlite-raca.repository';
import { CreateRacaUseCase } from './application/create-raca.usecase';
import { ListRacasUseCase } from './application/list-racas.usecase';
import { GetRacaUseCase } from './application/get-raca.usecase';
import { UpdateRacaUseCase } from './application/update-raca.usecase';
import { RemoveRacaUseCase } from './application/remove-raca.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [RacasController],
  providers: [
    {
      provide: 'RacaRepository',
      useFactory: (db) => new SqliteRacaRepository(db),
      inject: [DATABASE_CONNECTION],
    },
    {
      provide: CreateRacaUseCase,
      useFactory: (repo) => new CreateRacaUseCase(repo),
      inject: ['RacaRepository'],
    },
    {
      provide: ListRacasUseCase,
      useFactory: (repo) => new ListRacasUseCase(repo),
      inject: ['RacaRepository'],
    },
    {
      provide: GetRacaUseCase,
      useFactory: (repo) => new GetRacaUseCase(repo),
      inject: ['RacaRepository'],
    },
    {
      provide: UpdateRacaUseCase,
      useFactory: (repo) => new UpdateRacaUseCase(repo),
      inject: ['RacaRepository'],
    },
    {
      provide: RemoveRacaUseCase,
      useFactory: (repo) => new RemoveRacaUseCase(repo),
      inject: ['RacaRepository'],
    },
  ],
})
export class RacasModule {}
