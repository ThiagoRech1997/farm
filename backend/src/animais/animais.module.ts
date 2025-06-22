import { Module } from '@nestjs/common';
import { AnimaisController } from './animais.controller';
import { AnimaisUnificadoController } from './animais-unificado.controller';
import { CreateAnimalUseCase } from './application/create-animal.usecase';
import { SqliteAnimalRepository } from './infrastructure/sqlite-animal.repository';
import { CreateAnimalUnificadoUseCase } from './application/create-animal-unificado.usecase';
import { SqliteAnimalUnificadoRepository } from './infrastructure/sqlite-animal-unificado.repository';
import { DatabaseModule, DATABASE_CONNECTION } from '../database/database.module';
import { ListAnimalsUseCase } from './application/list-animals.usecase';
import { GetAnimalUseCase } from './application/get-animal.usecase';
import { UpdateAnimalUseCase } from './application/update-animal.usecase';
import { RemoveAnimalUseCase } from './application/remove-animal.usecase';
import { RegistrarSaidaAnimalUseCase } from './application/registrar-saida-animal.usecase';
import { ListAnimaisParaPaisUseCase } from './application/list-animais-para-pais.usecase';
import { GetAnimalCompletoUseCase } from './application/get-animal-completo.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [AnimaisController, AnimaisUnificadoController],
  providers: [
    {
      provide: 'AnimalRepository',
      useFactory: (db) => new SqliteAnimalRepository(db),
      inject: [DATABASE_CONNECTION],
    },
    {
      provide: CreateAnimalUseCase,
      useFactory: (repo) => new CreateAnimalUseCase(repo),
      inject: ['AnimalRepository'],
    },
    {
      provide: ListAnimalsUseCase,
      useFactory: (repo) => new ListAnimalsUseCase(repo),
      inject: ['AnimalRepository'],
    },
    {
      provide: GetAnimalUseCase,
      useFactory: (repo) => new GetAnimalUseCase(repo),
      inject: ['AnimalRepository'],
    },
    {
      provide: UpdateAnimalUseCase,
      useFactory: (repo) => new UpdateAnimalUseCase(repo),
      inject: ['AnimalRepository'],
    },
    {
      provide: RemoveAnimalUseCase,
      useFactory: (repo) => new RemoveAnimalUseCase(repo),
      inject: ['AnimalRepository'],
    },
    {
      provide: RegistrarSaidaAnimalUseCase,
      useFactory: (repo) => new RegistrarSaidaAnimalUseCase(repo),
      inject: ['AnimalRepository'],
    },
    {
      provide: 'AnimalUnificadoRepository',
      useFactory: (db) => new SqliteAnimalUnificadoRepository(db),
      inject: [DATABASE_CONNECTION],
    },
    {
      provide: CreateAnimalUnificadoUseCase,
      useFactory: (repo) => new CreateAnimalUnificadoUseCase(repo),
      inject: ['AnimalUnificadoRepository'],
    },
    {
      provide: ListAnimaisParaPaisUseCase,
      useFactory: (repo) => new ListAnimaisParaPaisUseCase(repo),
      inject: ['AnimalUnificadoRepository'],
    },
    {
      provide: GetAnimalCompletoUseCase,
      useFactory: (repo) => new GetAnimalCompletoUseCase(repo),
      inject: ['AnimalUnificadoRepository'],
    },
  ],
})
export class AnimaisModule {}
