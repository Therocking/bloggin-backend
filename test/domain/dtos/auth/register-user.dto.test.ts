import { RegisterUserDto } from "../../../../src/domain"



describe('register-user.dto.ts', () => {

   test('should create a new registerDto', () => {
      const dataObj = {
	 name: 'joe',
	 email: 'joe@gmail.com',
	 password: '123456'
      }

      const [error, registerDto] = RegisterUserDto.create(dataObj);

      expect(registerDto).toBeInstanceOf(RegisterUserDto);
      expect(registerDto).toEqual( expect.objectContaining(dataObj) )
      expect(error).toBeUndefined()
   });

   test('shoul return an error if missing a required field', () => {
      const dataObj = { name: 'joe' }

      const [error, registerDto] = RegisterUserDto.create(dataObj);

      expect(error).toMatch(/missing/i);
      expect(registerDto).toBeUndefined()
   })
})
