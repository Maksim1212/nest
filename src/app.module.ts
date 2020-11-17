import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import PostsModule from './posts/post.module';
import UserModule from './users/user.module';
import Post from './posts/entities/post';
import { User } from './users/user.entitie';
import AuthModule from './auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'Bandapixels1!',
            database: 'blog2',
            entities: [Post, User],
            synchronize: true,
        }),
        PostsModule,
        UserModule,
        AuthModule,
    ],
})
export default class AppModule {}
