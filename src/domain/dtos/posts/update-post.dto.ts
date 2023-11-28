import { listErrors } from "../../errors/"


interface UpdatePostDtoOptions {
   id: number
   title: string
   content?: string
   img?: string
}

export class UpdatePostDto {
   public readonly id: number 
   public readonly title: string
   public  readonly content?: string
   public readonly img?: string

  private constructor(opt: UpdatePostDtoOptions){
      const {id, title, content, img} = opt;

      this.id = id,
      this.title = title,
      this.content = content,
      this.img = img
  }

  public static create( obj: {[key: string]: any} ): [string?, UpdatePostDto?] {
      const { id, title, content, img} = obj;

      if( !id ) return [listErrors.MISSING_ID];
      if( !title ) return [listErrors.MISSING_TITLE];

      return [undefined, new UpdatePostDto({id, title, content, img})];
  }
}
