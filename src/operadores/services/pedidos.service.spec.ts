import { Test, TestingModule } from '@nestjs/testing';
import { PedidosService } from './pedidos.service';
import { getModelToken } from '@nestjs/mongoose';
import { Pedido } from '../entities/pedido.entity';

describe('PedidosService', () => {
  let service: PedidosService;

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
      providers: [
        { provide: PedidosService, useValue: mockPedidosService },
        { provide: getModelToken(Pedido.name), useValue: mockPedidosModel }
      ]
    }).compile();

    service = module.get<PedidosService>(PedidosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPedido', () => {
    it('should return all pedidos', async () => {
      const result = [{ id: '1', name: 'Pedido 1'}];
      mockPedidosService.findAll.mockResolvedValue(result);

      expect(await service.findAll(undefined)).toBe(result);
      expect(mockPedidosService.findAll).toHaveBeenCalled();
    })
})
});
