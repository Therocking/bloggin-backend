import { listErrors, CustomHttpErrors } from "../errors"

interface PostEntityOptions {
   id: number
   title: string
   content?: string
   img?: string
   status: boolean
   createdAt: Date
   updatedAt?: Date
   user: number
}

export class PostEntity {
   private readonly id: number 
   private readonly title: string
   private readonly content?: string
   private readonly img?: string
   private readonly status: boolean
   private readonly createdAt: Date
   private readonly updatedAt?: Date
   private readonly user: number

   private constructor(opt: PostEntityOptions) {
      const { id, title, content, img, status, createdAt, updatedAt, user } = opt;

      this.id = id,
      this.title = title,
      this.content = content,
      this.img = img,
      this.status = status,
      this.createdAt = createdAt,
      this.updatedAt = updatedAt,
      this.user = user
   }

   public static fromObj( obj: {[key: string]: any} ): PostEntity {
      const { id, title, content, img, status, createdAt, updatedAt, user } = obj;

      if( !id ) throw CustomHttpErrors.badRequest(listErrors.MISSING_ID);
      if(!title) throw CustomHttpErrors.badRequest(listErrors.MISSING_TITLE);
      if(!content) throw CustomHttpErrors.badRequest(listErrors.MISSING_CONTENT);
      if(!createdAt) throw CustomHttpErrors.badRequest(listErrors.MISSING_CREATED_AT);
      if(!user) throw CustomHttpErrors.badRequest(listErrors.MISSING_ID);
      if(status === undefined) throw CustomHttpErrors.badRequest(listErrors.MISSING_STATUS);

      return new PostEntity({ id, title, content, img, status, createdAt, updatedAt, user })
   }
}
