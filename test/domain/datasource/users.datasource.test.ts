import { LoginUserDto, RegisterUserDto, UpadateUserDto, UserDataSource, UserEntity } from "../../../src/domain";



describe('user.datasource.ts', () => {
   const userEntity = new UserEntity({
      id: 1,
      name: "joe",
      email: "joe@gmail.com",
      emailValidated: false,
      password: "123456",
      role: "USER",
      status: true,
   })

   class MockUserDatasource implements UserDataSource {
      async login(loginDto: LoginUserDto): Promise<UserEntity> {
          return userEntity
      }

      async getAll(): Promise<UserEntity[]> {
         return [userEntity] 
      }

      async getOne(id: number): Promise<UserEntity> {
          return userEntity
      }

      async create(userDto: RegisterUserDto): Promise<UserEntity> {
          return userEntity
      }

      async update(userDto: UpadateUserDto): Promise<UserEntity> {
          return userEntity
      }

      async delete(id: number): Promise<UserEntity> {
          return userEntity
      }
   }

   const mockUserDatasour = new MockUserDatasource();

   test('should implements the abstract class', () => {

      expect(mockUserDatasour).toBeInstanceOf(MockUserDatasource);
      expect(typeof mockUserDatasour.login).toBe('function')
      expect(typeof mockUserDatasour.getAll).toBe('function')
      expect(typeof mockUserDatasour.getOne).toBe('function')
      expect(typeof mockUserDatasour.create).toBe('function')
      expect(typeof mockUserDatasour.update).toBe('function')
      expect(typeof mockUserDatasour.delete).toBe('function')
   });

   test('should return a userEntity', async() => {
      const userEntity = await mockUserDatasour.getAll() 

      expect(userEntity).toHaveLength(1)
      expect(userEntity[0]).toBeInstanceOf(UserEntity)
      expect(userEntity).toEqual( expect.objectContaining(userEntity) )
   });

})
