import { ApiKeyGuard } from './api-key.guard';
import { Reflector } from '@nestjs/core';
import config from '../../config';
import { ConfigType } from '@nestjs/config';
import { ExecutionContext } from '@nestjs/common';

describe('ApiKeyGuard', () => {
  let guard: ApiKeyGuard;
  let mockReflector: Reflector;
  let mockConfigService: ConfigType<typeof config>;

  beforeEach(() => {
    // Mock de Reflector
    mockReflector = {
      get: jest.fn(), // Mockeamos el método `get` del Reflector
    } as unknown as Reflector;

    // Mock de ConfigService
    mockConfigService = {
      apiKey: 'mockApiKey', // Define la API Key simulada
    } as ConfigType<typeof config>;

    // Instanciamos el guard con los mocks
    guard = new ApiKeyGuard(mockConfigService, mockReflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should allow access to public routes', () => {
    // Simula que el reflector detecta una ruta pública
    jest.spyOn(mockReflector, 'get').mockReturnValue(true);

    const mockContext = {
      switchToHttp: () => ({
        getRequest: jest.fn(),
      }),
      getHandler: jest.fn(),
    } as unknown as ExecutionContext;

    const result = guard.canActivate(mockContext);
    expect(result).toBe(true);
  });

  it('should deny access when API key is invalid', () => {
    jest.spyOn(mockReflector, 'get').mockReturnValue(false); // Ruta no pública

    const mockRequest = {
      header: jest.fn().mockReturnValue('invalidApiKey'), // Mock de cabecera con API Key inválida
    };

    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
      getHandler: jest.fn(),
    } as unknown as ExecutionContext;

    expect(() => guard.canActivate(mockContext)).toThrowError(
      'No tienes los permisos necesario para acceder a este endpoint',
    );
  });

  it('should allow access when API key is valid', () => {
    jest.spyOn(mockReflector, 'get').mockReturnValue(false); // Ruta no pública

    const mockRequest = {
      header: jest.fn().mockReturnValue('mockApiKey'), // Mock de cabecera con API Key válida
    };

    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
      getHandler: jest.fn(),
    } as unknown as ExecutionContext;

    const result = guard.canActivate(mockContext);
    expect(result).toBe(true);
  });
});
