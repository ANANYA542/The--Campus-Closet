const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log(' Prisma disconnected on app termination');
  process.exit(0);
});

module.exports = prisma;
