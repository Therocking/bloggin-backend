import { LoginUserDto, UpadateUserDto, RegisterUserDto } from "../dtos";
import { UserEntity } from "../entities";


export abstract class UserDataSource {
   abstract login(loginDto: LoginUserDto): Promise<UserEntity>
   abstract getAll(): Promise<UserEntity[]>
   abstract getOne(id: number): Promise<UserEntity>
   abstract create(userDto: RegisterUserDto): Promise<UserEntity>
   abstract update(userDto: UpadateUserDto): Promise<UserEntity>
   abstract delete(id: number): Promise<UserEntity>
}
