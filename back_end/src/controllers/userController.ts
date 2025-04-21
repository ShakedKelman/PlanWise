import { Request, Response } from "express";
import * as userService from "../services/userService";

export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
}

export async function getUserById(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);
    try {
        const user = await userService.getUserById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
}

export async function addUser(req: Request, res: Response) {
    const { firstName, lastName, email, password, role } = req.body;
    const user = { firstName, lastName, email, password, role };
    try {
        await userService.addUser(user);
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error adding user", error });
    }
}
