import express from 'express';

interface Options {
   port: number,
}

export class Server {
   public readonly app = express()
   private serverListener?: any
   private readonly port: number 

   constructor(options: Options) {
      const { port } = options;
      this.port = port
   }

   async start() {
      
      /* Middlewares */
      this.app.use( express.json() )
      this.app.use( express.urlencoded({ extended: true }) )

      /* Listen */
      this.serverListener = this.app.listen( this.port, () => {
	 console.log('Server running on port', this.port)
      })
   }

   public close() {
      this.serverListener?.close()
   }
   
}
