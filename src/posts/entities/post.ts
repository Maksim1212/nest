import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export default class Post {
    @ApiProperty({ example: '1', description: 'post Id' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: '1', description: 'post author Id' })
    @Column({ type: 'varchar' })
    author_id: number;

    @ApiProperty({ example: 'test', description: 'post author name' })
    @Column({ type: 'varchar' })
    author_name: string;

    @ApiProperty({ example: 'test', description: 'post title' })
    @Column({ type: 'varchar' })
    title: string;

    @ApiProperty({ example: 'test', description: 'post body' })
    @Column({ type: 'text' })
    body: string;

    @ApiProperty({ example: ['1', '22', '153'], description: 'post likes users ID' })
    @Column({ type: 'json', default: null })
    likes: string[];

    @ApiProperty({ example: '2020-11-16T12:00:37.000Z', description: 'post creationTime' })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    creation_time: Date | string;
}
