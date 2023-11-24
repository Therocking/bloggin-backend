import { listErrors } from "../../errors/"


interface UpdatePostDtoOptions {
   title: string
   content?: string
   img?: string
}

export class UpdatePostDto {
   private readonly title: string
   private readonly content?: string
   private readonly img?: string

  private constructor(opt: UpdatePostDtoOptions){
      const { title, content, img} = opt;

      this.title = title,
      this.content = content,
      this.img = img
  }

  public static create( obj: {[key: string]: any} ): [string?, UpdatePostDto?] {
      const { title, content, img} = obj;

      if( !title ) return [listErrors.MISSING_TITLE];
      return [undefined, new UpdatePostDto({title, content, img})];
  }
}
