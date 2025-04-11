import {Schema, model, Document} from "mongoose";

interface IUser extends Document {
    username : string,
    email : string,
    role : 'user' | 'admin',
    isActive : boolean,
}

const userSchema = new Schema<IUser> ({
    username :{
        type : String,
        required : true,
    },

    email :{
        type : String,
        required : true,
    },

    role :{
        type : String,
        enum :['user', 'admin'],
        default : 'user',
    },

    isActive :{
        type : Boolean,
        default : true,
    }

}, { timestamps : true });

const User = model<IUser>('User', userSchema);

export default User;