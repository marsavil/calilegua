import { Test, TestingModule } from '@nestjs/testing';
import { ProductosController } from './productos.controller';
import { ProductosService } from '../services/productos.service';
import { getModelToken } from '@nestjs/mongoose';
import { Producto } from '../entities/producto.entity';

describe('ProductosController', () => {
  let controller: ProductosController;
  let service: ProductosService;

  const mockProductosModel = {
    find: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  }
  const mockProductosService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByCategory: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
    update: jest.fn(),
    removeProductFromCategory: jest.fn(),
  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductosController],
      providers: [
        { provide: ProductosService, useValue: mockProductosService },
        { provide: getModelToken(Producto.name), useValue: mockProductosModel },
      ]
    }).compile();

    controller = module.get<ProductosController>(ProductosController);
    service = module.get<ProductosService>(ProductosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProducto', () => {
    it('should return all productos', async () => {
      const result = [{ 
        nombre: "Producto 1",
        precio: 100,
        stock: 10,
        descripcion: "Descripción del producto 1",
        imagen: "imagen1.png",
        origen: "Origen 1",
        fabricante: "674712fcc903ac3b1cec5666",
        categoria: {  nombre: "Varios", imagen: 'imagenCategoria.png' },}];
      mockProductosService.findAll.mockResolvedValue(result);

      expect(await controller.getAllProductos(undefined)).toBe(result);
      expect(mockProductosService.findAll).toHaveBeenCalled();
    })
})
});
