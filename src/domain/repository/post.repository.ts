import { CreatePostDto, UpdatePostDto } from "../dtos";
import { PostEntity } from "../entities";

export  abstract class PostRepository {
   abstract getAll(): Promise<PostEntity[]>
   abstract getOne(): Promise<PostEntity>
   abstract create(postDto: CreatePostDto): Promise<PostEntity>
   abstract update(postDto: UpdatePostDto): Promise<PostEntity>
   abstract delete(): Promise<PostEntity>
}
