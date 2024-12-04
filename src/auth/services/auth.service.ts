import { Injectable } from '@nestjs/common';
import { OperadoresService } from '../../operadores/services/operadores.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Operador } from '../../operadores/entities/operador.entity';
import { PayloadToken } from './../models/token.model'

@Injectable()
export class AuthService {
  constructor(
    private operadoresService: OperadoresService,
    private jwtService: JwtService, // Inyección de dependencia de JwtService
  )
  {}
  async validateUser (email: string, password: string){
    const operador = await this.operadoresService.findByEmail(email)
    if( operador ){
      const isMatch = await bcrypt.compare(password, operador.password)
      if( isMatch ){
        const { password, ...rest } = operador.toJSON()
        const id = rest._id.toString()
        rest._id = id
        return rest
      }
    }
    return null
  }
  generateJWT(operador: Operador){
    const payload: PayloadToken = { role: operador.role, sub: operador.id };

    return {
      access_token: this.jwtService.sign(payload), //se genera el token
      operador,
    };
  }
}
