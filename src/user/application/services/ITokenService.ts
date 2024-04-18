import { AuthCredentials } from "../../domain/entities/AuthCredentials";

export interface ITokenService{
    generateToken(authCredentials: AuthCredentials): Promise<string>;
}