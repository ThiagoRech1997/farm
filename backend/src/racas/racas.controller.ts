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
import { CreateRacaDto } from './dto/create-raca.dto';
import { UpdateRacaDto } from './dto/update-raca.dto';
import { CreateRacaUseCase } from './application/create-raca.usecase';
import { ListRacasUseCase } from './application/list-racas.usecase';
import { GetRacaUseCase } from './application/get-raca.usecase';
import { UpdateRacaUseCase } from './application/update-raca.usecase';
import { RemoveRacaUseCase } from './application/remove-raca.usecase';

@Controller('racas')
export class RacasController {
  constructor(
    @Inject(CreateRacaUseCase)
    private readonly createUseCase: CreateRacaUseCase,
    @Inject(ListRacasUseCase)
    private readonly listUseCase: ListRacasUseCase,
    @Inject(GetRacaUseCase)
    private readonly getUseCase: GetRacaUseCase,
    @Inject(UpdateRacaUseCase)
    private readonly updateUseCase: UpdateRacaUseCase,
    @Inject(RemoveRacaUseCase)
    private readonly removeUseCase: RemoveRacaUseCase,
  ) {}

  @Post()
  create(@Body() createDto: CreateRacaDto) {
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
    @Body() updateDto: UpdateRacaDto,
  ) {
    return this.updateUseCase.execute(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.removeUseCase.execute(id);
  }
}
