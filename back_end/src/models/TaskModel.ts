import Joi from "joi";


export interface Task {
    id?: number;
    title: string;
    description?: string;
    status?: "Pending" | "In Progress" | "Completed";
    dueDate?: string;
    userId: number;
}

export const taskSchema = Joi.object<Task>({
    id: Joi.number().optional(),
    title: Joi.string().min(1).required(),
    description: Joi.string().allow("").optional(),
    status: Joi.string()
        .valid("Pending", "In Progress", "Completed")
        .optional(),
    dueDate: Joi.string().isoDate().optional(),
    userId: Joi.number().required(),
});