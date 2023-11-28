import { Response } from "express"
import { CustomHttpErrors } from "../errors"






export class CustomHandleError {                                                                               
                                                                                                       
   public handleError = (error: unknown, res: Response) => {                                                     
   
      console.log(error)
      if(error instanceof CustomHttpErrors) return res.status(error.statusCode).json({ error: error.msg })

      console.log(`${error}`)                                                                                    
      return res.status(500).json({error: 'Internal server error'})                                              
      
   }                                                                                                             
  }
