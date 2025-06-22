import { Module } from '@nestjs/common';
import { EspeciesService } from './especies.service';
import { EspeciesController } from './especies.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EspeciesController],
  providers: [EspeciesService],
  exports: [EspeciesService],
})
export class EspeciesModule {} 