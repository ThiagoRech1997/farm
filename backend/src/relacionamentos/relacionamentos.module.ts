import { Module } from '@nestjs/common';
import { RelacionamentosController } from './relacionamentos.controller';
import { DatabaseModule } from 'src/database/database.module';
import { SqliteRelacionamentoRepository } from './infrastructure/sqlite-relacionamento.repository';
import { CreateRelacionamentoUseCase } from './application/create-relacionamento.usecase';
import { ListRelacionamentosUseCase } from './application/list-relacionamentos.usecase';
import { GetRelacionamentoUseCase } from './application/get-relacionamento.usecase';
import { UpdateRelacionamentoUseCase } from './application/update-relacionamento.usecase';
import { RemoveRelacionamentoUseCase } from './application/remove-relacionamento.usecase';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { Database } from 'sqlite3';

@Module({
  imports: [DatabaseModule],
  controllers: [RelacionamentosController],
  providers: [
    {
      provide: 'RelacionamentoRepository',
      useFactory: (db: Database) => new SqliteRelacionamentoRepository(db),
      inject: [DATABASE_CONNECTION],
    },
    CreateRelacionamentoUseCase,
    ListRelacionamentosUseCase,
    GetRelacionamentoUseCase,
    UpdateRelacionamentoUseCase,
    RemoveRelacionamentoUseCase,
  ],
})
export class RelacionamentosModule {}