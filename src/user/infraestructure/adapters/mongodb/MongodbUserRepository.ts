import { UserMongodbModel } from "./MongodbUserSchema";
import { UserRepository } from "../../../domain/UserRepository";
import { User } from "../../../domain/entities/User";

export class MongodbUserRepository implements UserRepository{
    async registerUser(user: User): Promise<User | null> {
        const userMongodb = new UserMongodbModel(user);
        await userMongodb.save();
        return userMongodb;
    }

    async getUsers(): Promise<User[] | null> {
        const users = await UserMongodbModel.find();
        return users;
    }

    async getPassword(id: string): Promise<string | null> {
        const user = await UserMongodbModel.findOne({id: id});
        if(!user) return null;
        return user.password;
    }

    async getPasswordByEmail(email: string): Promise<string | null> {
        const user = await UserMongodbModel.findOne({email: email});
        if(!user) return null;
        return user.password;
    }

    async changePassword(email: string, password: string): Promise<boolean | null> {
        const user = await UserMongodbModel.findOneAndUpdate({email: email}, {password: password});
        if(!user) return false;
        return true;
    }

    async updateUser(user: User): Promise<boolean | null> {
        const userMongodb = await UserMongodbModel.findOneAndUpdate({id: user.id}, user);
        if(!userMongodb) return false;
        return true;
    }

    async getUserById(id: string): Promise<User | null> {
        const user = await UserMongodbModel.findOne({id: id});
        return user;
    }

    async deleteUser(id: string): Promise<boolean | null> {
        const result = await UserMongodbModel.findOneAndDelete({id: id});
        if(!result) return false;
        return true;
    }
}