import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReprodutoresService } from './reprodutores.service';
import { CreateReprodutorDto } from './dto/create-reprodutor.dto';
import { UpdateReprodutorDto } from './dto/update-reprodutor.dto';

@Controller('reprodutores')
export class ReprodutoresController {
  constructor(private readonly reprodutoresService: ReprodutoresService) {}

  @Post()
  create(@Body() createReprodutorDto: CreateReprodutorDto) {
    return this.reprodutoresService.create(createReprodutorDto);
  }

  @Get()
  findAll() {
    return this.reprodutoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reprodutoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReprodutorDto: UpdateReprodutorDto) {
    return this.reprodutoresService.update(+id, updateReprodutorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reprodutoresService.remove(+id);
  }
}
