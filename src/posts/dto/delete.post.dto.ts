import { IsJWT, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { DeepPartial } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export default class DeletePostDto {
    constructor(data: DeepPartial<DeletePostDto>) {
        Object.assign(this, data);
    }

    @ApiProperty({ example: '1', description: 'post Id', required: true })
    @IsNotEmpty()
    @IsString()
    id!: number;

    @ApiProperty({ example: '1', description: 'request user Id', required: true })
    @IsNotEmpty()
    @IsString()
    user_id!: number;

    @ApiProperty({
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJpYXQiOjE2MDU1MzEwMjUsImV4cCI6MTYwNTYxNzQyNX0.hMRyBQ82apTDXOzWi14-u0Oz14_6lvMNSYx6MiVnxks',
        description: 'user access token',
        required: true,
    })
    @IsNotEmpty()
    @IsJWT()
    @MinLength(50)
    @MaxLength(200)
    accessToken!: string;
}
