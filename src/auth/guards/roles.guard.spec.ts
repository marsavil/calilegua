import { RolesGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';

describe('RolesGuard', () => {
  let rolesGuard: RolesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    // Crea un mock del Reflector
    reflector = { get: jest.fn() } as unknown as Reflector;
    rolesGuard = new RolesGuard(reflector); // Inyecta el mock de Reflector
  });

  it('should be defined', () => {
    expect(rolesGuard).toBeDefined();
  });
})