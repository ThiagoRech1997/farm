import { Module } from '@nestjs/common';
import { NinhadasService } from './ninhadas.service';
import { NinhadasController } from './ninhadas.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NinhadasController],
  providers: [NinhadasService],
})
export class NinhadasModule {}
