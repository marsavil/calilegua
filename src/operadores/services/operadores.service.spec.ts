import { Test, TestingModule } from '@nestjs/testing';
import { OperadoresService } from '../services/operadores.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Operador, OperadorSchema } from '../entities/operador.entity'; // Asegúrate de que el modelo esté correctamente importado
import { CompradoresService } from '../services/compradores.service';
import { ProductosService } from '../../productos/services/productos.service';
import { ConfigService } from '@nestjs/config';

describe('OperadoresService', () => {
  let service: OperadoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // Registra el modelo Operador usando MongooseModule
        MongooseModule.forFeature([{ name: Operador.name, schema: OperadorSchema }]),
      ],
      providers: [
        OperadoresService,
        CompradoresService,
        ProductosService,
        ConfigService,
      ],
    }).compile();

    service = module.get<OperadoresService>(OperadoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
