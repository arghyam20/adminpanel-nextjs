-- Migration: optimize_schema_add_fields_and_indexes
-- Applies additive changes on top of the fix-status scripts that ran outside Prisma.
-- Safe to run: guards all destructive ops; FKs are re-added at the end.

-- ─── Drop stale FKs first (must precede index/table drops they back) ──────────
ALTER TABLE `Blog`    DROP FOREIGN KEY IF EXISTS `Blog_categoryId_fkey`;
ALTER TABLE `Blog`    DROP FOREIGN KEY IF EXISTS `Blog_authorId_fkey`;
ALTER TABLE `Blog`    DROP FOREIGN KEY IF EXISTS `blog_categoryId_fkey`;
ALTER TABLE `Blog`    DROP FOREIGN KEY IF EXISTS `blog_authorId_fkey`;
ALTER TABLE `Service` DROP FOREIGN KEY IF EXISTS `Service_categoryId_fkey`;
ALTER TABLE `Service` DROP FOREIGN KEY IF EXISTS `service_categoryId_fkey`;
ALTER TABLE `User`    DROP FOREIGN KEY IF EXISTS `User_roleId_fkey`;
ALTER TABLE `User`    DROP FOREIGN KEY IF EXISTS `user_roleId_fkey`;

-- ─── Drop old deletedAt-based indexes ─────────────────────────────────────────
DROP INDEX IF EXISTS `Blog_categoryId_authorId_status_deletedAt_idx` ON `Blog`;
DROP INDEX IF EXISTS `Category_status_deletedAt_idx`                 ON `Category`;
DROP INDEX IF EXISTS `Faq_ordering_status_deletedAt_idx`             ON `Faq`;
DROP INDEX IF EXISTS `Role_status_deletedAt_idx`                     ON `Role`;
DROP INDEX IF EXISTS `Service_categoryId_status_deletedAt_idx`       ON `Service`;
DROP INDEX IF EXISTS `ServiceCategory_status_deletedAt_idx`          ON `ServiceCategory`;
DROP INDEX IF EXISTS `Testimonial_status_deletedAt_idx`              ON `Testimonial`;
DROP INDEX IF EXISTS `User_roleId_status_deletedAt_idx`              ON `User`;

-- ─── Drop old isDeleted-based indexes (will be recreated with lowercase names) ─
DROP INDEX IF EXISTS `Blog_categoryId_authorId_status_isDeleted_idx` ON `Blog`;
DROP INDEX IF EXISTS `Category_status_isDeleted_idx`                 ON `Category`;
DROP INDEX IF EXISTS `Faq_ordering_status_isDeleted_idx`             ON `Faq`;
DROP INDEX IF EXISTS `Role_status_isDeleted_idx`                     ON `Role`;
DROP INDEX IF EXISTS `Service_categoryId_status_isDeleted_idx`       ON `Service`;
DROP INDEX IF EXISTS `ServiceCategory_status_isDeleted_idx`          ON `ServiceCategory`;
DROP INDEX IF EXISTS `Testimonial_status_isDeleted_idx`              ON `Testimonial`;
DROP INDEX IF EXISTS `User_roleId_status_isDeleted_idx`              ON `User`;

-- ─── Add isDeleted column + drop deletedAt on all tables ──────────────────────
ALTER TABLE `Blog`
  ADD COLUMN IF NOT EXISTS `isDeleted` BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE `Blog` DROP COLUMN IF EXISTS `deletedAt`;

ALTER TABLE `Category`
  ADD COLUMN IF NOT EXISTS `isDeleted` BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE `Category` DROP COLUMN IF EXISTS `deletedAt`;

ALTER TABLE `Faq`
  ADD COLUMN IF NOT EXISTS `isDeleted` BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE `Faq` DROP COLUMN IF EXISTS `deletedAt`;

ALTER TABLE `Role`
  ADD COLUMN IF NOT EXISTS `isDeleted` BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE `Role` DROP COLUMN IF EXISTS `deletedAt`;

