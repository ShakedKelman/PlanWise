import { User } from "../models/useModel";
import runQuery from "../db/dal";

export async function getAllUsers(): Promise<User[]> {
    const query = "SELECT * FROM users";
    return await runQuery(query);
}

export async function getUserById(id: number): Promise<User> {
    const query = "SELECT * FROM users WHERE id = ?";
    const result = await runQuery(query, [id]);
    return result[0];
}

export async function addUser(user: User) {
    const query = `
        INSERT INTO users (firstName, lastName, email, password, role)
        VALUES (?, ?, ?, ?, ?)
    `;
    await runQuery(query, [user.firstName, user.lastName, user.email, user.password, user.role ?? "User"]);
}
