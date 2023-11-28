import jwt from 'jsonwebtoken';


export class JwtAdapter {
   constructor(
      private readonly jwtSeed: string
   ){}
   
   public generate(payload: any, duration: string = '3h'): Promise<string | null> {
       
      return new Promise( (resolve => {
	 jwt.sign(payload, this.jwtSeed, {expiresIn: duration}, (error, token) => {
	    if(error) resolve(null);

	    resolve(token!);
	 });
      }));
   }

   public verify<T>(token: string): Promise<T | null> {
      return new Promise( (resolve) => {
	 jwt.verify(token, this.jwtSeed, (error, decode) => {
	    if(error) resolve(null)

	    resolve(decode as T)
	 })
      })
   } 
}
