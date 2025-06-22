import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PesagensService } from './pesagens.service';
import { CreatePesagenDto } from './dto/create-pesagen.dto';
import { UpdatePesagenDto } from './dto/update-pesagen.dto';

@Controller('pesagens')
export class PesagensController {
  constructor(private readonly pesagensService: PesagensService) {}

  @Post()
  create(@Body() createPesagenDto: CreatePesagenDto) {
    return this.pesagensService.create(createPesagenDto);
  }

  @Get()
  findAll() {
    return this.pesagensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pesagensService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePesagenDto: UpdatePesagenDto) {
    return this.pesagensService.update(+id, updatePesagenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pesagensService.remove(+id);
  }
}
