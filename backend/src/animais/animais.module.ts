import { Module } from '@nestjs/common';
import { AnimaisService } from './animais.service';
import { AnimaisController } from './animais.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AnimaisController],
  providers: [AnimaisService],
})
export class AnimaisModule {}
