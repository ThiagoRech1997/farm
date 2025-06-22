import { Module } from '@nestjs/common';
import { HistoricoSaudeController } from './historico-saude.controller';
import { DatabaseModule, DATABASE_CONNECTION } from 'src/database/database.module';
import { SqliteHistoricoSaudeRepository } from './infrastructure/sqlite-historico-saude.repository';
import { CreateHistoricoSaudeUseCase } from './application/create-historico-saude.usecase';
import { ListHistoricoSaudeUseCase } from './application/list-historico-saude.usecase';
import { GetHistoricoSaudeUseCase } from './application/get-historico-saude.usecase';
import { UpdateHistoricoSaudeUseCase } from './application/update-historico-saude.usecase';
import { RemoveHistoricoSaudeUseCase } from './application/remove-historico-saude.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [HistoricoSaudeController],
  providers: [
    {
      provide: 'HistoricoSaudeRepository',
      useFactory: (db) => new SqliteHistoricoSaudeRepository(db),
      inject: [DATABASE_CONNECTION],
    },
    {
      provide: CreateHistoricoSaudeUseCase,
      useFactory: (repo) => new CreateHistoricoSaudeUseCase(repo),
      inject: ['HistoricoSaudeRepository'],
    },
    {
      provide: ListHistoricoSaudeUseCase,
      useFactory: (repo) => new ListHistoricoSaudeUseCase(repo),
      inject: ['HistoricoSaudeRepository'],
    },
    {
      provide: GetHistoricoSaudeUseCase,
      useFactory: (repo) => new GetHistoricoSaudeUseCase(repo),
      inject: ['HistoricoSaudeRepository'],
    },
    {
      provide: UpdateHistoricoSaudeUseCase,
      useFactory: (repo) => new UpdateHistoricoSaudeUseCase(repo),
      inject: ['HistoricoSaudeRepository'],
    },
    {
      provide: RemoveHistoricoSaudeUseCase,
      useFactory: (repo) => new RemoveHistoricoSaudeUseCase(repo),
      inject: ['HistoricoSaudeRepository'],
    },
  ],
})
export class HistoricoSaudeModule {}
