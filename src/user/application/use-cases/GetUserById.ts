import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/UserRepository";

export class GetUserById{
    constructor(readonly userRepository: UserRepository){}

    async run(id:string): Promise<User|null>{
        try{
            const user = await this.userRepository.getUserById(id);
            return user;
        } catch(error){
            return null;
        }
    }
}