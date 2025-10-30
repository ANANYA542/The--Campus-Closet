const prisma = require("../config/db");

async function createNotification(userId, message, type = "info") {
  return prisma.notification.create({
    data: {
      userId,
      message,
      type,
    },
  });
}

module.exports = { createNotification };