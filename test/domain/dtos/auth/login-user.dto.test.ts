import { LoginUserDto } from "../../../../src/domain"



describe('login-user.dto.ts', () => {

   test('should create a new loginDto', () => {
      const dataObj = {
	 email: 'joe@gmail.com',
	 password: '123456'
      }

      const [error, loginDto] = LoginUserDto.create(dataObj);

      expect(loginDto).toBeInstanceOf(LoginUserDto);
      expect(loginDto).toEqual( expect.objectContaining(dataObj) )
      expect( error ).toBeUndefined();
   });

   test('should return an error if missing a required field', () => {
      const dataObj = { name: 'joe' }

      const [error, loginDto] = LoginUserDto.create(dataObj);

      expect(error).toMatch(/missing/i);
      expect(loginDto).toBeUndefined();

   });
});
