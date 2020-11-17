import { Response } from 'express';
import { Body, Controller, Delete, Get, Post, Put, Query, Res } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { DeepPartial, DeleteResult, UpdateResult } from 'typeorm';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import PostService from './post.service';
import CreatePostDto from './dto/create.post.dto';
import UpdatePostDto from './dto/update.post.dto';
import DeletePostDto from './dto/delete.post.dto';
import LikePostDto from './dto/like.post.dto';
import LikesDataInterface from './interfaces/likes.data.interface';
import SortPostDto from './dto/sort.post.dto';
import PostEntity from './entities/post';

const forbiddenMessage = 'you are do not have permissions to perform this operation';

@ApiTags('Posts')
@Controller('posts')
export default class PostsController {
    constructor(private readonly postService: PostService) {}

    @Get()
    @ApiResponse({ type: [PostEntity] })
    async findAll(): Promise<PostEntity[]> {
        return this.postService.findAll();
    }

    @Post()
    @ApiResponse({ type: PostEntity })
    async create(@Body() newPost: CreatePostDto): Promise<PostEntity[]> {
        await validateOrReject(new CreatePostDto(newPost));
        return this.postService.cretePost(newPost);
    }

    @Get('/:id')
    @ApiResponse({ type: PostEntity })
    async findById(@Query('id') id: number): Promise<PostEntity> {
        return this.postService.findByPostId(id);
    }

    @Get('/user/:id')
    @ApiResponse({ type: [PostEntity] })
    async findByUserId(@Query('id') id: number): Promise<PostEntity[]> {
        return this.postService.findByUserId(id);
    }

    @Put('/update')
    @ApiResponse({ type: [UpdateResult] })
    async updateById(@Body() updatePost: UpdatePostDto): Promise<UpdateResult | string> {
        await validateOrReject(new UpdatePostDto(updatePost));
        const post = await this.postService.findOrfail(updatePost.id);

        if (post.author_id === updatePost.author_id) {
            const postData = {
                body: updatePost.body,
                title: updatePost.title,
            };
            const updated = await this.postService.updatePostById(updatePost.id, postData);
            return updated;
        }
        return forbiddenMessage;
    }

    @Delete('/')
    @ApiResponse({ type: DeleteResult })
    private async deleteById(@Body() deletePost: DeletePostDto): Promise<DeleteResult | string> {
        await validateOrReject(new DeletePostDto(deletePost));

        const post = await this.postService.findOrfail(deletePost.id);
        if (post.author_id === deletePost.user_id) {
            return this.postService.deletePost(deletePost.id);
        }
        return forbiddenMessage;
    }

    @Put('/like')
    @ApiResponse({ type: PostEntity })
    private async addLike(@Body() likePost: DeepPartial<LikePostDto>, @Res() res: Response): Promise<Response> {
        await validateOrReject(new LikePostDto(likePost));
        const postData = await this.postService.findOrfail(likePost.post_id);
        let like: string;
        const likes = [];
        if (postData.likes !== null) {
            like = postData.likes.find(id => id === `${likePost.user_id}`);
            likes.push(...postData.likes);
        }
        if (like === undefined) {
            likes.push(likePost.user_id);
            const likesData: LikesDataInterface = { likes };
            await this.postService.updatePostById(likePost.post_id, likesData);
            const data = await this.postService.findByPostId(likePost.post_id);
            return res.status(200).json({ data });
        }

        return res.status(200).json({
            message: 'you have already liked this post',
        });
    }

    @Post('/sort')
    @ApiResponse({ type: [PostEntity] })
    private async sort(@Body() sortPost: SortPostDto): Promise<PostEntity[]> {
        const sortingParametr = sortPost.parametr;
        return this.postService.sortByDate(sortingParametr);
    }

    @Post('/likes')
    @ApiResponse({ type: [PostEntity] })
    private async sortByLikes(@Body() sortPost: SortPostDto): Promise<PostEntity[]> {
        const sortingParametr = sortPost.parametr;
        return this.postService.sortByLikes(sortingParametr);
    }
}
