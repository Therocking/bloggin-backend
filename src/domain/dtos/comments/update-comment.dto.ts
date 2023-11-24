import { listErrors } from "../../errors/"


interface UpdateCommentDtoOption {
   content: string
}

export class UpdateCommentDto {
   private readonly content: string

  private constructor(opt: UpdateCommentDtoOption) {
      const {content} = opt;
      this.content = content
  }

  public static create(obj: {[key: string]: any}): [string?, UpdateCommentDto?] {
      const { content } = obj;

      if( !content ) return [listErrors.MISSING_CONTENT];

      return [undefined, new UpdateCommentDto({ content })];
  }
}
