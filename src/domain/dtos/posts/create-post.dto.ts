import { listErrors } from "../../errors/"


interface CreatePostDtoOptions {
   title: string
   content?: string
   img?: string
   user: number
}

export class CreatePostDto {
   public readonly title: string
   public readonly content?: string
   public readonly img?: string
   public readonly user: number

  private constructor(opt: CreatePostDtoOptions){
      const { title, content, img, user } = opt;

      this.title = title,
      this.content = content,
      this.img = img,
      this.user = user
  }

  public static create( obj: {[key: string]: any} ): [string?, CreatePostDto?] {
      const { title, content, img, user } = obj;

      if( !title ) return [listErrors.MISSING_TITLE];
      if( !user || isNaN(user) ) return [listErrors.MISSING_ID];

      return [undefined, new CreatePostDto({title, content, img, user})];
  }
}
