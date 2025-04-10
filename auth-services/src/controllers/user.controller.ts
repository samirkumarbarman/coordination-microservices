import { Request, Response } from "express";
import * as userService from "../services/user.services";

export const register = async (req: Request, res: Response): Promise<void> =>{
    try {
        const result = await userService.registerUser(req.body);
        res.status(200).json({message :"User successfully registered", data: result})
    } catch (error:any) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response): Promise<void> =>{
    try {
        const token = await userService.loginUser(req.body);
       res.status(200).json({message:"User successfully logged in", data:token});
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}