import { Test, TestingModule } from '@nestjs/testing';
import { CompradoresService } from './compradores.service';
import { getModelToken } from '@nestjs/mongoose';
import { Comprador } from '../entities/comprador.entity';

describe('CompradoresService', () => {
  let service: CompradoresService;

  const mockCompradoresModel = {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  }
  const mockCompradoresService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
    update: jest.fn(),
  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: CompradoresService, useValue: mockCompradoresService },
        { provide: getModelToken(Comprador.name), useValue: mockCompradoresModel },
      ]
    }).compile();

    service = module.get<CompradoresService>(CompradoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getComprador', () => {
    it('should return all compradores', async () => {
      const result = [{ nombre: "Juan", apellido: "Pérez", telefono: "123456789"}];
      mockCompradoresService.findAll.mockResolvedValue(result);

      expect(await service.findAll(undefined)).toBe(result);
      expect(mockCompradoresService.findAll).toHaveBeenCalled();
    })
})
});
