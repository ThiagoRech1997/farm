import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReprodutoresService } from './reprodutores.service';
import { CreateReprodutoreDto } from './dto/create-reprodutore.dto';
import { UpdateReprodutoreDto } from './dto/update-reprodutore.dto';

@Controller('reprodutores')
export class ReprodutoresController {
  constructor(private readonly reprodutoresService: ReprodutoresService) {}

  @Post()
  create(@Body() createReprodutoreDto: CreateReprodutoreDto) {
    return this.reprodutoresService.create(createReprodutoreDto);
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
  update(@Param('id') id: string, @Body() updateReprodutoreDto: UpdateReprodutoreDto) {
    return this.reprodutoresService.update(+id, updateReprodutoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reprodutoresService.remove(+id);
  }
}
