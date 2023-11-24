import { LoginUserDto, RegisterUserDto, UpadateUserDto } from "../dtos";
import { UserEntity } from "../entities";


export abstract class UserRepository {
   abstract login(loginDto: LoginUserDto): Promise<UserEntity>
   abstract getAll(): Promise<UserEntity[]>
   abstract getOne(id: string): Promise<UserEntity>
   abstract create(userDto: RegisterUserDto): Promise<UserEntity>
   abstract update(userDto: UpadateUserDto): Promise<UserEntity>
   abstract delete(id: string): Promise<UserEntity>
}
