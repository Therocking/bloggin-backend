import { Request, Response } from "express"


export class AuthController {
   constructor(){}
   
   registerUser = async(req: Request, res: Response ) => {
      res.send('hola')
   }
}
