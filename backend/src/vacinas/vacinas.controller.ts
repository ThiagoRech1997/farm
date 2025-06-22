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
import { CreateVacinaDto } from './dto/create-vacina.dto';
import { UpdateVacinaDto } from './dto/update-vacina.dto';
import { CreateVacinaUseCase } from './application/create-vacina.usecase';
import { ListVacinasUseCase } from './application/list-vacinas.usecase';
import { GetVacinaUseCase } from './application/get-vacina.usecase';
import { UpdateVacinaUseCase } from './application/update-vacina.usecase';
import { RemoveVacinaUseCase } from './application/remove-vacina.usecase';

@Controller('vacinas')
export class VacinasController {
  constructor(
    @Inject(CreateVacinaUseCase)
    private readonly createVacinaUseCase: CreateVacinaUseCase,
    @Inject(ListVacinasUseCase)
    private readonly listVacinasUseCase: ListVacinasUseCase,
    @Inject(GetVacinaUseCase)
    private readonly getVacinaUseCase: GetVacinaUseCase,
    @Inject(UpdateVacinaUseCase)
    private readonly updateVacinaUseCase: UpdateVacinaUseCase,
    @Inject(RemoveVacinaUseCase)
    private readonly removeVacinaUseCase: RemoveVacinaUseCase,
  ) {}

  @Post()
  create(@Body() createVacinaDto: CreateVacinaDto) {
    return this.createVacinaUseCase.execute(createVacinaDto);
  }

  @Get()
  findAll() {
    return this.listVacinasUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getVacinaUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVacinaDto: UpdateVacinaDto,
  ) {
    return this.updateVacinaUseCase.execute(id, updateVacinaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.removeVacinaUseCase.execute(id);
  }
}
