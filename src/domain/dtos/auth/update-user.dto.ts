import { listErrors } from "../../errors/"


interface UpdateUserDtoOptions {
   id: number
   name?: string
   password?: string
   img?: string
}

export class UpadateUserDto {
   public readonly id: number
   public readonly name?: string
   public password?: string
   public readonly img?: string

   private constructor( opt: UpdateUserDtoOptions ){
      const { id, name, password, img} = opt;

      this.id = id,
      this.name = name,
      this.password = password,
      this.img = img
   }

   get values() {
      const valuesObj: {[ key:string ]:any } = {}

      if(this.name) valuesObj.name = this.name;
      if(this.password) valuesObj.password = this.password
      if(this.img) valuesObj.img = this.img

      return valuesObj;
   }

   public static create( obj: {[key: string]: any} ): [string?, UpadateUserDto?] {
      const { id, name, password, img} = obj;

      if(!id) return [listErrors.MISSING_ID]

      return [undefined, new UpadateUserDto({id, name, password, img})]
   }
}
