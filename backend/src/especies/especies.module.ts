import { Module } from '@nestjs/common';
import { EspeciesController } from './especies.controller';
import { DatabaseModule, DATABASE_CONNECTION } from 'src/database/database.module';
import { SqliteEspecieRepository } from './infrastructure/sqlite-especie.repository';
import { CreateEspecieUseCase } from './application/create-especie.usecase';
import { ListEspeciesUseCase } from './application/list-especies.usecase';
import { GetEspecieUseCase } from './application/get-especie.usecase';
import { UpdateEspecieUseCase } from './application/update-especie.usecase';
import { RemoveEspecieUseCase } from './application/remove-especie.usecase';
import { ListEspeciesPorTipoUseCase } from './application/list-especies-por-tipo.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [EspeciesController],
  providers: [
    {
      provide: 'EspecieRepository',
      useFactory: (db) => new SqliteEspecieRepository(db),
      inject: [DATABASE_CONNECTION],
    },
    {
      provide: CreateEspecieUseCase,
      useFactory: (repo) => new CreateEspecieUseCase(repo),
      inject: ['EspecieRepository'],
    },
    {
      provide: ListEspeciesUseCase,
      useFactory: (repo) => new ListEspeciesUseCase(repo),
      inject: ['EspecieRepository'],
    },
    {
      provide: GetEspecieUseCase,
      useFactory: (repo) => new GetEspecieUseCase(repo),
      inject: ['EspecieRepository'],
    },
    {
      provide: UpdateEspecieUseCase,
      useFactory: (repo) => new UpdateEspecieUseCase(repo),
      inject: ['EspecieRepository'],
    },
    {
      provide: RemoveEspecieUseCase,
      useFactory: (repo) => new RemoveEspecieUseCase(repo),
      inject: ['EspecieRepository'],
    },
    {
      provide: ListEspeciesPorTipoUseCase,
      useFactory: (repo) => new ListEspeciesPorTipoUseCase(repo),
      inject: ['EspecieRepository'],
    },
  ],
})
export class EspeciesModule {} 