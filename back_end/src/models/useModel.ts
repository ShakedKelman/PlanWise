import Joi from "joi";

export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: "User" | "Admin";
}

export const userSchema = Joi.object<User>({
    id: Joi.number().optional(),
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("User", "Admin").optional()
});