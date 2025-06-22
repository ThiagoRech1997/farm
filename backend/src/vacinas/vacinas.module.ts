import { Module } from '@nestjs/common';
import { VacinasController } from './vacinas.controller';
import { DatabaseModule, DATABASE_CONNECTION } from 'src/database/database.module';
import { SqliteVacinaRepository } from './infrastructure/sqlite-vacina.repository';
import { CreateVacinaUseCase } from './application/create-vacina.usecase';
import { ListVacinasUseCase } from './application/list-vacinas.usecase';
import { GetVacinaUseCase } from './application/get-vacina.usecase';
import { UpdateVacinaUseCase } from './application/update-vacina.usecase';
import { RemoveVacinaUseCase } from './application/remove-vacina.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [VacinasController],
  providers: [
    {
      provide: 'VacinaRepository',
      useFactory: (db) => new SqliteVacinaRepository(db),
      inject: [DATABASE_CONNECTION],
    },
    {
      provide: CreateVacinaUseCase,
      useFactory: (repo) => new CreateVacinaUseCase(repo),
      inject: ['VacinaRepository'],
    },
    {
      provide: ListVacinasUseCase,
      useFactory: (repo) => new ListVacinasUseCase(repo),
      inject: ['VacinaRepository'],
    },
    {
      provide: GetVacinaUseCase,
      useFactory: (repo) => new GetVacinaUseCase(repo),
      inject: ['VacinaRepository'],
    },
    {
      provide: UpdateVacinaUseCase,
      useFactory: (repo) => new UpdateVacinaUseCase(repo),
      inject: ['VacinaRepository'],
    },
    {
      provide: RemoveVacinaUseCase,
      useFactory: (repo) => new RemoveVacinaUseCase(repo),
      inject: ['VacinaRepository'],
    },
  ],
})
export class VacinasModule {}
