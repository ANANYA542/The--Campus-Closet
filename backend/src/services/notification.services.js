import prisma from "../config/db.js";

export async function createNotification(userId, message, type = "info") {
  return await prisma.notification.create({
    data: {
      userId,
      message,
      type,
    },
  });
}
