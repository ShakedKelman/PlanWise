import { Request, Response } from "express";
import * as notificationService from "../services/notificationService";
import { notificationSchema } from "../models/NotificationModel";

export async function getNotificationsForUser(req: Request, res: Response) {
    const userId = parseInt(req.params.userId, 10);
    try {
        const notifications = await notificationService.getNotificationsForUser(userId);
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Error fetching notifications", error });
    }
}

export async function markAsRead(req: Request, res: Response) {
    const notificationId = parseInt(req.params.notificationId, 10);
    try {
        await notificationService.markAsRead(notificationId);
        res.status(200).json({ message: "Notification marked as read" });
    } catch (error) {
        res.status(500).json({ message: "Error marking notification as read", error });
    }
}

export async function addNotification(req: Request, res: Response) {
    const { error } = notificationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: "Validation failed", details: error.details });
    }

    const { userId, message, readStatus } = req.body;
    const notification = { userId, message, readStatus };
    try {
        await notificationService.addNotification(notification);
        res.status(201).json({ message: "Notification added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error adding notification", error });
    }
}
