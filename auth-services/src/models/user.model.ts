import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword: (password: string) => Promise<boolean>;
}

export const userSchema = new Schema<IUser>({
    username : {
        type :String,
        required : true,
    },

    password : {
        required : true,
        type : String,
    },
    email : {
        required : true,
        type : String,
        unique : true,
    },
},{ timestamps : true });

userSchema.pre<IUser>('save', async function (next){
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

const User = model<IUser>('User', userSchema);

export default User;
