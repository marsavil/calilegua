import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    validateUser: jest.fn().mockResolvedValue({ id: 1, nombre: 'Test User' }),
    generateJWT: jest.fn().mockReturnValue('mockToken'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getOperador', () => {
    it('should validate user logged', async () => {
      const mockUser = { id: 1, email: 'test@example.com', role: 'admin' };
      const mockRequest = { user: mockUser } as any; // Simulamos el objeto Request con la propiedad user.

      const result = await controller.login(mockRequest);

      expect(result).toBe('mockToken'); // Verificamos que se retorna el token esperado.
      expect(mockAuthService.generateJWT).toHaveBeenCalledWith(mockUser);
    })
})
});
