import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasService } from './categorias.service';
import { getModelToken } from '@nestjs/mongoose';
import { Categoria } from '../entities/categoria.entity';

describe('CategoriasService', () => {
  let service: CategoriasService;

  const mockCategoriasModel = {
    find: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  }
  const mockCategoriasService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByNameOrCreate: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
    update: jest.fn(),
    findCategoriesByProduct: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: CategoriasService, useValue: mockCategoriasService },
        { provide: getModelToken(Categoria.name), useValue: mockCategoriasModel },
      ]
    }).compile();

    service = module.get<CategoriasService>(CategoriasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCategoria', () => {
    it('should return all categorias', async () => {
      const result = [{  nombre: "categoria 1", imagen: "categoria.png"}];
      mockCategoriasService.findAll.mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
      expect(mockCategoriasService.findAll).toHaveBeenCalled();
    })
})
});
