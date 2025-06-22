import { Module } from '@nestjs/common';
import { VacinasService } from './vacinas.service';
import { VacinasController } from './vacinas.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [VacinasController],
  providers: [VacinasService],
})
export class VacinasModule {}
