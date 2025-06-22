import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateHistoricoSaudeDto } from './dto/create-historico-saude.dto';
import { UpdateHistoricoSaudeDto } from './dto/update-historico-saude.dto';
import { CreateHistoricoSaudeUseCase } from './application/create-historico-saude.usecase';
import { ListHistoricoSaudeUseCase } from './application/list-historico-saude.usecase';
import { GetHistoricoSaudeUseCase } from './application/get-historico-saude.usecase';
import { UpdateHistoricoSaudeUseCase } from './application/update-historico-saude.usecase';
import { RemoveHistoricoSaudeUseCase } from './application/remove-historico-saude.usecase';

@Controller('historico-saude')
export class HistoricoSaudeController {
  constructor(
    @Inject(CreateHistoricoSaudeUseCase)
    private readonly createUseCase: CreateHistoricoSaudeUseCase,
    @Inject(ListHistoricoSaudeUseCase)
    private readonly listUseCase: ListHistoricoSaudeUseCase,
    @Inject(GetHistoricoSaudeUseCase)
    private readonly getUseCase: GetHistoricoSaudeUseCase,
    @Inject(UpdateHistoricoSaudeUseCase)
    private readonly updateUseCase: UpdateHistoricoSaudeUseCase,
    @Inject(RemoveHistoricoSaudeUseCase)
    private readonly removeUseCase: RemoveHistoricoSaudeUseCase,
  ) {}

  @Post()
  create(@Body() createDto: CreateHistoricoSaudeDto) {
    return this.createUseCase.execute(createDto);
  }

  @Get()
  findAll() {
    return this.listUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateHistoricoSaudeDto,
  ) {
    return this.updateUseCase.execute(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.removeUseCase.execute(id);
  }
}
