import { Router } from "express";
import { PostgresCommentDatasource, PostgresCommentRepositoryImp, PostgresUserDatasource, PostgresUserRepositoryImp,  } from "../../infrastructure";
import { CommentService } from "../services";
import { CommentController } from "./controller";
import { AuthMiddleware } from "../middlewares";
import { CustomHandleError } from "../../domain";








export class CommentRoutes {
   static get routes(): Router {

      const router = Router();

      const datasource = new PostgresCommentDatasource(); 
      const repository = new PostgresCommentRepositoryImp(datasource);
      const handleError = new CustomHandleError();
      const service = new CommentService(repository);
      const controller = new CommentController(service, handleError);

      const userDatasource = new PostgresUserDatasource();
      const userRepository = new PostgresUserRepositoryImp(userDatasource);
      const authMiddleware = new AuthMiddleware(userRepository)

      router.get('/', controller.getComments)
      router.get('/:id', controller.getCommment)
      router.get('/:id', controller.getAnswers)
      router.post('/', authMiddleware.validUser ,controller.createComment)
      router.put('/:id', controller.updateComment)
      router.delete('/:id', controller.deleteComment)

      return router;
   }
}
