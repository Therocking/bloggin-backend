import { listErrors } from "../../errors";


export class LoginUserDto {
   private constructor(
      public readonly email: string,
      public readonly password: string
   ){}

   static create( obj: {[key:string]: any} ): [string?, LoginUserDto?]{
      const { email, password } = obj;

      if(!email) return [listErrors.MISSING_EMAIL] 
      if(!password) return [listErrors.MISSING_PASS]

      return [undefined, new LoginUserDto(email, password)]
   }
}
