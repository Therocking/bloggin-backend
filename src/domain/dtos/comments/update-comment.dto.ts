import { listErrors } from "../../errors/"


interface UpdateCommentDtoOption {
   id: number
   content: string
}

export class UpdateCommentDto {
   public readonly id: number
   public readonly content: string

  private constructor(opt: UpdateCommentDtoOption) {
      const {id, content} = opt;
      this.id = id,
      this.content = content
  }

  public static create(obj: {[key: string]: any}): [string?, UpdateCommentDto?] {
      const { id, content } = obj;

      if( !id ) return [listErrors.MISSING_ID];
      if( !content ) return [listErrors.MISSING_CONTENT];

      return [undefined, new UpdateCommentDto({ id, content })];
  }
}
