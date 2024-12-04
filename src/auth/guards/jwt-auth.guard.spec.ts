import { JwtAuthGuard } from './jwt-auth.guard';
import { Reflector } from '@nestjs/core';

describe('JwtAuthGuard', () => {
  let jwtAuthGuard: JwtAuthGuard;
  let reflectorMock: Reflector;

  beforeEach(() => {
    // Crea un mock de Reflector
    reflectorMock = { 
      get: jest.fn().mockReturnValue(['admin']) // Puedes mockear el valor que necesites para el test
    } as unknown as Reflector;

    // Crea una instancia del guardia, pasando el mock de Reflector
    jwtAuthGuard = new JwtAuthGuard(reflectorMock);
  });

  it('should be defined', () => {
    expect(jwtAuthGuard).toBeDefined();
  });

  // Aquí puedes agregar más tests, verificando el comportamiento de JwtAuthGuard
});
