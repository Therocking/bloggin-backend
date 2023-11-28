import { Router } from "express";
import { UserController } from "./controlle";
import { UsersServices } from "../services";
import { PostgresUserDatasource, PostgresUserRepositoryImp } from "../../infrastructure";
import { CustomHandleError, listErrors } from "../../domain";
import { FindingErrors } from "../middlewares";
import { check } from "express-validator";



export class UserRoutes {
   public static get routes(): Router {
      const router = Router();

      const datasource = new PostgresUserDatasource()
      const repository = new PostgresUserRepositoryImp(datasource)
      const handleError = new CustomHandleError()
      const service = new UsersServices(repository)
      const controller = new UserController(service, handleError)

      router.get('/', controller.getUsers)
      router.get('/:id',[
	 check('id', listErrors.MISSING_ID),
	 FindingErrors.validFields
      ],controller.getUser)

      router.put('/:id',[
	 check('id', listErrors.MISSING_ID),
	 FindingErrors.validFields
      ],controller.updateUser)

      router.delete('/:id',[
	 check('id', listErrors.MISSING_ID),
	 FindingErrors.validFields
      ],controller.deleteUser)

      return router
   }
}
