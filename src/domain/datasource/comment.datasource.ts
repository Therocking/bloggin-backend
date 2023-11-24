import { CreateCommentDto, UpdateCommentDto } from "../dtos";
import { CommentEntity } from "../entities";




export abstract class CommentDatasource {
   abstract getAll(): Promise<CommentEntity>
   abstract getOne(id: number): Promise<CommentEntity>
   abstract create(commentDto: CreateCommentDto): Promise<CommentEntity[]>
   abstract update(commentDto: UpdateCommentDto): Promise<CommentEntity>
   abstract delete(id: number): Promise<CommentEntity>
} 
