const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function test() {
  try {
    const total = await prisma.category.count({ where: { deletedAt: null } });
    console.log("Count:", total);
    const items = await prisma.category.findMany({ 
      where: { deletedAt: null }, 
      skip: 0, 
      take: 10, 
      orderBy: { createdAt: 'desc' } 
    });
    console.log("Items:", items);
  } catch(e) {
    console.error("Prisma Error:", e.message);
  }
}
test().finally(() => prisma.$disconnect());
