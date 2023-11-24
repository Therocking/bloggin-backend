import { listErrors, CustomHttpErrors } from "../errors"

interface CommentEntityOptions {
   id: number
   content: string
   img?: string
   status: boolean
   createdAt: Date
   updatedAt?: Date
   user: number
   post: number
}

export class CommentEntity {
   private readonly id: number 
   private readonly content: string
   private readonly img?: string
   private readonly status: boolean
   private readonly createdAt: Date
   private readonly updatedAt?: Date
   private readonly user: number
   private readonly post: number

   private constructor(opt: CommentEntityOptions) {
      const { id, content, img, status, createdAt, updatedAt, user, post } = opt;

      this.id = id,
      this.content = content,
      this.img = img,
      this.status = status,
      this.createdAt = createdAt,
      this.updatedAt = updatedAt,
      this.user = user,
      this.post = post
   }

   public static fromObj( obj: {[key: string]: any} ): CommentEntity {
      const { id, content, img, status, createdAt, updatedAt, user, post } = obj;

      if( !id ) throw CustomHttpErrors.badRequest(listErrors.MISSING_ID);
      if(!content) throw CustomHttpErrors.badRequest(listErrors.MISSING_CONTENT);
      if(!createdAt) throw CustomHttpErrors.badRequest(listErrors.MISSING_CREATED_AT);
      if(!user) throw CustomHttpErrors.badRequest( `${listErrors.MISSING_ID} - user`);
      if(!post) throw CustomHttpErrors.badRequest( `${listErrors.MISSING_ID} - post` );
      if(status === undefined) throw CustomHttpErrors.badRequest(listErrors.MISSING_STATUS);

      return new CommentEntity({ id, content, img, status, createdAt, updatedAt, user, post })
   }
}
