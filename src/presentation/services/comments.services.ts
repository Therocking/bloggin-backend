import { CommentRepository, CreateCommentDto, CustomHttpErrors, UpdateCommentDto, listErrors } from "../../domain";





export class CommentService {
   constructor(
      private readonly commentRepository: CommentRepository
   ){}

   public async getComments() {
      try{
	 const comments = await this.commentRepository.getAll()

	 return {comments}
      }catch(error) {
	 if( error instanceof CustomHttpErrors && error.statusCode !== 500 ) throw error;
	 throw CustomHttpErrors.interanlError(listErrors.SERVER_ERROR)
      }
   }

   public async getComment(id: number) {
      try{
	 const comment = await this.commentRepository.getOne(id)

	 return {comment}
      }catch(error) {
	 if( error instanceof CustomHttpErrors && error.statusCode !== 500 ) throw error;
	 throw CustomHttpErrors.interanlError(listErrors.SERVER_ERROR)
      }
   }
   
   public async getAnswers(id: number) {
      try{
	 const answers = await this.commentRepository.getByParentId(id)

	 return {answers}
      }catch(error) {
	 if( error instanceof CustomHttpErrors && error.statusCode !== 500 ) throw error;
	 throw CustomHttpErrors.interanlError(listErrors.SERVER_ERROR)
      }
   }
   
   public async createComment(commentDto: CreateCommentDto) {
      try{
	 const comment = await this.commentRepository.create(commentDto)

	 return {comment}
      }catch(error) {
	 if( error instanceof CustomHttpErrors && error.statusCode !== 500 ) throw error;
	 throw CustomHttpErrors.interanlError(listErrors.SERVER_ERROR)
      }
   }
    public async updateComment(commentDto: UpdateCommentDto) {
      try{
	 const comment = await this.commentRepository.update(commentDto)

	 return {comment}
      }catch(error) {
	 if( error instanceof CustomHttpErrors && error.statusCode !== 500 ) throw error;
	 throw CustomHttpErrors.interanlError(listErrors.SERVER_ERROR)
      }
   }

   public async deleteComment(id: number) {
      try{
	 const comment = await this.commentRepository.delete(id)

	 return {comment}
      }catch(error) {
	 if( error instanceof CustomHttpErrors && error.statusCode !== 500 ) throw error;
	 throw CustomHttpErrors.interanlError(listErrors.SERVER_ERROR)
      }
   }
}
