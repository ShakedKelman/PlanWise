import { Request, Response } from "express";
import * as taskService from "../services/taskService";
import { taskSchema } from "../models/TaskModel";

export async function getTasksByUser(req: Request, res: Response) {
    const userId = parseInt(req.params.userId, 10);
    try {
        const tasks = await taskService.getTasksByUser(userId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error });
    }
}

export async function addTask(req: Request, res: Response) {
    const { error } = taskSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: "Validation error", details: error.details });
    }
    const { title, description, status, dueDate, userId } = req.body;
    const task = { title, description, status, dueDate, userId };
    
    try {
        await taskService.addTask(task);
        res.status(201).json({ message: "Task created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error adding task", error });
    }
}
