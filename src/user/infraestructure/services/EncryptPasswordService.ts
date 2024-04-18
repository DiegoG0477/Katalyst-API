import { BcryptService } from "../../../security/bcrypt";
import { IEncryptPasswordService } from "../../domain/services/IEncryptPasswordService";

export class EncryptPasswordService implements IEncryptPasswordService {
    constructor(
        readonly bcryptService: BcryptService
    ){}
    async encodePassword(password: string): Promise<string> {
        const pass = await this.bcryptService.encodePassword(password);
        return pass;
    }

    async verifyPassword(word: string, passwordEncode: string): Promise<boolean> {
        const result = await this.bcryptService.verifyPassword(word, passwordEncode);
        return result;
    }
}