import { envs } from "../src/config";
import { Routes } from "../src/presentation/routes";
import { Server } from "../src/presentation/server";





export const testServer = new Server({
   port: envs.PORT,
   routes: Routes.routes
})
