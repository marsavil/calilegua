import { Test, TestingModule } from '@nestjs/testing';
import { FabricantesService } from './fabricantes.service';
import { getModelToken } from '@nestjs/mongoose';
import { Fabricante } from '../entities/fabricante.entity';

describe('FabricantesService', () => {
  let service: FabricantesService;

  const mockFabricantesModel = {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  }
  const mockFabricantesService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
    update: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: FabricantesService, useValue: mockFabricantesService },
        { provide: getModelToken(Fabricante.name), useValue: mockFabricantesModel },
      ]
    }).compile();

    service = module.get<FabricantesService>(FabricantesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getProducto', () => {
    it('should return all compradores', async () => {
      const result = [{ 
        nombre: "Fabricante1",
        direccion: "calle 1",
        email: "fabricante1@mail.com",
        imagen: "https://res.cloudinary.com/dlzp43wz9/image/upload/v1709585844/user-icon-2048x2048-ihoxz4vq_ydc8ku.png"}
  ];
      mockFabricantesService.findAll.mockResolvedValue(result);

      expect(await service.findAll(undefined)).toBe(result);
      expect(mockFabricantesService.findAll).toHaveBeenCalled();
    })
})
});
