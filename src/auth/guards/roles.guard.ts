import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PayloadToken } from '../models/token.model';
import { Role } from '../models/roles.model';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const operador = request.user as PayloadToken;
    if (!operador) {
      console.error('El objeto "user" no está definido en la petición.');
      throw new UnauthorizedException('Usuario no autenticado.');
    }
    
    if (!operador.role) {
      console.error('El usuario no tiene rol asignado:', operador);
      throw new UnauthorizedException('El rol no está definido.');
    }

    const isAuth = roles.some((role) => role === operador.role);
    if (!isAuth) {
      throw new UnauthorizedException(
        'Tus credenciales no son validas para realizar esta tarea',
      );
    }
    return isAuth;
  }
}
