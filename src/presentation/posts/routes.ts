import { Router } from "express";
import { PostgresPostDatasource, PostgresPostRepositoryImp, PostgresUserDatasource, PostgresUserRepositoryImp } from "../../infrastructure";
import { CustomHandleError } from "../../domain";
import { PostService } from "../services";
import { PostController } from "./controller";
import { AuthMiddleware } from "../middlewares";




export class PostRoutes {

   static get routes(): Router {
      const router = Router();

      const datasource = new PostgresPostDatasource()
      const repository = new PostgresPostRepositoryImp(datasource)
      const handleError = new CustomHandleError()
      const service = new PostService(repository)
      const controller = new PostController(service, handleError)

      const userDatasource = new PostgresUserDatasource()
      const userRepository = new PostgresUserRepositoryImp(userDatasource)
      const authMiddleware = new AuthMiddleware(userRepository)

      router.get('/' ,controller.getPosts)
      router.get('/:id', controller.getPost)
      router.post('/', authMiddleware.validUser, controller.createPost)
      router.put('/:id', controller.updatePost)
      router.delete('/:id', controller.delete)

      return router;
   }
}
