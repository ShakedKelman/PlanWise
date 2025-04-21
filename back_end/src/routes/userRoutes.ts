import express from "express";
import * as userController from "../controllers/userController";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.addUser);

export default router;
