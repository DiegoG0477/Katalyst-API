import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/UserRepository";
import { IEncryptPasswordService } from "../../domain/services/IEncryptPasswordService";

export class UpdateUserUseCase{
    constructor(
        readonly userRepository: UserRepository, 
        readonly encryptService: IEncryptPasswordService
    ){}

    async run(
        id:string,
        name:string,
        oldPassword:string,
        newPassword:string,
        height:number,
        weight:number,
    ): Promise<boolean>{
        const user = await this.userRepository.getUserById(id);

        if(user === null) return false;

        const valid = await this.encryptService.verifyPassword(oldPassword, user.password);

        if(!valid) return false;

        const password = await this.encryptService.encodePassword(newPassword);

        const userObject = new User(
            id,
            user.email,
            password,
            name,
            user.lastname,
            user.age,
            user.activity,
            user.frequency,
            height,
            weight
        );
        try {
            const result = await this.userRepository.updateUser(userObject);
            return result ?? false;
        } catch (error) {
            return false;
        }
    }
}