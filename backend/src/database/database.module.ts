import { Module } from '@nestjs/common';
import * as sqlite3 from 'sqlite3';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useValue: new sqlite3.Database('../farm.db'), // O caminho é relativo à raiz do projeto
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
