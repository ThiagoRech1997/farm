import { Module } from '@nestjs/common';
import { RelacionamentosService } from './relacionamentos.service';
import { RelacionamentosController } from './relacionamentos.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RelacionamentosController],
  providers: [RelacionamentosService],
})
export class RelacionamentosModule {}
