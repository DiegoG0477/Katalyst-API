import jwt from 'jsonwebtoken';
import { AuthCredentials } from '../../domain/entities/AuthCredentials';
import { ITokenService } from "../../application/services/ITokenService";

export class TokenService implements ITokenService{
    async generateToken(authCredentials: AuthCredentials): Promise<string> {
        const JWT_SECRET = (process.env.JWT_SECRET as string) ?? 'secret';
        const token = jwt.sign({ email: authCredentials.email, password: authCredentials.password }, JWT_SECRET,{ expiresIn: '12h' });

        console.log('token', token);

        return token;
    }
}
