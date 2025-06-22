import { Module } from '@nestjs/common';
import { PesagensController } from './pesagens.controller';
import { DatabaseModule, DATABASE_CONNECTION } from 'src/database/database.module';
import { SqlitePesagemRepository } from './infrastructure/sqlite-pesagem.repository';
import { CreatePesagemUseCase } from './application/create-pesagem.usecase';
import { ListPesagensUseCase } from './application/list-pesagens.usecase';
import { GetPesagemUseCase } from './application/get-pesagem.usecase';
import { UpdatePesagemUseCase } from './application/update-pesagem.usecase';
import { RemovePesagemUseCase } from './application/remove-pesagem.usecase';
import { ListPesagensComNomesUseCase } from './application/list-pesagens-com-nomes.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [PesagensController],
  providers: [
    {
      provide: 'PesagemRepository',
      useFactory: (db) => new SqlitePesagemRepository(db),
      inject: [DATABASE_CONNECTION],
    },
    {
      provide: CreatePesagemUseCase,
      useFactory: (repo) => new CreatePesagemUseCase(repo),
      inject: ['PesagemRepository'],
    },
    {
      provide: ListPesagensUseCase,
      useFactory: (repo) => new ListPesagensUseCase(repo),
      inject: ['PesagemRepository'],
    },
    {
      provide: GetPesagemUseCase,
      useFactory: (repo) => new GetPesagemUseCase(repo),
      inject: ['PesagemRepository'],
    },
    {
      provide: UpdatePesagemUseCase,
      useFactory: (repo) => new UpdatePesagemUseCase(repo),
      inject: ['PesagemRepository'],
    },
    {
      provide: RemovePesagemUseCase,
      useFactory: (repo) => new RemovePesagemUseCase(repo),
      inject: ['PesagemRepository'],
    },
    {
      provide: ListPesagensComNomesUseCase,
      useFactory: (repo) => new ListPesagensComNomesUseCase(repo),
      inject: ['PesagemRepository'],
    },
  ],
})
export class PesagensModule {}
