const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.$queryRawUnsafe(`SELECT id, status FROM Category WHERE status NOT IN ('Active', 'Inactive')`).then(console.log).catch(console.error).finally(() => prisma.$disconnect());
