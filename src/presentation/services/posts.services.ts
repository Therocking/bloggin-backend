import { CreatePostDto, CustomHttpErrors, PostRepository, UpdatePostDto, listErrors } from "../../domain";






export class PostService {
   constructor(
      private readonly postRepository: PostRepository 
   ){}

   public async getPosts() {
      try{
	 const posts = await this.postRepository.getAll();

	 return {posts}
      }catch(error) {
	 if( error instanceof CustomHttpErrors && error.statusCode !== 500 ) throw error;
	 throw CustomHttpErrors.interanlError(listErrors.SERVER_ERROR)
      }
   }

   public async getPost(id: number) {
      try{
	 const post = await this.postRepository.getOne(id);

	 return {post}
      }catch(error) {
	 if( error instanceof CustomHttpErrors && error.statusCode !== 500 ) throw error;
	 throw CustomHttpErrors.interanlError(listErrors.SERVER_ERROR)
      }
   }

   public async createPost(postDto: CreatePostDto) {
      try{
	 const newPost = await this.postRepository.create(postDto);

	 return {post: newPost}
      }catch(error) {
	 if( error instanceof CustomHttpErrors && error.statusCode !== 500 ) throw error;
	 throw CustomHttpErrors.interanlError(listErrors.SERVER_ERROR)
      }
   }

   public async updatePost(postDto: UpdatePostDto) {
      try{
	 const post = await this.postRepository.update(postDto)

	 return {post}
      }catch(error) {
	 if( error instanceof CustomHttpErrors && error.statusCode !== 500 ) throw error;
	 throw CustomHttpErrors.interanlError(listErrors.SERVER_ERROR)
      }
   }

   public async deletePost(id: number) {
      try{
	 const post = await this.postRepository.delete(id)

	 return {post}
      }catch(error) {
	 if( error instanceof CustomHttpErrors && error.statusCode !== 500 ) throw error;
	 throw CustomHttpErrors.interanlError(listErrors.SERVER_ERROR)
      }
   }
}
