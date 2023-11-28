import { listErrors, CustomHttpErrors } from "../errors"

interface UserEntityOptions {
   id: number
   name: string
   email: string
   emailValidated: boolean
   status: boolean
   password: string
   role: string
   img?: string
}

export class UserEntity {
   public readonly id: number
   public readonly name: string
   public readonly email: string
   public readonly emailValidated: boolean
   public readonly status: boolean
   public readonly password: string
   public readonly role: string
   public readonly img?: string

   constructor( opt: UserEntityOptions ){
      const { id, name, email, emailValidated, status, password, role, img } = opt;

      this.id = id
      this.name = name
      this.email = email
      this.emailValidated = emailValidated
      this.status = status,
      this.password = password
      this.role = role
      this.img = img
   }

   static fromObj( obj: {[key:string]: any} ): UserEntity {
      const { id, name, email, emailValidated, status, password, role, img } = obj;

      if(!id) throw CustomHttpErrors.badRequest(listErrors.MISSING_ID)
      if(!name) throw CustomHttpErrors.badRequest(listErrors.MISSING_NAME)
      if(!email) throw CustomHttpErrors.badRequest(listErrors.MISSING_ID)
      if(!emailValidated === undefined) throw CustomHttpErrors.badRequest(listErrors.MISSING_ID)
      if(!status) throw CustomHttpErrors.badRequest(listErrors.MISSING_STATUS)
      if(!password) throw CustomHttpErrors.badRequest(listErrors.MISSING_PASS)
      if(!role) throw CustomHttpErrors.badRequest(listErrors.MISSING_ROLE)

      return new UserEntity({ id, name, email, emailValidated, status, password, role, img })
   }
}
