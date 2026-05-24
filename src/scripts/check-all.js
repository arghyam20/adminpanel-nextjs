const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const tables = ['blog', 'category', 'faq', 'role', 'serviceCategory', 'service', 'testimonial', 'user'];
  for (const t of tables) {
    const rows = await prisma.$queryRawUnsafe(`SELECT id, status FROM \`${t.charAt(0).toUpperCase() + t.slice(1)}\` WHERE status = '' OR status IS NULL`);
    console.log(t, rows);
  }
}
run().catch(console.error).finally(() => prisma.$disconnect());
