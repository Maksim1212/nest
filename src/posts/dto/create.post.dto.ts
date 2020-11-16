import { IsJWT, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { DeepPartial } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export default class CreatePostDto {
    constructor(data: DeepPartial<CreatePostDto>) {
        Object.assign(this, data);
    }

    @ApiProperty({ example: '1', description: 'post author Id' })
    @IsNotEmpty()
    // @IsNumber()
    author_id!: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    author_name!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    title!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(9000)
    body!: string;

    @IsNotEmpty()
    @IsJWT()
    @MinLength(50)
    @MaxLength(200)
    accessToken!: string;
}
