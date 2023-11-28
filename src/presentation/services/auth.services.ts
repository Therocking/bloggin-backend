import { BcryptAdapter } from "../../config/bcrypt.adapter";
import { JwtAdapter } from "../../config/jwt.adapter";
import { CustomHttpErrors, LoginUserDto, RegisterUserDto, listErrors, UserRepository } from "../../domain";



export class AuthService {
   constructor(
      private readonly userRepository: UserRepository,
      private readonly jwtAdapter: JwtAdapter
   ){}

   public async registerUser(userDto: RegisterUserDto) {
      try{
	 const newUser = await this.userRepository.create(userDto)

	 // Generate JWT
	 const token = await this.jwtAdapter.generate({id: newUser.id});

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

}
