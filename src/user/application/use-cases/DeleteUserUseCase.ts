import { UserRepository } from "../../domain/UserRepository";

export class DeleteUserUseCase{
    constructor(readonly userRepository: UserRepository){}

    async run(id: string): Promise<boolean>{
        try{
            const deleted = await this.userRepository.deleteUser(id);
            return !!deleted;
        } catch(error){
            return false;
        }
    }
}