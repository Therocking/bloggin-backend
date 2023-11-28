import { UpadateUserDto } from "../../../../src/domain"





describe('Test in update-user.dto.ts', () => {

   test('should create a new updateDto', () => {
      const dataObj = {
	id: 1,
	name: 'name updated'
      }

      const [error, updateDto] = UpadateUserDto.create(dataObj);

      expect(updateDto).toBeInstanceOf(UpadateUserDto);
      expect( updateDto ).toEqual( expect.objectContaining(dataObj) );
      expect(error).toBeUndefined()
   });

   test('should return an error if missing id', () => {
      const dataObj = {name: 'joel'}

      const [error, updateDto] = UpadateUserDto.create(dataObj);

      expect( error ).toMatch(/missing id/i);
      expect( updateDto ).toBeUndefined();
   });
});
