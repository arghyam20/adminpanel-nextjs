import bcrypt from "bcryptjs";
import { PrismaClient, Status } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const permissions = {
    dashboard: ["read"],
    roles: ["create", "read", "update", "delete"],
    users: ["create", "read", "update", "delete"],
    categories: ["create", "read", "update", "delete"],
    faqs: ["create", "read", "update", "delete"],
    testimonials: ["create", "read", "update", "delete"],
    blogs: ["create", "read", "update", "delete"],
    serviceCategories: ["create", "read", "update", "delete"],
    services: ["create", "read", "update", "delete"]
  };

  const adminRole = await prisma.role.upsert({
    where: { slug: "super-admin" },
    update: { permissions, status: Status.ACTIVE },
    create: {
      name: "Super Admin",
      slug: "super-admin",
      description: "Full platform access",
      permissions,
      status: Status.ACTIVE
    }
  });

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@example.com",
      password: await bcrypt.hash("Admin@12345", 12),
      roleId: adminRole.id,
      status: Status.ACTIVE
    }
  });

  const category = await prisma.category.upsert({
    where: { slug: "company-news" },
    update: {},
    create: { name: "Company News", slug: "company-news", status: Status.ACTIVE }
  });

  const serviceCategory = await prisma.serviceCategory.upsert({
    where: { slug: "consulting" },
    update: {},
    create: { name: "Consulting", slug: "consulting", status: Status.ACTIVE }
  });

  await prisma.faq.createMany({
    data: [
      {
        question: "How do I secure the admin panel?",
        answer: "Use HTTPS, rotate JWT secrets, enforce roles, and keep dependencies patched.",
        ordering: 1
      },
      {
        question: "Can I customize permissions?",
        answer: "Yes. Permissions are stored per role as JSON and checked by middleware/API guards.",
        ordering: 2
      }
    ],
    skipDuplicates: true
  });

  await prisma.blog.upsert({
    where: { slug: "welcome-to-the-admin-panel" },
    update: {},
    create: {
      title: "Welcome to the Admin Panel",
      slug: "welcome-to-the-admin-panel",
      excerpt: "A seeded article to verify blog workflows.",
      content: "<p>This is the first seeded post.</p>",
      tags: ["admin", "nextjs"],
      status: Status.PUBLISHED,
      publishedAt: new Date(),
      categoryId: category.id,
      authorId: admin.id
    }
  });

  await prisma.service.upsert({
    where: { slug: "digital-strategy" },
    update: {},
    create: {
      title: "Digital Strategy",
      slug: "digital-strategy",
      description: "<p>Plan and execute scalable digital programs.</p>",
      categoryId: serviceCategory.id
    }
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
