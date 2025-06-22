import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AnimaisUnificadoService } from './animais-unificado.service';
import { CreateAnimalUnificadoDto } from './dto/create-animal-unificado.dto';

@Controller('animais-unificado')
export class AnimaisUnificadoController {
  constructor(private readonly animaisUnificadoService: AnimaisUnificadoService) {}

  @Post()
  create(@Body() createAnimalUnificadoDto: CreateAnimalUnificadoDto) {
    return this.animaisUnificadoService.createAnimalUnificado(createAnimalUnificadoDto);
  }

  @Get('pais')
  findAnimaisParaPais() {
    return this.animaisUnificadoService.findAnimaisParaPais();
  }

  @Get(':id/completo')
  findAnimalCompleto(@Param('id', ParseIntPipe) id: number) {
    return this.animaisUnificadoService.findAnimalCompleto(id);
  }
} 