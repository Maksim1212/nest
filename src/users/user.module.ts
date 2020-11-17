import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserController from './user.controller';
import UserService from './user.service';
import { User } from './user.entitie';
import AuthService from '../auth/auth.service';

@Module({
    imports: [TypeOrmModule.forFeature([User]), AuthService],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export default class UserModule {}
