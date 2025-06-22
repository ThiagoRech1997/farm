import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NinhadasService } from './ninhadas.service';
import { CreateNinhadaDto } from './dto/create-ninhada.dto';
import { UpdateNinhadaDto } from './dto/update-ninhada.dto';

@Controller('ninhadas')
export class NinhadasController {
  constructor(private readonly ninhadasService: NinhadasService) {}

  @Post()
  create(@Body() createNinhadaDto: CreateNinhadaDto) {
    return this.ninhadasService.create(createNinhadaDto);
  }

  @Get()
  findAll() {
    return this.ninhadasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ninhadasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNinhadaDto: UpdateNinhadaDto) {
    return this.ninhadasService.update(+id, updateNinhadaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ninhadasService.remove(+id);
  }
}
