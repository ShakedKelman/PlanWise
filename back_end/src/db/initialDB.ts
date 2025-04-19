import mysql from "mysql2";
import { appConfig } from "../utils/appConfig";
import runQuery, { connection } from "./dal"; // Import connection from dal


// 1. Create the users table
async function createUsersTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(100) NOT NULL,
        lastName VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('User', 'Admin') DEFAULT 'User'
    );
    `;
    await runQuery(query);
    console.log("Users table created successfully");
}

// 2. Create the tasks table
async function createTasksTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
        dueDate DATE,
        userId INT,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );
    `;
    await runQuery(query);
    console.log("Tasks table created successfully");
}



// 5. Create the notifications table
async function createNotificationsTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS notifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT,
        message TEXT,
        readStatus BOOLEAN DEFAULT false,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id)
    );
    `;
    await runQuery(query);
    console.log("Notifications table created successfully");
}


// 7. Function to run all table creation functions in order
async function createAllTables() {
    try {
        await createUsersTable();
        await createTasksTable();
        await createNotificationsTable();
        console.log("All tables created successfully");
    } catch (error) {
        console.error("Error creating tables:", error);
    }
}

// Run the function to create all tables
createAllTables();

// 1. Seed Users
async function seedUsers() {
    const query = `
    INSERT INTO users (firstName, lastName, email, password, role) VALUES 
    ('Alice', 'Johnson', 'alice@example.com', 'password1', 'User'),
    ('Bob', 'Smith', 'bob@example.com', 'password2', 'Admin'),
    ('Charlie', 'Brown', 'charlie@example.com', 'password3', 'User'),
    ('Dana', 'White', 'dana@example.com', 'password4', 'User'),
    ('Eve', 'Stone', 'eve@example.com', 'password5', 'Admin');
    `;
    await runQuery(query);
    console.log("Users seeded successfully");
}

// 2. Seed Tasks
async function seedTasks() {
    const query = `
    INSERT INTO tasks (title, description, status, dueDate, userId) VALUES 
    ('Finish backend', 'Implement all backend endpoints', 'In Progress', '2025-05-01', 1),
    ('Write docs', 'Document the PlanWise API', 'Pending', '2025-04-30', 2),
    ('Fix bugs', 'Resolve frontend UI issues', 'Pending', '2025-04-25', 3),
    ('Deploy app', 'Push to production server', 'Completed', '2025-04-15', 2),
    ('Design logo', 'Create branding for PlanWise', 'In Progress', '2025-04-28', 4);
    `;
    await runQuery(query);
    console.log("Tasks seeded successfully");
}

// 3. Seed Notifications
async function seedNotifications() {
    const query = `
    INSERT INTO notifications (userId, message, readStatus) VALUES 
    (1, 'You have a new task assigned.', false),
    (2, 'Your password was changed.', true),
    (3, 'New comment on your task.', false),
    (1, 'Task deadline is approaching.', false),
    (4, 'Admin approved your request.', true);
    `;
    await runQuery(query);
    console.log("Notifications seeded successfully");
}
async function seedAllData() {
    try {
        await seedUsers();
        await seedTasks();
        await seedNotifications();
        console.log("All data seeded successfully");
    } catch (error) {
        console.error("Error seeding data:", error);
    }
}
createAllTables().then(() => seedAllData());


export { connection, runQuery }; // Export the connection and runQuery function for use in other parts of the app
