import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import config from "src/config";
import { PayloadToken } from "../models/token.model";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor( @Inject(config.KEY) configSerrvice: ConfigType<typeof config>){
    super ({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configSerrvice.jwtSecret,
    })
  }

  validate(payload: PayloadToken){
    return payload; // return the user object if the token is valid
  }
}