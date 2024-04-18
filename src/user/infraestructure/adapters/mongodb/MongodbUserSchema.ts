import { User } from '../../../domain/entities/User';
import mongoose, { Schema, Document } from 'mongoose';

type IUser = User & Document;

const UserSchema: Schema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    age: { type: Number, required: true },
    activity: { type: String, required: true },
    height: { type: Number, required: false },
    weight: { type: Number, required: false }
});

UserSchema.virtual('id').get(function (this: IUser) {
    return this._id.toHexString();
});

UserSchema.set('toJSON', {
    virtuals: true,
});


const UserMongodbModel =  mongoose.model<IUser>('User', UserSchema);

export { UserMongodbModel };