import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RelacionamentosService } from './relacionamentos.service';
import { CreateRelacionamentoDto } from './dto/create-relacionamento.dto';
import { UpdateRelacionamentoDto } from './dto/update-relacionamento.dto';

@Controller('relacionamentos')
export class RelacionamentosController {
  constructor(private readonly relacionamentosService: RelacionamentosService) {}

  @Post()
  create(@Body() createRelacionamentoDto: CreateRelacionamentoDto) {
    return this.relacionamentosService.create(createRelacionamentoDto);
  }

  @Get()
  findAll() {
    return this.relacionamentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.relacionamentosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRelacionamentoDto: UpdateRelacionamentoDto) {
    return this.relacionamentosService.update(+id, updateRelacionamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.relacionamentosService.remove(+id);
  }
}
