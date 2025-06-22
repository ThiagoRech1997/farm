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
import { CreateEspecieDto } from './dto/create-especie.dto';
import { UpdateEspecieDto } from './dto/update-especie.dto';
import { CreateEspecieUseCase } from './application/create-especie.usecase';
import { ListEspeciesUseCase } from './application/list-especies.usecase';
import { GetEspecieUseCase } from './application/get-especie.usecase';
import { UpdateEspecieUseCase } from './application/update-especie.usecase';
import { RemoveEspecieUseCase } from './application/remove-especie.usecase';
import { ListEspeciesPorTipoUseCase } from './application/list-especies-por-tipo.usecase';

@Controller('especies')
export class EspeciesController {
  constructor(
    @Inject(CreateEspecieUseCase)
    private readonly createUseCase: CreateEspecieUseCase,
    @Inject(ListEspeciesUseCase)
    private readonly listUseCase: ListEspeciesUseCase,
    @Inject(GetEspecieUseCase)
    private readonly getUseCase: GetEspecieUseCase,
    @Inject(UpdateEspecieUseCase)
    private readonly updateUseCase: UpdateEspecieUseCase,
    @Inject(RemoveEspecieUseCase)
    private readonly removeUseCase: RemoveEspecieUseCase,
    @Inject(ListEspeciesPorTipoUseCase)
    private readonly listPorTipoUseCase: ListEspeciesPorTipoUseCase,
  ) {}

  @Post()
  create(@Body() createDto: CreateEspecieDto) {
    return this.createUseCase.execute(createDto);
  }

  @Get()
  findAll() {
    return this.listUseCase.execute();
  }

  @Get('tipo/:tipo')
  findByTipo(@Param('tipo') tipo: string) {
    return this.listPorTipoUseCase.execute(tipo);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateEspecieDto,
  ) {
    return this.updateUseCase.execute(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.removeUseCase.execute(id);
  }
} 