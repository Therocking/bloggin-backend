


export class CustomHttpErrors extends Error {
   private constructor(
      public readonly statusCode: number,
      public readonly msg: string
   ){
      super(msg)
   }

   public static badRequest(msg:string) {
      return new CustomHttpErrors(400, msg)
   }

   public static unAuthorize(msg:string) {
      return new CustomHttpErrors(401, msg)
   }

   public static notFound(msg:string) {
      return new CustomHttpErrors(404, msg)
   }

   public static interanlError(msg:string) {
      return new CustomHttpErrors(500, msg)
   }
}
