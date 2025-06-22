import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PesagensService } from './pesagens.service';
import { CreatePesagemDto } from './dto/create-pesagem.dto';
import { UpdatePesagemDto } from './dto/update-pesagem.dto';

@Controller('pesagens')
export class PesagensController {
  constructor(private readonly pesagensService: PesagensService) {}

  @Post()
  create(@Body() createPesagemDto: CreatePesagemDto) {
    return this.pesagensService.create(createPesagemDto);
  }

  @Get()
  findAll() {
    return this.pesagensService.findAll();
  }

  @Get('com-nomes')
  findAllWithAnimalNames() {
    return this.pesagensService.findAllWithAnimalNames();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pesagensService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePesagemDto: UpdatePesagemDto) {
    return this.pesagensService.update(+id, updatePesagemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pesagensService.remove(+id);
  }
}
