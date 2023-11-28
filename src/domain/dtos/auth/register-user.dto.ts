import { listErrors } from "../../errors/";

interface RegisterUserDtoOption {
   name: string
   email: string
   password: string
   img?: string
}

export class RegisterUserDto {
   public readonly name: string
   public readonly email: string
   public password: string
   public readonly img?: string
   
   private constructor( opt: RegisterUserDtoOption ){
      const { name, email, password, img } = opt;
      this.name = name,
      this.email = email,
      this.password = password,
      this.img = img
   }

   static create( obj: {[key:string]: any} ): [string?, RegisterUserDto?] {
      const { name, email, password, img } = obj;

      if( !name ) return [listErrors.MISSING_NAME]
      if( !email ) return [listErrors.MISSING_EMAIL]
      if( !password ) return [listErrors.MISSING_PASS]

      return [undefined, new RegisterUserDto({name, email, password, img})]
   }
}
