import { Request, Response } from "express";
import { CustomHandleError, UpadateUserDto } from "../../domain";
import { UsersServices } from "../services";




export class UserController {
   constructor(
      private readonly userService: UsersServices,
      private readonly handleError: CustomHandleError
   ){}

   public getUsers = (_req: Request, res: Response) => {
      this.userService.getUsers()
	 .then( resp => res.json(resp) )
	 .catch( error => this.handleError.handleError(error, res) )
   }

   public getUser = (req: Request, res: Response) => {
      const { id } = req.params;

      this.userService.getUser( Number(id) )
	 .then( resp => res.json(resp) )
	 .catch( error => this.handleError.handleError(error, res) )
   }

   public updateUser = (req: Request, res: Response) => {
      const [error, userDto] = UpadateUserDto.create({
	 ...req.body,
	 id: Number(req.params.id)
      })
      if(error) return res.status(400).json({error})

      this.userService.updateUser(userDto!)
	 .then( resp => res.json(resp) )
	 .catch( error => this.handleError.handleError(error, res) )
   }

   public deleteUser = (req: Request, res: Response) => {
      const id = Number(req.params.id)

      this.userService.deleteUser(id)
	 .then( resp => res.json(resp) )
	 .catch( error => this.handleError.handleError(error, res) )
   }

}
