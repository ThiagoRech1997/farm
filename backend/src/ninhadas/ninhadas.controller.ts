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
import { CreateNinhadaDto } from './dto/create-ninhada.dto';
import { UpdateNinhadaDto } from './dto/update-ninhada.dto';
import { CreateNinhadaUseCase } from './application/create-ninhada.usecase';
import { ListNinhadasUseCase } from './application/list-ninhadas.usecase';
import { GetNinhadaUseCase } from './application/get-ninhada.usecase';
import { UpdateNinhadaUseCase } from './application/update-ninhada.usecase';
import { RemoveNinhadaUseCase } from './application/remove-ninhada.usecase';

@Controller('ninhadas')
export class NinhadasController {
  constructor(
    @Inject(CreateNinhadaUseCase)
    private readonly createNinhadaUseCase: CreateNinhadaUseCase,
    @Inject(ListNinhadasUseCase)
    private readonly listNinhadasUseCase: ListNinhadasUseCase,
    @Inject(GetNinhadaUseCase)
    private readonly getNinhadaUseCase: GetNinhadaUseCase,
    @Inject(UpdateNinhadaUseCase)
    private readonly updateNinhadaUseCase: UpdateNinhadaUseCase,
    @Inject(RemoveNinhadaUseCase)
    private readonly removeNinhadaUseCase: RemoveNinhadaUseCase,
  ) {}

  @Post()
  create(@Body() createNinhadaDto: CreateNinhadaDto) {
    return this.createNinhadaUseCase.execute(createNinhadaDto);
  }

  @Get()
  findAll() {
    return this.listNinhadasUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getNinhadaUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNinhadaDto: UpdateNinhadaDto,
  ) {
    return this.updateNinhadaUseCase.execute(id, updateNinhadaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.removeNinhadaUseCase.execute(id);
  }
}
