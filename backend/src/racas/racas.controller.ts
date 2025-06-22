import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RacasService } from './racas.service';
import { CreateRacaDto } from './dto/create-raca.dto';
import { UpdateRacaDto } from './dto/update-raca.dto';

@Controller('racas')
export class RacasController {
  constructor(private readonly racasService: RacasService) {}

  @Post()
  create(@Body() createRacaDto: CreateRacaDto) {
    return this.racasService.create(createRacaDto);
  }

  @Get()
  findAll() {
    return this.racasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.racasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRacaDto: UpdateRacaDto) {
    return this.racasService.update(+id, updateRacaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.racasService.remove(+id);
  }
}
