import { Router } from "express";
import { check } from "express-validator";
import { AuthController } from "./controller";
import { AuthService } from "../services/auth.services";
import { CustomHandleError, listErrors } from "../../domain";
import { JwtAdapter, envs } from "../../config";
import { PostgresUserDatasource, PostgresUserRepositoryImp } from "../../infrastructure";
import { FindingErrors } from "../middlewares";



export class AuthRoutes {
   
   static get routes(): Router {
      const router = Router();

      const datasource = new PostgresUserDatasource()
      const repository = new PostgresUserRepositoryImp(datasource)
      const handleErrors = new CustomHandleError();
      const jwtAdapter = new JwtAdapter(envs.SECRETJWT);
      const service = new AuthService(repository, jwtAdapter)

      const controller = new AuthController(service, handleErrors)

      router.post('/register',[
	 FindingErrors.validFields,
	 check('email', listErrors.EMAIL_INVALID).isEmail(),
	 FindingErrors.validFields,
	 check('name', listErrors.MISSING_NAME).not().isEmpty(),
	 FindingErrors.validFields,
	 check('password', listErrors.MISSING_PASS).not().isEmpty(),
	 FindingErrors.validFields
      ],controller.registerUser)

      router.post('/login',[
	 FindingErrors.validFields,
	 check('email', listErrors.EMAIL_INVALID).isEmail(),
	 FindingErrors.validFields,
	 check('password', listErrors.MISSING_PASS).not().isEmpty(),
	 FindingErrors.validFields
      ],controller.loginUser)

      router.get('/google')
      router.get('/valid-email/:token')

      return router
   }
}
