import { Test, TestingModule } from '@nestjs/testing';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from '../services/pedidos.service';
import { Pedido } from '../entities/pedido.entity';
import { ProductosService } from '../../productos/services/productos.service';
import { getModelToken } from '@nestjs/mongoose';

describe('PedidosController', () => {
  let controller: PedidosController;
  let service : PedidosService

  const mockPedidosModel = {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndDelete: jest.fn(),
  }
  const mockPedidosService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
    removeProducto: jest.fn(),
    addProductos: jest.fn(),
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidosController],
      providers: [
        { provide: PedidosService, useValue: mockPedidosService },
        { provide: getModelToken(Pedido.name), useValue: mockPedidosModel },
        { provide: ProductosService, useValue: {} },
      ]
    }).compile();

    controller = module.get<PedidosController>(PedidosController);
    service = module.get<PedidosService>(PedidosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPedido', () => {
    it('should return all pedidos', async () => {
      const result = [{ id: '1', name: 'Pedido 1'}];
      mockPedidosService.findAll.mockResolvedValue(result);

      expect(await controller.getAllPedidos(undefined)).toBe(result);
      expect(mockPedidosService.findAll).toHaveBeenCalled();
    })
})
});