ALTER TABLE `ServiceCategory`
  ADD COLUMN IF NOT EXISTS `isDeleted` BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE `ServiceCategory` DROP COLUMN IF EXISTS `deletedAt`;

ALTER TABLE `Service`
  ADD COLUMN IF NOT EXISTS `isDeleted` BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE `Service` DROP COLUMN IF EXISTS `deletedAt`;

ALTER TABLE `Testimonial`
  ADD COLUMN IF NOT EXISTS `isDeleted` BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE `Testimonial` DROP COLUMN IF EXISTS `deletedAt`;

ALTER TABLE `User`
  ADD COLUMN IF NOT EXISTS `isDeleted` BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE `User` DROP COLUMN IF EXISTS `deletedAt`;

-- ─── blog: VarChar constraints + new columns ──────────────────────────────────
ALTER TABLE `Blog`
  MODIFY `title`           VARCHAR(300)  NOT NULL,
  MODIFY `slug`            VARCHAR(350)  NOT NULL,
  MODIFY `featuredImage`   VARCHAR(500)  NULL,
  MODIFY `metaTitle`       VARCHAR(160)  NULL,
  MODIFY `metaDescription` VARCHAR(320)  NULL,
  MODIFY `tags`            JSON          NOT NULL;

-- ─── category: VarChar constraints ────────────────────────────────────────────
ALTER TABLE `Category`
  MODIFY `name` VARCHAR(150) NOT NULL,
  MODIFY `slug` VARCHAR(180) NOT NULL;

-- ─── faq: VarChar constraint ──────────────────────────────────────────────────
ALTER TABLE `Faq`
  MODIFY `question` VARCHAR(500) NOT NULL;

-- ─── role: VarChar constraints ────────────────────────────────────────────────
ALTER TABLE `Role`
  MODIFY `name`        VARCHAR(100) NOT NULL,
  MODIFY `slug`        VARCHAR(100) NOT NULL,
  MODIFY `permissions` JSON         NOT NULL;

-- ─── service: VarChar constraints + new columns ───────────────────────────────
ALTER TABLE `Service`
  ADD COLUMN IF NOT EXISTS `shortDesc`  VARCHAR(500) NULL         AFTER `slug`,
  ADD COLUMN IF NOT EXISTS `ordering`   INT          NOT NULL DEFAULT 0 AFTER `metaDescription`,
  MODIFY `title`           VARCHAR(300) NOT NULL,
  MODIFY `slug`            VARCHAR(350) NOT NULL,
  MODIFY `image`           VARCHAR(500) NULL,
  MODIFY `metaTitle`       VARCHAR(160) NULL,
  MODIFY `metaDescription` VARCHAR(320) NULL;

-- ─── servicecategory: new columns + VarChar constraints ───────────────────────
ALTER TABLE `ServiceCategory`
  ADD COLUMN IF NOT EXISTS `description` TEXT         NULL AFTER `slug`,
  ADD COLUMN IF NOT EXISTS `image`       VARCHAR(500) NULL AFTER `description`,
  MODIFY `name` VARCHAR(150) NOT NULL,
  MODIFY `slug` VARCHAR(180) NOT NULL;

-- ─── testimonial: new column + VarChar constraints ────────────────────────────
ALTER TABLE `Testimonial`
  ADD COLUMN IF NOT EXISTS `company` VARCHAR(150) NULL AFTER `designation`,
  MODIFY `clientName`  VARCHAR(150) NOT NULL,
  MODIFY `designation` VARCHAR(150) NULL,
  MODIFY `image`       VARCHAR(500) NULL;

-- ─── user: VarChar constraints + new columns ──────────────────────────────────
ALTER TABLE `User`
  MODIFY `name`         VARCHAR(150) NOT NULL,
  MODIFY `email`        VARCHAR(200) NOT NULL,
  MODIFY `password`     VARCHAR(255) NOT NULL,
  MODIFY `phone`        VARCHAR(20)  NULL,
  MODIFY `profileImage` VARCHAR(500) NULL;

