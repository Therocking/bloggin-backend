import { LoginUserDto, RegisterUserDto, UpadateUserDto, UserEntity, UserRepository } from "../../../src/domain"



describe('user.repotory.ts', () => {

   const userEntity = new UserEntity({
      id: 1,
      name: "joe",
      email: "joe@gmail.com",
      emailValidated: false,
      password: "123456",
      role: "USER",
      status: true,
   });

   class MockUserRepository implements UserRepository {
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


   test('should be an instance of userRepository', () => {
      const mockUserRepository = new MockUserRepository();

      expect(mockUserRepository).toBeInstanceOf( MockUserRepository );
      expect(typeof mockUserRepository.login).toBe('function')
      expect(typeof mockUserRepository.getAll).toBe('function')
      expect(typeof mockUserRepository.getOne).toBe('function')
      expect(typeof mockUserRepository.create).toBe('function')
      expect(typeof mockUserRepository.update).toBe('function')
      expect(typeof mockUserRepository.delete).toBe('function')
   });
})
