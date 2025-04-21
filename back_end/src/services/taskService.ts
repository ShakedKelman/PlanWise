import { Task } from "../models/TaskModel";
import runQuery from "../db/dal";

export async function getTasksByUser(userId: number): Promise<Task[]> {
    const query = "SELECT * FROM tasks WHERE userId = ?";
    return await runQuery(query, [userId]);
}

export async function addTask(task: Task) {
    const query = `
        INSERT INTO tasks (title, description, status, dueDate, userId)
        VALUES (?, ?, ?, ?, ?)
    `;
    await runQuery(query, [task.title, task.description, task.status ?? "Pending", task.dueDate, task.userId]);
}
