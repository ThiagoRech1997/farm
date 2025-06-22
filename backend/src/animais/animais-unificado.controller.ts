import { Controller, Post, Body, Get, Param, ParseIntPipe, Inject } from '@nestjs/common';
import { CreateAnimalUnificadoDto } from './dto/create-animal-unificado.dto';
import { CreateAnimalUnificadoUseCase } from './application/create-animal-unificado.usecase';
import { ListAnimaisParaPaisUseCase } from './application/list-animais-para-pais.usecase';
import { GetAnimalCompletoUseCase } from './application/get-animal-completo.usecase';

@Controller('animais-unificado')
export class AnimaisUnificadoController {
  constructor(
    @Inject(CreateAnimalUnificadoUseCase)
    private readonly createAnimalUnificadoUseCase: CreateAnimalUnificadoUseCase,
    @Inject(ListAnimaisParaPaisUseCase)
    private readonly listAnimaisParaPaisUseCase: ListAnimaisParaPaisUseCase,
    @Inject(GetAnimalCompletoUseCase)
    private readonly getAnimalCompletoUseCase: GetAnimalCompletoUseCase,
  ) {}

  @Post()
  create(@Body() createAnimalUnificadoDto: CreateAnimalUnificadoDto) {
    return this.createAnimalUnificadoUseCase.execute(createAnimalUnificadoDto);
  }

  @Get('/pais')
  findAnimaisParaPais() {
    return this.listAnimaisParaPaisUseCase.execute();
  }

  @Get(':id/completo')
  findAnimalCompleto(@Param('id', ParseIntPipe) id: number) {
    return this.getAnimalCompletoUseCase.execute(id);
  }

  // Os outros métodos podem ser migrados para casos de uso conforme necessário
} 