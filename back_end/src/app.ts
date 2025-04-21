import express, { Request, Response } from "express";
import cors from 'cors';
import { appConfig } from "./utils/appConfig";
import userRoutes from "./routes/userRoutes";  // Assuming userRoutes is a separate file.
import taskRoutes from "./routes/taskRoutes";  // Same for taskRoutes.
import notificationRoutes from "./routes/notificationRoutes";  // Same for notificationRoutes.

const server = express();

server.use(express.json());


server.use(cors({
    origin: 'http://localhost:3000' 
}));

// Define route handlers
server.use(appConfig.routePrefix + "/users", userRoutes);
server.use(appConfig.routePrefix + "/tasks", taskRoutes);
server.use(appConfig.routePrefix + "/notifications", notificationRoutes);

// server.get("/", (req: Request, res: Response) => {
//     res.send("<h1>Hello World!</h1>");
// });


server.get('/', (req, res) => {
    res.send('PlanWise backend is running!');
  });
  
  server.listen(appConfig.port, () => {
    console.log(`🚀 Server is listening on port ${appConfig.port}`);
  });