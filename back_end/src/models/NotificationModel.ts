import Joi from "joi";

export interface Notification {
    id?: number;
    userId: number;
    message: string;
    readStatus?: boolean;
    createdAt?: string;
}

export const notificationSchema = Joi.object<Notification>({
    id: Joi.number().optional(),
    userId: Joi.number().required(),
    message: Joi.string().min(1).required(),
    readStatus: Joi.boolean().optional().default(false),
    createdAt: Joi.string().optional()
});
