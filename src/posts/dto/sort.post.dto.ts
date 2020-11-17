import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { DeepPartial } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export default class SortPostDto {
    constructor(data: DeepPartial<SortPostDto>) {
        Object.assign(this, data);
    }

    @ApiProperty({ example: 'ASC', description: 'sorting parameters ASC or DESC' })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(4)
    parametr!: string;
}
