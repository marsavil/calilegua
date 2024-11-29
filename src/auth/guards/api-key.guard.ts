import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express'
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    private reflector: Reflector,  

  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler()) 
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('auth') ;
    const isAuthorized = authHeader ===  this.configService.apiKey;
    if( !isAuthorized ){
      throw new UnauthorizedException( 'No tienes los permisos necesario para acceder a este endpoint' )
    }
    return isAuthorized;
  }
}
