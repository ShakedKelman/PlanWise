import { encryptPassword } from "../utils/authUtils";
import runQuery, { closeDB } from "./dal";
const fs = require('fs');
const path = require('path');


const createTables = async () => {
    let Q = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        hashedPassword VARCHAR(255) NOT NULL,
        isAdmin TINYINT(1) NOT NULL DEFAULT 0,
        token VARCHAR(1024) DEFAULT NULL,
        CONSTRAINT unique_fname_lname UNIQUE (firstName, lastName)
    );
    `;
    await runQuery(Q);

    Q = `
    CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'todo',
        priority VARCHAR(50) NOT NULL DEFAULT 'medium',
        dueDate DATE NULL,
        createdByUserId INT NOT NULL,
        assignedToUserId INT NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (createdByUserId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (assignedToUserId) REFERENCES users(id) ON DELETE CASCADE
    );
    `;
    await runQuery(Q);

    Q = `
    CREATE TABLE IF NOT EXISTS task_assignments (
        taskId INT NOT NULL,
        userId INT NOT NULL,
        FOREIGN KEY (taskId) REFERENCES tasks(id),
        FOREIGN KEY (userId) REFERENCES users(id),
        PRIMARY KEY (taskId, userId)
    );
    `;
    await runQuery(Q);
};

const insertData = async () => {
    const hashedPassword1 = await encryptPassword('1234');
    const hashedPassword2 = await encryptPassword('1234');
    const hashedPassword3 = await encryptPassword('1234'); // For Admin
    const hashedPassword4 = await encryptPassword('1234'); // For Non-Admin

    let Q = `
        INSERT IGNORE INTO users (firstName, lastName, email, hashedPassword, isAdmin, token)
        VALUES 
            ('John', 'Doe', 'john.doe@example.com', ?, 0, NULL),
            ('Jane', 'Smith', 'jane.smith@example.com', ?, 1, NULL),
            ('Admin', 'User', 'admin@gmail.com', ?, 1, NULL),
            ('NotAdmin', 'User', 'notadmin@gmail.com', ?, 0, NULL);
    `;
    await runQuery(Q, [hashedPassword1, hashedPassword2, hashedPassword3, hashedPassword4]);

    Q = `
        INSERT IGNORE INTO tasks (title, description, status, priority, dueDate, createdByUserId, assignedToUserId)
        VALUES
            ('Setup Project Structure', 'Initialize the project with basic file structure and configs.', 'in-progress', 'high', '2024-11-10', 2, 1),
            ('Implement Auth', 'Add JWT-based authentication system to the backend.', 'todo', 'high', '2024-11-20', 3, 4),
            ('Create UI Mockups', 'Design the initial UI mockups in Figma or Sketch.', 'todo', 'medium', '2024-12-01', 1, 2),
            ('Database Migration', 'Write and run migrations for the initial database schema.', 'done', 'low', '2024-10-15', 2, 1),
            ('Write Unit Tests', 'Add unit tests for the authentication and user modules.', 'in-progress', 'medium', '2024-12-10', 3, 4),
            ('Deploy to Staging', 'Setup a staging environment and deploy the initial build.', 'todo', 'high', '2024-12-20', 3, 1)
    `;
    await runQuery(Q);

    Q = `
        INSERT IGNORE INTO task_assignments (taskId, userId)
        VALUES 
            (1, 1),
            (1, 2),
            (2, 1);
    `;
    await runQuery(Q);
};

const runSetup = async () => {
    try {
        await createTables();
        await insertData();
    } catch (err) {
        console.error("Error during setup:", err);
    } finally {
        await closeDB();
        console.log("Done creating tables and inserting data for the task system");
    }
};

runSetup().catch(err => {
    console.error("Error during setup:", err);
});
