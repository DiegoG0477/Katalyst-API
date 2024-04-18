import { UserRepository } from "../../domain/UserRepository";
import { IEncryptPasswordService } from "../../domain/services/IEncryptPasswordService";

export class ChangePasswordUseCase{
    constructor(
        readonly userRepository: UserRepository,
        readonly encryptService: IEncryptPasswordService
    ){}

    async run(
        id: string,
        oldPassword:string,
        newPassword:string
    ): Promise<boolean|null>{
        try{
            const userPassword = await this.userRepository.getPassword(id);
            
            if (userPassword === null) return null;
            
            const valid = await this.encryptService.verifyPassword(oldPassword, userPassword);

            if(!valid) return null;

            const password = await this.encryptService.encodePassword(newPassword);

            const result = await this.userRepository.changePassword(id, password);
            return result;
        } catch(error){
            return null;
        }
    }
}