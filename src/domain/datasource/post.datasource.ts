import { CreatePostDto, UpdatePostDto } from "../dtos";
import { PostEntity } from "../entities";

export abstract class PostDatasource {
   abstract getAll(): Promise<PostEntity[]>
   abstract getOne(id: number): Promise<PostEntity>
   abstract create(postDto: CreatePostDto): Promise<PostEntity>
   abstract update(postDto: UpdatePostDto): Promise<PostEntity>
   abstract delete(id: number): Promise<PostEntity>
} 
