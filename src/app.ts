import { envs } from "./config/envs"
import { Routes } from "./presentation/routes"
import { Server } from "./presentation/server"


( async()=>{
   main()
})()


async function main() {
   
   const server = new Server({
      port: envs.PORT,
      routes: Routes.routes
   })

   server.start()
}
