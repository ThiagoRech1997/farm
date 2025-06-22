import { Module } from '@nestjs/common';
import { ReprodutoresService } from './reprodutores.service';
import { ReprodutoresController } from './reprodutores.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ReprodutoresController],
  providers: [ReprodutoresService],
})
export class ReprodutoresModule {}
