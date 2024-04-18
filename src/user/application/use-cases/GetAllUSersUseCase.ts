import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/UserRepository";

export class GetAllUsersUseCase{
    constructor(readonly userRepository: UserRepository){}

    async run(): Promise<User[]|null>{
        try{
            const users = await this.userRepository.getUsers();
            return users;
        } catch(error){
            return null;
        }
    }
}