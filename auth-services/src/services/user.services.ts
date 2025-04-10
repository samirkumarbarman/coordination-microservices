import User from '../models/user.model';
import jwt from 'jsonwebtoken';


export const registerUser = async (userData: {email :string, password: string, username: string}) => {
    const { email, password, username } = userData;

    const existUser = await User.findOne({ email });
    if (existUser) {
        const error = new Error('User already exists') as any;
        error.statusCode = 400;
        throw error;
    }
    const user = new User({
        email,
        password,
        username,
    });
    await user.save();
    return { id: user._id, email: user.email, username: user.username };
};

export const loginUser = async (credentials: {email :string, password: string}) => {
    const { email, password } = credentials;

    const user = await User.findOne({ email });
    if (!user){
        const error = new Error('User not found') as any;
        error.statusCode = 404;
        throw error;
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        const error = new Error('Invalid credentials') as any;
        error.statusCode = 401;
        throw error;
    
    }
    return jwt.sign({ id: user._id}, `${process.env.JWT_SECRET}`, { expiresIn: '1h' });
};