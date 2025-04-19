import express, { Request, Response } from "express";
import cors from 'cors';
import { appConfig } from "./utils/appConfig";

const server = express();

server.use(express.json());


server.use(cors({
    origin: 'http://localhost:3000' 
}));




// server.get("/", (req: Request, res: Response) => {
//     res.send("<h1>Hello World!</h1>");
// });


server.get('/', (req, res) => {
    res.send('PlanWise backend is running!');
  });
  
  server.listen(appConfig.port, () => {
    console.log(`🚀 Server is listening on port ${appConfig.port}`);
  });