import { Test, TestingModule } from '@nestjs/testing';
import { OperadoresService } from '../services/operadores.service';
import { getModelToken } from '@nestjs/mongoose';
import { Operador } from '../entities/operador.entity'; 
import { OperadoresController } from '../controllers/operadores.controller';

describe('OperadoresService', () => {
  let service: OperadoresService;

  const mockOperadoresModel = {
    find: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  }
  const mockOperadoresService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findByEmail: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperadoresController],
      providers: [
        { provide: OperadoresService, useValue: mockOperadoresService },
        { provide: getModelToken(Operador.name), useValue: mockOperadoresModel },
      ]
    }).compile();

    service = module.get<OperadoresService>(OperadoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOperador', () => {
    it('should return all operadores', async () => {
      const result = [{ email: 'operador1@email.com', password: '123456', role: 'admin'}];
      mockOperadoresService.findAll.mockResolvedValue(result);

      expect(await service.findAll(undefined)).toBe(result);
      expect(mockOperadoresService.findAll).toHaveBeenCalled();
    })
})
});
