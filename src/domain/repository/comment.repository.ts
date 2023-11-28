import { CreateCommentDto, UpdateCommentDto } from "../dtos";
import { CommentEntity } from "../entities";



export  abstract class CommentRepository {
   abstract getAll(): Promise<CommentEntity[]>
   abstract getOne(id: number): Promise<CommentEntity>
   abstract getByParentId(id: number): Promise<CommentEntity[]>
   abstract create(commentDto: CreateCommentDto): Promise<CommentEntity>
   abstract update(commentDto: UpdateCommentDto): Promise<CommentEntity>
   abstract delete(id: number): Promise<CommentEntity>
}
