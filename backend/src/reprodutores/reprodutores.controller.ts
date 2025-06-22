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
import { CreateReprodutorUseCase } from './application/create-reprodutor.usecase';
import { ListReprodutoresUseCase } from './application/list-reprodutores.usecase';
import { GetReprodutorUseCase } from './application/get-reprodutor.usecase';
import { UpdateReprodutorUseCase } from './application/update-reprodutor.usecase';
import { RemoveReprodutorUseCase } from './application/remove-reprodutor.usecase';

@Controller('reprodutores')
export class ReprodutoresController {
  constructor(
    @Inject(CreateReprodutorUseCase)
    private readonly createReprodutorUseCase: CreateReprodutorUseCase,
    @Inject(ListReprodutoresUseCase)
    private readonly listReprodutoresUseCase: ListReprodutoresUseCase,
    @Inject(GetReprodutorUseCase)
    private readonly getReprodutorUseCase: GetReprodutorUseCase,
    @Inject(UpdateReprodutorUseCase)
    private readonly updateReprodutorUseCase: UpdateReprodutorUseCase,
    @Inject(RemoveReprodutorUseCase)
    private readonly removeReprodutorUseCase: RemoveReprodutorUseCase,
  ) {}

  @Post()
  create(@Body() createReprodutorDto: any) {
    return this.createReprodutorUseCase.execute(createReprodutorDto);
  }

  @Get()
  findAll() {
    return this.listReprodutoresUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getReprodutorUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReprodutorDto: any,
  ) {
    return this.updateReprodutorUseCase.execute(id, updateReprodutorDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.removeReprodutorUseCase.execute(id);
  }
}
