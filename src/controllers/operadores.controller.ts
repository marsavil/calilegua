import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('operadores')
export class OperadoresController {
  @Get()
  getAllOperadores() {
    return [
      { id: 1, nombre: 'Juan', apellido: 'Perez', edad: 30 },
      { id: 2, nombre: 'Maria', apellido: 'Garcia', edad: 28 },
      { id: 3, nombre: 'Pedro', apellido: 'Lopez', edad: 32 },
    ];
  }
  @Get(':id')
  getOperadorById(@Param('id') id: number) {
    return `Operador ${id}`;
  }
  @Post('add')
  createOperador(@Body() payload: any) {
    return {
      message: 'Operador creado exitosamente',
      payload,
    };
  }

  @Put('edit/:id')
  updateOperador(@Param('id') id: number, @Body() payload: any) {
    return {
      message: `Operador ${id} actualizado exitosamente`,
      payload,
    };
  }
  @Delete('delete/:id')
  deleteOperador(@Param('id') id: number) {
    return {
      message: `Operador ${id} eliminado exitosamente`,
    };
  }
}
