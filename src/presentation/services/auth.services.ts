import { BcryptAdapter } from "../../config/bcrypt.adapter";
import { JwtAdapter } from "../../config/jwt.adapter";
import { CustomHttpErrors, LoginUserDto, RegisterUserDto, listErrors, UserRepository, SendEmailUseCase } from "../../domain";



export class AuthService {
   constructor(
      private readonly userRepository: UserRepository,
      private readonly jwtAdapter: JwtAdapter,
      private readonly sendEmailUseCase: SendEmailUseCase
   ){}

   public async registerUser(userDto: RegisterUserDto) {
      try{
	 const newUser = await this.userRepository.create(userDto)

	 // Generate JWT
	 const token = await this.jwtAdapter.generate({id: newUser.id});

	 // Send mail to validate email
	 await this.sendEmailUseCase.validationEmail(userDto.email);

	 return {
	    user: newUser,
	    token
	 }
      }catch(error){
	 if( error instanceof CustomHttpErrors && error.statusCode !== 500) throw error 
	 throw CustomHttpErrors.interanlError(listErrors.SERVER_ERROR)
      }
   }

   public async loginUser(userDto: LoginUserDto) {
      try{
	 const user = await this.userRepository.login(userDto);

	 // Valid if the passwords are the same
	 const isCorrectPass = BcryptAdapter.compare(userDto.password, user.password);
	 if(!isCorrectPass) throw CustomHttpErrors.badRequest(listErrors.INVALID_FIELDS);

	 // Generate JWT
	 const token = await this.jwtAdapter.generate({ id: user.id });

	 return {
	    user,
	    token
	 }
      }catch(error){
	 if( error instanceof CustomHttpErrors && error.statusCode !== 500) throw error 
	 throw CustomHttpErrors.interanlError(listErrors.SERVER_ERROR)
      }
   }

  public async validEmail(token: string) {
     try{
	const payload = await this.jwtAdapter.verify<{email: string}>(token);
	if(!payload) throw CustomHttpErrors.unAuthorize(listErrors.INVALID_TOKEN);

        await this.userRepository.getByEmailToValid(payload.email);

     }catch(error) {
	 if( error instanceof CustomHttpErrors && error.statusCode !== 500) throw error 
	throw CustomHttpErrors.interanlError(listErrors.SERVER_ERROR);
     }
  } 

}
