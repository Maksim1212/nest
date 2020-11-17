import { IsJWT, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { DeepPartial } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export default class CreatePostDto {
    constructor(data: DeepPartial<CreatePostDto>) {
        Object.assign(this, data);
    }

    @ApiProperty({ example: '1', description: 'post author Id', required: true })
    @IsNotEmpty()
    // @IsNumber()
    author_id!: number;

    @ApiProperty({ example: 'test', description: 'post author name', required: true })
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    author_name!: string;

    @ApiProperty({ example: 'lorem ipsum', description: 'post title', required: true })
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    title!: string;

    @ApiProperty({ example: 'post body', description: 'post body', required: true })
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(9000)
    body!: string;

    @ApiProperty({
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJpYXQiOjE2MDU1MzEwMjUsImV4cCI6MTYwNTYxNzQyNX0.hMRyBQ82apTDXOzWi14-u0Oz14_6lvMNSYx6MiVnxks',
        description: 'user accessToken',
        required: true,
    })
    @IsNotEmpty()
    @IsJWT()
    @MinLength(50)
    @MaxLength(200)
    accessToken!: string;
}
