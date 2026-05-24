const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.category.findMany({ where: { status: '' } }).then(console.log).catch(console.error).finally(() => prisma.$disconnect());
