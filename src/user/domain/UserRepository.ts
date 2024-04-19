import { User } from "./entities/User";

export interface UserRepository {
    registerUser(user:User):Promise<User|null>;
    getUsers():Promise<User[]|null>;
    getPassword(id:string):Promise<string|null>;
    getPasswordByEmail(email:string):Promise<string|null>;
    changePassword(id:string, password:string):Promise<boolean|null>;
    updateUser(user:User):Promise<boolean|null>;
    deleteUser(id:string):Promise<boolean|null>;
    getUserById(id:string):Promise<User|null>;
}