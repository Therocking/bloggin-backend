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
   public readonly id: number 
   public readonly title: string
   public readonly content?: string
   public readonly img?: string
   public readonly status: boolean
   public readonly createdAt: Date
   public readonly updatedAt?: Date
   public readonly user: number

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
