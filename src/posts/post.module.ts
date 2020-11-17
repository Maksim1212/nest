import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import PostController from './posts.controller';
import PostService from './post.service';
import Post from './entities/post';

@Module({
    imports: [TypeOrmModule.forFeature([Post])],
    providers: [PostService],
    controllers: [PostController],
    exports: [PostService],
})
export default class PostsModule {}
