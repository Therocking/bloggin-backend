import { listErrors } from "../../errors/"


interface CreateCommentDtoOption {
   content: string
   user: number
   post: number
   commentParent?: number
}

export class CreateCommentDto {
  public readonly content: string
  public readonly user: number
  public readonly post: number
  public readonly commentParent?: number

  private constructor(opt: CreateCommentDtoOption) {
      const {content, user, post, commentParent} = opt;
      this.content = content,
      this.user = user,
      this.post = post,
      this.commentParent = commentParent
  }

  public static create(obj: {[key: string]: any}): [string?, CreateCommentDto?] {
      const { content, user, post, commentParent } = obj;

      if( !content ) return [listErrors.MISSING_CONTENT];
      if( !user || isNaN(user) ) return [listErrors.MISSING_ID];
      if( !post || isNaN(post) ) return [listErrors.MISSING_ID]

      return [undefined, new CreateCommentDto({content, user, post, commentParent})];
  }
}
