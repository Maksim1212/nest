import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import AuthService from './auth.service';
import LocalStrategy from './local.strategy';
import { jwtConstants } from './constants';
import JwtStrategy from './jwt.strategy';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    // exports: [AuthService],
})
export default class AuthModule {}
