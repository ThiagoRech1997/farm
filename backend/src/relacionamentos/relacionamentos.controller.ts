import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateRelacionamentoUseCase } from './application/create-relacionamento.usecase';
import { ListRelacionamentosUseCase } from './application/list-relacionamentos.usecase';
import { GetRelacionamentoUseCase } from './application/get-relacionamento.usecase';
import { UpdateRelacionamentoUseCase } from './application/update-relacionamento.usecase';
import { RemoveRelacionamentoUseCase } from './application/remove-relacionamento.usecase';
import {
  CreateRelacionamentoDto,
  UpdateRelacionamentoDto,
} from './domain/relacionamento.repository';

@Controller('relacionamentos')
export class RelacionamentosController {
  constructor(
    private readonly createRelacionamentoUseCase: CreateRelacionamentoUseCase,
    private readonly listRelacionamentosUseCase: ListRelacionamentosUseCase,
    private readonly getRelacionamentoUseCase: GetRelacionamentoUseCase,
    private readonly updateRelacionamentoUseCase: UpdateRelacionamentoUseCase,
    private readonly removeRelacionamentoUseCase: RemoveRelacionamentoUseCase,
  ) {}

  @Post()
  async create(@Body() createRelacionamentoDto: CreateRelacionamentoDto) {
    const relacionamento = await this.createRelacionamentoUseCase.execute(
      createRelacionamentoDto,
    );
    return relacionamento.serialize();
  }

  @Get()
  async findAll() {
    const relacionamentos = await this.listRelacionamentosUseCase.execute();
    return relacionamentos.map((r) => r.serialize());
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const relacionamento = await this.getRelacionamentoUseCase.execute(id);
    return relacionamento!.serialize();
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRelacionamentoDto: UpdateRelacionamentoDto,
  ) {
    const relacionamento = await this.updateRelacionamentoUseCase.execute(
      id,
      updateRelacionamentoDto,
    );
    return relacionamento!.serialize();
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.removeRelacionamentoUseCase.execute(id);
  }
}
