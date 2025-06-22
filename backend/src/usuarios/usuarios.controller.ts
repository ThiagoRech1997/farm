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
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateUsuarioUseCase } from './application/create-usuario.usecase';
import { ListUsuariosUseCase } from './application/list-usuarios.usecase';
import { GetUsuarioUseCase } from './application/get-usuario.usecase';
import { UpdateUsuarioUseCase } from './application/update-usuario.usecase';
import { RemoveUsuarioUseCase } from './application/remove-usuario.usecase';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    @Inject(CreateUsuarioUseCase)
    private readonly createUsuarioUseCase: CreateUsuarioUseCase,
    @Inject(ListUsuariosUseCase)
    private readonly listUsuariosUseCase: ListUsuariosUseCase,
    @Inject(GetUsuarioUseCase)
    private readonly getUsuarioUseCase: GetUsuarioUseCase,
    @Inject(UpdateUsuarioUseCase)
    private readonly updateUsuarioUseCase: UpdateUsuarioUseCase,
    @Inject(RemoveUsuarioUseCase)
    private readonly removeUsuarioUseCase: RemoveUsuarioUseCase,
  ) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.createUsuarioUseCase.execute(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.listUsuariosUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getUsuarioUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.updateUsuarioUseCase.execute(id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.removeUsuarioUseCase.execute(id);
  }
}
