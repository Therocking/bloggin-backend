import { Request, Response } from "express"
import { LoginUserDto, RegisterUserDto } from "../../domain"
import { AuthService } from "../services/auth.services";
import { CustomHandleError } from "../../domain/use-cases/handleErorr.use-cases";


export class AuthController {
   constructor(
      private readonly authService: AuthService,
      private readonly handleErrorUserCase: CustomHandleError
   ){}
   
   registerUser = async(req: Request, res: Response ) => {
      const [error, userDto] = RegisterUserDto.create(req.body);
      if(error) return res.status(400).json({error});

      this.authService.registerUser(userDto!)
	 .then( resp => res.status(201).json(resp) )
	 .catch( error => this.handleErrorUserCase.handleError(error, res) )
   }

   loginUser = async(req: Request, res: Response) => {
      const [error, userDto] = LoginUserDto.create(req.body);
      if(error) return res.status(400).json({error});

      this.authService.loginUser(userDto!)
	 .then( resp => res.json(resp) )
	 .catch( error => this.handleErrorUserCase.handleError(error, res) )
   }
}
