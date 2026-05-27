const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
prisma
  .$queryRawUnsafe(`SELECT id, status FROM User WHERE status = ''`)
  .then(console.log)
  .catch(console.error)
  .finally(() => prisma.$disconnect());
