import { IsJWT, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { DeepPartial } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export default class UpdatePostDto {
    constructor(data: DeepPartial<UpdatePostDto>) {
        Object.assign(this, data);
    }

    @ApiProperty({ example: '1', description: 'post Id', required: true })
    @IsNotEmpty()
    @IsNumber()
    id!: number;

    @ApiProperty({ example: '1', description: 'post author Id', required: true })
    @IsNotEmpty()
    @IsNumber()
    author_id!: number;

    @ApiProperty({ example: 'title', description: 'post title', required: true })
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    title!: string;

    @ApiProperty({ example: 'body', description: 'post body', required: true })
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(9000)
    body!: string;

    @ApiProperty({ example: 'accessToken', description: 'user accessToken', required: true })
    @IsNotEmpty()
    @IsJWT()
    @MinLength(50)
    @MaxLength(200)
    accessToken!: string;
}
