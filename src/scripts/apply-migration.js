const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const prisma = new PrismaClient();

const sql = fs.readFileSync(
  "src/api/prisma/schema/migrations/20260524224018_fix_status_enum_map/migration.sql",
  "utf8"
);

const statements = sql
  .split("\n")
  .filter((line) => !line.trim().startsWith("--") && line.trim())
  .join("\n")
  .split(";")
  .map((s) => s.trim())
  .filter((s) => s.length > 0);

async function run() {
  for (const stmt of statements) {
    try {
      await prisma.$executeRawUnsafe(stmt);
      console.log("OK:", stmt.substring(0, 80));
    } catch (e) {
      console.error("FAIL:", stmt.substring(0, 80));
      console.error("  ->", e.message);
    }
  }
  console.log("Done");
}

run().finally(() => prisma.$disconnect());
