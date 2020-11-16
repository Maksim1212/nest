import { Test } from '@nestjs/testing';
import * as faker from 'faker';
import { getRepositoryToken } from '@nestjs/typeorm';

import Post from './entities/post';
import PostService from './post.service';

const testPost = {
    id: faker.random.number(),
    author_id: faker.random.number(),
    author_name: faker.name.firstName(),
    title: faker.name.title(),
    body: faker.lorem.text(),
};

const secondTestPost = {
    id: faker.random.number(),
    author_id: faker.random.number(),
    author_name: faker.name.firstName(),
    title: faker.name.title(),
    body: faker.lorem.text(),
};

describe('PostsService', () => {
    let postService: PostService;

    beforeEach(async () => {
        const modRef = await Test.createTestingModule({
            providers: [
                PostService,
                {
                    provide: getRepositoryToken(Post),
                    useValue: {
                        find: jest.fn(() => testPost),
                        findOne: jest.fn(() => testPost),
                        // create: jest.fn(() => testPost),
                    },
                },
            ],
        }).compile();
        postService = modRef.get(PostService);
    });

    it('postService should be defined', () => {
        expect(postService).toBeDefined();
    });

    it('should get the posts', async () => {
        expect(await postService.findAll()).toEqual(testPost);
    });

    it('should get one post by id', async () => {
        expect(await postService.findByPostId(1)).toEqual(testPost);
    });

    it('should get one post by user id', async () => {
        expect(await postService.findByUserId(1)).toEqual(testPost);
    });
    // it('should add a cat', async () => {
    //     expect(await service.cretePost({ name: 'Test', age: 5, breed: 'Russian Blue' })).toEqual(testCat);
    // });
});
