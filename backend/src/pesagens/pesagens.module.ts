import { Module } from '@nestjs/common';
import { PesagensService } from './pesagens.service';
import { PesagensController } from './pesagens.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PesagensController],
  providers: [PesagensService],
})
export class PesagensModule {}
