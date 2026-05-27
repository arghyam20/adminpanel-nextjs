import { PrismaClient, Status } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const allPermissions = {
    dashboard: ["read"],
    roles: ["create", "read", "update", "delete"],
    users: ["create", "read", "update", "delete"],
    categories: ["create", "read", "update", "delete"],
    faqs: ["create", "read", "update", "delete"],
    testimonials: ["create", "read", "update", "delete"],
    blogs: ["create", "read", "update", "delete"],
    serviceCategories: ["create", "read", "update", "delete"],
    services: ["create", "read", "update", "delete"],
  };

  const defaultRoles = [
    {
      name: "Super Admin",
      slug: "super-admin",
      description: "Full platform access",
      permissions: allPermissions,
    },
    {
      name: "Admin",
      slug: "admin",
      description: "Administrative access for business operations",
      permissions: { ...allPermissions, roles: ["read"] },
    },
    {
      name: "Editor",
      slug: "editor",
      description: "Content publishing access",
      permissions: {
        dashboard: ["read"],
        categories: ["create", "read", "update"],
        faqs: ["create", "read", "update"],
        testimonials: ["create", "read", "update"],
        blogs: ["create", "read", "update"],
        serviceCategories: ["read"],
        services: ["create", "read", "update"],
      },
    },
    {
      name: "Manager",
      slug: "manager",
      description: "Read and moderate operational content",
      permissions: {
        dashboard: ["read"],
        users: ["read"],
        categories: ["read", "update"],
        faqs: ["read", "update"],
        testimonials: ["read", "update"],
        blogs: ["read", "update"],
        serviceCategories: ["read", "update"],
        services: ["read", "update"],
      },
    },
  ];

  for (const role of defaultRoles) {
    await prisma.role.upsert({
      where: { slug: role.slug },
      update: { permissions: role.permissions, status: Status.ACTIVE },
      create: { ...role, status: Status.ACTIVE },
    });
  }

  const adminRole = await prisma.role.findUniqueOrThrow({ where: { slug: "super-admin" } });

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@example.com",
      password: await bcrypt.hash("Admin@12345", 12),
      roleId: adminRole.id,
      status: Status.ACTIVE,
    },
  });

  const category = await prisma.category.upsert({
    where: { slug: "company-news" },
    update: {},
    create: { name: "Company News", slug: "company-news", status: Status.ACTIVE },
  });

  const serviceCategory = await prisma.serviceCategory.upsert({
    where: { slug: "consulting" },
    update: {},
    create: {
      name: "Consulting",
      slug: "consulting",
      description: "Strategic consulting services for enterprise clients.",
      status: Status.ACTIVE,
    },
  });

  await prisma.faq.createMany({
    data: [
      {
        question: "How do I secure the admin panel?",
        answer: "Use HTTPS, rotate JWT secrets, enforce roles, and keep dependencies patched.",
        ordering: 1,
        status: Status.ACTIVE,
      },
      {
        question: "Can I customize permissions?",
        answer: "Yes. Permissions are stored per role as JSON and checked by middleware/API guards.",
        ordering: 2,
        status: Status.ACTIVE,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.testimonial.createMany({
    data: [
      {
        clientName: "Jane Smith",
        designation: "CTO",
        company: "Acme Corp",
        rating: 5,
        content: "Outstanding platform — cut our admin overhead by 60%.",
        status: Status.ACTIVE,
      },
    ],
    skipDuplicates: true,
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
      status: Status.ACTIVE,
      publishedAt: new Date(),
      categoryId: category.id,
      authorId: admin.id,
    },
  });

  await prisma.service.upsert({
    where: { slug: "digital-strategy" },
    update: {},
    create: {
      title: "Digital Strategy",
      slug: "digital-strategy",
      shortDesc: "Plan and execute scalable digital programs.",
      description: "<p>Plan and execute scalable digital programs.</p>",
      ordering: 1,
      categoryId: serviceCategory.id,
      status: Status.ACTIVE,
    },
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
