import { Notification } from "../models/NotificationModel";
import runQuery from "../db/dal";

export async function getNotificationsForUser(userId: number): Promise<Notification[]> {
    const query = "SELECT * FROM notifications WHERE userId = ?";
    return await runQuery(query, [userId]);
}

export async function markAsRead(notificationId: number) {
    const query = "UPDATE notifications SET readStatus = true WHERE id = ?";
    await runQuery(query, [notificationId]);
}

export async function addNotification(notification: Notification) {
    const query = `
        INSERT INTO notifications (userId, message, readStatus)
        VALUES (?, ?, ?)
    `;
    await runQuery(query, [notification.userId, notification.message, notification.readStatus ?? false]);
}
