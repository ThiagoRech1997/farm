import { Module } from '@nestjs/common';
import { HistoricoSaudeService } from './historico-saude.service';
import { HistoricoSaudeController } from './historico-saude.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [HistoricoSaudeController],
  providers: [HistoricoSaudeService],
})
export class HistoricoSaudeModule {}
