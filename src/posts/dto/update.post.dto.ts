import { IsJWT, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { DeepPartial } from 'typeorm';

export default class UpdatePostDto {
    constructor(data: DeepPartial<UpdatePostDto>) {
        Object.assign(this, data);
    }

    @IsNotEmpty()
    @IsNumber()
    id!: number;

    @IsNotEmpty()
    @IsNumber()
    author_id!: number;

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
