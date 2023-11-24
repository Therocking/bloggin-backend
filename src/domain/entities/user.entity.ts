import { listErrors, CustomHttpErrors } from "../errors"

interface UserEntityOptions {
   id: number
   name: string
   email: string
   emailValidated: boolean
   password: string
   role: string
   img?: string
}

export class UserEntity {
   private readonly id: number
   private readonly name: string
   private readonly email: string
   private readonly emailValidated: boolean
   private readonly password: string
   private readonly role: string
   private readonly img?: string

   constructor( opt: UserEntityOptions ){
      const { id, name, email, emailValidated, password, role, img } = opt;

      this.id = id
      this.name = name
      this.email = email
      this.emailValidated = emailValidated
      this.password = password
      this.role = role
      this.img = img
   }

   static fromObj( obj: {[key:string]: any} ): UserEntity {
      const { id, name, email, emailValidated, password, role, img } = obj;

      if(!id) throw CustomHttpErrors.badRequest(listErrors.MISSING_ID)
      if(!name) throw CustomHttpErrors.badRequest(listErrors.MISSING_NAME)
      if(!email) throw CustomHttpErrors.badRequest(listErrors.MISSING_ID)
      if(!emailValidated === undefined) throw CustomHttpErrors.badRequest(listErrors.MISSING_ID)
      if(!password) throw CustomHttpErrors.badRequest(listErrors.MISSING_PASS)
      if(!role) throw CustomHttpErrors.badRequest(listErrors.MISSING_ROLE)

      return new UserEntity({ id, name, email, emailValidated, password, role, img })
   }
}