-- ─── Rename unique indexes to lowercase convention (MariaDB-compatible) ────────
DROP INDEX IF EXISTS `Blog_slug_key`            ON `blog`;
CREATE UNIQUE INDEX `blog_slug_key`             ON `blog`(`slug`);

DROP INDEX IF EXISTS `Category_slug_key`        ON `category`;
CREATE UNIQUE INDEX `category_slug_key`         ON `category`(`slug`);

DROP INDEX IF EXISTS `Role_name_key`            ON `role`;
CREATE UNIQUE INDEX `role_name_key`             ON `role`(`name`);

DROP INDEX IF EXISTS `Role_slug_key`            ON `role`;
CREATE UNIQUE INDEX `role_slug_key`             ON `role`(`slug`);

DROP INDEX IF EXISTS `Service_slug_key`         ON `service`;
CREATE UNIQUE INDEX `service_slug_key`          ON `service`(`slug`);

DROP INDEX IF EXISTS `ServiceCategory_slug_key` ON `servicecategory`;
CREATE UNIQUE INDEX `servicecategory_slug_key`  ON `servicecategory`(`slug`);

DROP INDEX IF EXISTS `User_email_key`           ON `user`;
CREATE UNIQUE INDEX `user_email_key`            ON `user`(`email`);

-- ─── Create optimized isDeleted-based indexes ─────────────────────────────────
CREATE INDEX `blog_categoryId_status_isDeleted_idx`          ON `blog`(`categoryId`, `status`, `isDeleted`);
CREATE INDEX `blog_authorId_status_isDeleted_idx`            ON `blog`(`authorId`, `status`, `isDeleted`);
CREATE INDEX `blog_slug_idx`                                 ON `blog`(`slug`);
CREATE INDEX `blog_publishedAt_status_isDeleted_idx`         ON `blog`(`publishedAt`, `status`, `isDeleted`);

CREATE INDEX `category_status_isDeleted_idx`                 ON `category`(`status`, `isDeleted`);
CREATE INDEX `category_slug_idx`                             ON `category`(`slug`);

CREATE INDEX `faq_ordering_status_isDeleted_idx`             ON `faq`(`ordering`, `status`, `isDeleted`);
CREATE INDEX `faq_status_isDeleted_idx`                      ON `faq`(`status`, `isDeleted`);

CREATE INDEX `role_status_isDeleted_idx`                     ON `role`(`status`, `isDeleted`);
CREATE INDEX `role_slug_idx`                                 ON `role`(`slug`);

CREATE INDEX `service_categoryId_status_isDeleted_idx`       ON `service`(`categoryId`, `status`, `isDeleted`);
CREATE INDEX `service_ordering_status_isDeleted_idx`         ON `service`(`ordering`, `status`, `isDeleted`);
CREATE INDEX `service_slug_idx`                              ON `service`(`slug`);

CREATE INDEX `servicecategory_status_isDeleted_idx`          ON `servicecategory`(`status`, `isDeleted`);
CREATE INDEX `servicecategory_slug_idx`                      ON `servicecategory`(`slug`);

CREATE INDEX `testimonial_status_isDeleted_idx`              ON `testimonial`(`status`, `isDeleted`);
CREATE INDEX `testimonial_rating_status_isDeleted_idx`       ON `testimonial`(`rating`, `status`, `isDeleted`);

CREATE INDEX `user_roleId_status_isDeleted_idx`              ON `user`(`roleId`, `status`, `isDeleted`);
CREATE INDEX `user_email_idx`                                ON `user`(`email`);
CREATE INDEX `user_passwordResetToken_idx`                   ON `user`(`passwordResetToken`);

-- ─── Restore foreign key constraints ──────────────────────────────────────────
ALTER TABLE `blog`
  ADD CONSTRAINT `blog_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `blog_authorId_fkey`   FOREIGN KEY (`authorId`)   REFERENCES `user`(`id`)     ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `service`
  ADD CONSTRAINT `service_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `servicecategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `user`
  ADD CONSTRAINT `user_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
