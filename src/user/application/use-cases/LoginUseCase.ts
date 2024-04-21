import { AuthCredentials } from "../../domain/entities/AuthCredentials";
import { UserRepository } from "../../domain/UserRepository";
import { IEncryptPasswordService } from "../../domain/services/IEncryptPasswordService";
import { ITokenService } from "../services/ITokenService";

export class LoginUseCase {
    constructor(
        readonly userRepository: UserRepository,
        readonly tokenService: ITokenService,
        readonly encryptService: IEncryptPasswordService
    ) {}

    async run(email: string, password: string): Promise<string | null> {
        try {
            const encoded = await this.userRepository.getPasswordByEmail(email);
            
            if (encoded === null) {
                return null;
            }
            
            const isValid = await this.encryptService.verifyPassword(
                password,
                encoded
            );

            if (!isValid) {
                return null;
            }

            const id = await this.userRepository.getIdByEmail(email);

            if (id === null) {
                return null;
            }

            const authCredentials = new AuthCredentials(id, email, password);

            const token = await this.tokenService.generateToken(
                authCredentials
            );

            return token;
        } catch (error) {
            return null;
        }
    }
}
