import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistoricoSaudeService } from './historico-saude.service';
import { CreateHistoricoSaudeDto } from './dto/create-historico-saude.dto';
import { UpdateHistoricoSaudeDto } from './dto/update-historico-saude.dto';

@Controller('historico-saude')
export class HistoricoSaudeController {
  constructor(private readonly historicoSaudeService: HistoricoSaudeService) {}

  @Post()
  create(@Body() createHistoricoSaudeDto: CreateHistoricoSaudeDto) {
    return this.historicoSaudeService.create(createHistoricoSaudeDto);
  }

  @Get()
  findAll() {
    return this.historicoSaudeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historicoSaudeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoricoSaudeDto: UpdateHistoricoSaudeDto) {
    return this.historicoSaudeService.update(+id, updateHistoricoSaudeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historicoSaudeService.remove(+id);
  }
}
