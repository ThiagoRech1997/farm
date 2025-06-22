import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { EspeciesService } from './especies.service';
import { CreateEspecieDto } from './dto/create-especie.dto';
import { UpdateEspecieDto } from './dto/update-especie.dto';

@Controller('especies')
export class EspeciesController {
  constructor(private readonly especiesService: EspeciesService) {}

  @Post()
  create(@Body() createEspecieDto: CreateEspecieDto) {
    return this.especiesService.create(createEspecieDto);
  }

  @Get()
  findAll() {
    return this.especiesService.findAll();
  }

  @Get('tipo/:tipo')
  findByTipo(@Param('tipo') tipo: string) {
    return this.especiesService.findByTipo(tipo);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.especiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEspecieDto: UpdateEspecieDto) {
    return this.especiesService.update(id, updateEspecieDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.especiesService.remove(id);
  }
} 