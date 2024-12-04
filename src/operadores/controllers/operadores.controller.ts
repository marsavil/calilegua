import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OperadoresService } from '../services/operadores.service';
import { CreateOperadorDTO, FilterOperadoresDTO, UpdateOperadorDTO } from '../dtos/operador.dto';
import { MongoIdPipe } from '../../common/mongo-id.pipe';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@ApiTags('Operadores')
@Controller('operadores')
export class OperadoresController {
  constructor(private operadoresService: OperadoresService){}
  @Get()
  @ApiOperation({summary: 'Devuelve una lista con todos los operadores'})
  getAllOperadores(@Query() params: FilterOperadoresDTO) {
    return this.operadoresService.findAll(params);
  }
  @Get(':id')
  @ApiOperation({summary: 'Devuelve la información del operador identificado con el id suministrado'})
  getOperadorById(@Param('id', MongoIdPipe) id: string) {
    return this.operadoresService.findOne(id);;
  }
  @Post('seed')
  @ApiOperation({summary: 'Carga inicial de operadores para la base de datos'})
  seedDB() {
    return this.operadoresService.seedDB();
  }
  @Post('add')
  @ApiOperation({summary: 'Crea un nuevo operador con la información suministrada'})
  createOperador(@Body() payload: CreateOperadorDTO) {
    return this.operadoresService.create(payload);
  }

  @Put('edit/:id')
  @ApiOperation({summary: 'Actualiza la información del operador identificado con el id suministrado'})
  updateOperador(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateOperadorDTO) {
    return this.operadoresService.update(id, payload)
  }

  // @Get (':id/pedidos')
  // @ApiOperation({summary: 'Devuelve una lista con todos los pedidos realizados por el operador identificado con el id suministrado'})
  // getOrders( @Param('id', ParseIntPipe) id: number ){
  //   return this.operadoresService.getOrdersByUser(id);
  // }
  @Delete('delete/:id')
  @ApiOperation({summary: 'Elimina el opérador identificado con el id suministrado'})
  deleteOperador(@Param('id', MongoIdPipe) id: string) {
    console.log(`operador a elimnar con id ${id}`)

    return this.operadoresService.remove(id);
  }
  // @Get('tasks')
  // @ApiOperation({summary: 'Solicita el listado de tareas a realizar'})
  // getTasks() {
  //   console.log('Solcitando las tareas');
  //   return this.operadoresService.getTasks();
  // }


}
