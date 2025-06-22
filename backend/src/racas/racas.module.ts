import { Module } from '@nestjs/common';
import { RacasService } from './racas.service';
import { RacasController } from './racas.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RacasController],
  providers: [RacasService],
})
export class RacasModule {}
