import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateAnimalUseCase } from './application/create-animal.usecase';
import { ListAnimalsUseCase } from './application/list-animals.usecase';
import { GetAnimalUseCase } from './application/get-animal.usecase';
import { UpdateAnimalUseCase } from './application/update-animal.usecase';
import { RemoveAnimalUseCase } from './application/remove-animal.usecase';
import { RegistrarSaidaAnimalUseCase } from './application/registrar-saida-animal.usecase';

@Controller('animais')
export class AnimaisController {
  constructor(
    @Inject(CreateAnimalUseCase)
    private readonly createAnimalUseCase: CreateAnimalUseCase,
    @Inject(ListAnimalsUseCase)
    private readonly listAnimalsUseCase: ListAnimalsUseCase,
    @Inject(GetAnimalUseCase)
    private readonly getAnimalUseCase: GetAnimalUseCase,
    @Inject(UpdateAnimalUseCase)
    private readonly updateAnimalUseCase: UpdateAnimalUseCase,
    @Inject(RemoveAnimalUseCase)
    private readonly removeAnimalUseCase: RemoveAnimalUseCase,
    @Inject(RegistrarSaidaAnimalUseCase)
    private readonly registrarSaidaAnimalUseCase: RegistrarSaidaAnimalUseCase,
  ) {}

  @Post()
  async create(@Body() dto: any) {
    return this.createAnimalUseCase.execute(dto);
  }

  @Get()
  async findAll() {
    return this.listAnimalsUseCase.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.getAnimalUseCase.execute(Number(id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.updateAnimalUseCase.execute(Number(id), dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.removeAnimalUseCase.execute(Number(id));
  }

  @Post('saida')
  async registrarSaida(@Body() dto: any) {
    return this.registrarSaidaAnimalUseCase.execute(dto);
  }
}
