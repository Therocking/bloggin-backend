import { NextFunction, Request, Response } from "express";
import { CustomHttpErrors, listErrors } from "../../domain";
import { JwtAdapter, envs } from "../../config";
import { PostgresUserRepositoryImp } from "../../infrastructure";





export class AuthMiddleware {
   constructor(
      private readonly userRepository: PostgresUserRepositoryImp
   ){}

   public async validUser(req: Request, res: Response, next: NextFunction) {
      try{
	 const auth = req.header('Authorization');
	 if(!auth) return res.status(401).json(listErrors.MISSING_TOKEN)
	 if(!auth.startsWith('Bearer ')) return res.status(401).json({error:listErrors.INVALID_TOKEN})

	 const token = auth.split(' ').at(1) || '';

	 const jwtAdapter = new JwtAdapter(envs.SECRETJWT)
	 const payload = await jwtAdapter.verify<{id: number}>(token)
	 if(!payload) return res.status(401).json({error: listErrors.INVALID_TOKEN})

	 const user = await this.userRepository.getOne( payload.id );
	 if(!user || !user.status) return res.status(404).json({error: listErrors.USER_NOT_FOUND});

	 req.body.user = user;

	 next();

      }catch(error) {
	 CustomHttpErrors.interanlError(listErrors.SERVER_ERROR)
      }
   }
} 
