const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function run() {
  const tables = [
    "Blog",
    "Category",
    "Faq",
    "Role",
    "ServiceCategory",
    "Service",
    "Testimonial",
    "User",
  ];
  for (const t of tables) {
    try {
      await prisma.$executeRawUnsafe(`UPDATE \`${t}\` SET status = UPPER(status)`);
      console.log(`Updated ${t}`);
    } catch (e) {
      console.error(`Failed ${t}:`, e.message);
    }
  }
}
run().finally(() => prisma.$disconnect());
