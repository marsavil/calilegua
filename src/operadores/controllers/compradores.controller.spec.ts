import { Test, TestingModule } from '@nestjs/testing';
import { CompradoresController } from './compradores.controller';
import { CompradoresService } from '../services/compradores.service';
import { getModelToken } from '@nestjs/mongoose';
import { Comprador } from '../entities/comprador.entity';

describe('CompradoresController', () => {
  let controller: CompradoresController;
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
      controllers: [CompradoresController],
      providers: [
        { provide: CompradoresService, useValue: mockCompradoresService },
        { provide: getModelToken(Comprador.name), useValue: mockCompradoresModel },
      ]
    }).compile();

    controller = module.get<CompradoresController>(CompradoresController);
    service = module.get<CompradoresService>(CompradoresService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getComprador', () => {
    it('should return all compradores', async () => {
      const result = [{ nombre: "Juan", apellido: "Pérez", telefono: "123456789"}];
      mockCompradoresService.findAll.mockResolvedValue(result);

      expect(await controller.getAllCompradores(undefined)).toBe(result);
      expect(mockCompradoresService.findAll).toHaveBeenCalled();
    })
})
});
