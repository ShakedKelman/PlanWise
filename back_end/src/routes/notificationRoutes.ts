import express from "express";
import * as notificationController from "../controllers/notificationController";

const router = express.Router();

router.get("/user/:userId", notificationController.getNotificationsForUser);
router.put("/:notificationId", notificationController.markAsRead);
router.post("/", notificationController.addNotification);

export default router;
