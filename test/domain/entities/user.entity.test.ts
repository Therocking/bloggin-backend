import { CustomHttpErrors, UserEntity } from "../../../src/domain"



describe('Tests in user.entity.ts', () => {

   test('should create a new userEntity', () => {
      const dataObj = { 
	 id: 1, 
	 name: 'joe', 
	 email: 'joe@gmail.com', 
	 emailValidated: false, 
	 status: true, 
	 password: '123465', 
	 role: 'USER' 
      }

      const userEntity = UserEntity.fromObj(dataObj);

      expect( userEntity ).toBeInstanceOf(UserEntity);
      expect( userEntity ).toEqual( expect.objectContaining(dataObj) );
   });

   test('should throw an error if missing fields', () => {
      const dataObj = {id: 2}

      try{
	 const userEntity = UserEntity.fromObj(dataObj); 

	 expect(userEntity).toBeUndefined()
      }catch(error) {
	 expect(error).toBeInstanceOf(CustomHttpErrors);
      }

   });
});
