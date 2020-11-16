import { Test } from '@nestjs/testing';
import * as faker from 'faker';

import PostsController from './posts.controller';
import PostService from './post.service';

const testPost = {
    id: faker.random.number(),
    author_id: faker.random.number(),
    author_name: faker.name.firstName(),
    title: faker.name.title(),
    body: faker.lorem.text(),
    accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJpYXQiOjE2MDQwNTA4ODIsImV4cCI6MTYwNDEzNzI4Mn0.cXIbu_1ZlLFjh5rkyQHspjjb268qOQcxiTBb4c3aJcY',
};

const testPost2 = {
    id: faker.random.number(),
    author_id: faker.random.number(),
    author_name: faker.name.firstName(),
    title: faker.name.title(),
    body: faker.lorem.text(),
    accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJpYXQiOjE2MDQwNTA4ODIsImV4cCI6MTYwNDEzNzI4Mn0.cXIbu_1ZlLFjh5rkyQHspjjb268qOQcxiTBb4c3aJcY',
};

describe('PostsController', () => {
    let controller: PostsController;

    beforeEach(async () => {
        const modRef = await Test.createTestingModule({
            controllers: [PostsController],
            providers: [
                {
                    provide: PostService,
                    useValue: {
                        findAll: jest.fn(() => [testPost]),
                        cretePost: jest.fn(() => testPost),
                        findByPostId: jest.fn(() => testPost),
                        findByUserId: jest.fn(() => testPost),
                        updatePostById: jest.fn(() => testPost),
                        findOrfail: jest.fn(() => testPost),
                    },
                },
            ],
        }).compile();
        controller = modRef.get(PostsController);
    });

    it('should get the posts', async () => {
        expect(await controller.findAll()).toEqual([testPost]);
    });
    it('should create new post', async () => {
        expect(await controller.create(testPost)).toEqual(testPost);
    });
    it('should get one post by id', async () => {
        expect(await controller.findById(1)).toEqual(testPost);
    });
    it('should get one post by userId', async () => {
        expect(await controller.findByUserId(1)).toEqual(testPost);
    });
    it('should updated post by Id', async () => {
        expect(await controller.updateById(testPost)).toEqual(testPost);
    });
    it('should updated post by Id', async () => {
        expect(await controller.updateById(testPost2)).toEqual(new Error('forbidden'));
    });
});
