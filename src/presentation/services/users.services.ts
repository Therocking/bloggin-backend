import { CustomHttpErrors, UpadateUserDto, UserRepository, listErrors } from "../../domain";





export class UsersServices {
   constructor(
      private readonly userRepository: UserRepository 
   ){}

   public async getUsers() {
      try{
	 const users = await this.userRepository.getAll();

	 return {users}
      }catch(error){
	 if( error instanceof CustomHttpErrors && error.statusCode !== 500) throw error 
	 throw CustomHttpErrors.interanlError(listErrors.SERVER_ERROR)
      }
   }

   public async getUser(id: number) {
      try{
	 const user = await this.userRepository.getOne(id);

	 return {user}
      }catch(error){
	 if( error instanceof CustomHttpErrors && error.statusCode === 500) {
	    throw CustomHttpErrors.interanlError(listErrors.SERVER_ERROR);
	 }

	 throw error;
      }
   }

   public async updateUser(userDto: UpadateUserDto) {
      try{
	 const user = await this.userRepository.update(userDto);

	 return {
	    user
	 }
      }catch(error){
	 if( error instanceof CustomHttpErrors && error.statusCode !== 500) throw error 
	 throw CustomHttpErrors.interanlError(listErrors.SERVER_ERROR)
      }
   }

   public async deleteUser(id: number) {
      try{
	 const user = await this.userRepository.delete(id)

	 return {user}
      }catch(error){
	 if( error instanceof CustomHttpErrors && error.statusCode !== 500) throw error 
	 throw CustomHttpErrors.interanlError(listErrors.SERVER_ERROR)
      }
   }

}
