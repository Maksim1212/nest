import { Test } from '@nestjs/testing';
import * as chalk from 'chalk';

import { TypeOrmModule } from '@nestjs/typeorm';
import PostsController from './posts.controller';
import PostService from './post.service';
import Post from './entities/post';
import { User } from '../users/user.entitie';

describe('PostsController', () => {
    let postsController: PostsController;
    let postsService: PostService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [PostsController],
            providers: [PostService],
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
                TypeOrmModule.forFeature([Post]),
            ],
        }).compile();
        postsService = moduleRef.get<PostService>(PostService);
        postsController = moduleRef.get<PostsController>(PostsController);
    });

    describe('findAll', () => {
        it('should return an array of posts objects', async () => {
            const result = [
                {
                    author_id: 1,
                    author_name: 'Lorem',
                    title: 'Lorem ipsum',
                    body: 'Lorem ipsum, lorem ipsum, lorem ipsum',
                    likes: ['1', '2', '4'],
                    id: 1,
                    creation_time: new Date(),
                },
            ];

            jest.spyOn(postsService, 'findAll').mockResolvedValueOnce(result);

            expect(await postsController.findAll()).toBe(result);
        });
    });

    // describe('findById', () => {
    //     it('should return one post', async () => {
    //         const result = {
    //             author_id: 1,
    //             author_name: 'Lorem',
    //             title: 'Lorem ipsum',
    //             body: 'Lorem ipsum, lorem ipsum, lorem ipsum',
    //             likes: ['1', '2', '4'],
    //             id: 1,
    //             creation_time: new Date(),
    //         };
    //
    //         jest.spyOn(postsService, 'findByPostId').mockResolvedValueOnce(result);
    //
    //         expect(await postsController.findById(1)).toBe(result);
    //     });
    // });

    // describe('* Testing Maths', () => {
    //     it('should return a number of 5', () => {
    //         const x = 5;
    //         const y = 0;
    //         const expectedResult = 5;
    //         expect(x + y).toEqual(expectedResult);
    //         expect(typeof (x + y)).toBe('number');
    //     });
    // });
});
