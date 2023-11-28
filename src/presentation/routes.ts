import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { UserRoutes } from "./users/routes";
import { PostRoutes } from "./posts/routes";
import { CommentRoutes } from "./comments/routes";



export class Routes {
   
   static get routes(): Router {
      const router = Router()

      router.use('/api/auth', AuthRoutes.routes)
      router.use('/api/users', UserRoutes.routes)
      router.use('/api/posts', PostRoutes.routes)
      router.use('/api/comments', CommentRoutes.routes)

      return router;
   }
}
