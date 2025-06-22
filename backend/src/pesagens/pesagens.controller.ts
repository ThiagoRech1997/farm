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
import { CreatePesagemUseCase } from './application/create-pesagem.usecase';
import { ListPesagensUseCase } from './application/list-pesagens.usecase';
import { GetPesagemUseCase } from './application/get-pesagem.usecase';
import { UpdatePesagemUseCase } from './application/update-pesagem.usecase';
import { RemovePesagemUseCase } from './application/remove-pesagem.usecase';
import { ListPesagensComNomesUseCase } from './application/list-pesagens-com-nomes.usecase';

@Controller('pesagens')
export class PesagensController {
  constructor(
    @Inject(CreatePesagemUseCase)
    private readonly createUseCase: CreatePesagemUseCase,
    @Inject(ListPesagensUseCase)
    private readonly listUseCase: ListPesagensUseCase,
    @Inject(GetPesagemUseCase)
    private readonly getUseCase: GetPesagemUseCase,
    @Inject(UpdatePesagemUseCase)
    private readonly updateUseCase: UpdatePesagemUseCase,
    @Inject(RemovePesagemUseCase)
    private readonly removeUseCase: RemovePesagemUseCase,
    @Inject(ListPesagensComNomesUseCase)
    private readonly listComNomesUseCase: ListPesagensComNomesUseCase,
  ) {}

  @Post()
  create(@Body() createDto: any) {
    return this.createUseCase.execute(createDto);
  }

  @Get()
  findAll() {
    return this.listUseCase.execute();
  }

  @Get('com-nomes')
  findAllWithAnimalNames() {
    return this.listComNomesUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: any,
  ) {
    return this.updateUseCase.execute(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.removeUseCase.execute(id);
  }
}
