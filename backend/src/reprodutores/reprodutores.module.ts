import { Module } from '@nestjs/common';
import { ReprodutoresController } from './reprodutores.controller';
import { DatabaseModule, DATABASE_CONNECTION } from 'src/database/database.module';
import { SqliteReprodutorRepository } from './infrastructure/sqlite-reprodutor.repository';
import { CreateReprodutorUseCase } from './application/create-reprodutor.usecase';
import { ListReprodutoresUseCase } from './application/list-reprodutores.usecase';
import { GetReprodutorUseCase } from './application/get-reprodutor.usecase';
import { UpdateReprodutorUseCase } from './application/update-reprodutor.usecase';
import { RemoveReprodutorUseCase } from './application/remove-reprodutor.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [ReprodutoresController],
  providers: [
    {
      provide: 'ReprodutorRepository',
      useFactory: (db) => new SqliteReprodutorRepository(db),
      inject: [DATABASE_CONNECTION],
    },
    {
      provide: CreateReprodutorUseCase,
      useFactory: (repo) => new CreateReprodutorUseCase(repo),
      inject: ['ReprodutorRepository'],
    },
    {
      provide: ListReprodutoresUseCase,
      useFactory: (repo) => new ListReprodutoresUseCase(repo),
      inject: ['ReprodutorRepository'],
    },
    {
      provide: GetReprodutorUseCase,
      useFactory: (repo) => new GetReprodutorUseCase(repo),
      inject: ['ReprodutorRepository'],
    },
    {
      provide: UpdateReprodutorUseCase,
      useFactory: (repo) => new UpdateReprodutorUseCase(repo),
      inject: ['ReprodutorRepository'],
    },
    {
      provide: RemoveReprodutorUseCase,
      useFactory: (repo) => new RemoveReprodutorUseCase(repo),
      inject: ['ReprodutorRepository'],
    },
  ],
})
export class ReprodutoresModule {}
