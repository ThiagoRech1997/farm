import { Module } from '@nestjs/common';
import { AnimaisService } from './animais.service';
import { AnimaisController } from './animais.controller';
import { AnimaisUnificadoService } from './animais-unificado.service';
import { AnimaisUnificadoController } from './animais-unificado.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AnimaisController, AnimaisUnificadoController],
  providers: [AnimaisService, AnimaisUnificadoService],
})
export class AnimaisModule {}
