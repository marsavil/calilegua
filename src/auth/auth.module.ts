import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { OperadoresModule } from 'src/operadores/operadores.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [OperadoresModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
