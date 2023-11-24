import { Router } from "express";
import { AuthController } from "./controller";



export class AuthRoutes {
   
   static get routes(): Router {
      const router = Router();

      const controller = new AuthController()
      router.get('/register', controller.registerUser)

      return router
   }
}
