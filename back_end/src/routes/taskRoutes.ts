import express from "express";
import * as taskController from "../controllers/taskController";

const router = express.Router();

router.get("/user/:userId", taskController.getTasksByUser);
router.post("/", taskController.addTask);

export default router;
