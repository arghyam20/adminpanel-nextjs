-- Migration: optimize_schema_add_fields_and_indexes
-- Applies additive changes on top of the fix-status scripts that ran outside Prisma.
-- Safe to run: all ALTER TABLE operations use existing columns; FKs are re-added.

-- ─── Drop old deletedAt-based indexes (already removed by fix scripts, guarded) ──
DROP INDEX IF EXISTS `Blog_categoryId_authorId_status_deletedAt_idx` ON `blog`;
DROP INDEX IF EXISTS `Category_status_deletedAt_idx` ON `category`;
DROP INDEX IF EXISTS `Faq_ordering_status_deletedAt_idx` ON `faq`;
DROP INDEX IF EXISTS `Role_status_deletedAt_idx` ON `role`;
DROP INDEX IF EXISTS `Service_categoryId_status_deletedAt_idx` ON `service`;
DROP INDEX IF EXISTS `ServiceCategory_status_deletedAt_idx` ON `servicecategory`;
DROP INDEX IF EXISTS `Testimonial_status_deletedAt_idx` ON `testimonial`;
DROP INDEX IF EXISTS `User_roleId_status_deletedAt_idx` ON `user`;

-- ─── Drop old isDeleted-based indexes (will be recreated with lowercase names) ──
DROP INDEX IF EXISTS `Blog_categoryId_authorId_status_isDeleted_idx` ON `blog`;
DROP INDEX IF EXISTS `Category_status_isDeleted_idx` ON `category`;
DROP INDEX IF EXISTS `Faq_ordering_status_isDeleted_idx` ON `faq`;
DROP INDEX IF EXISTS `Role_status_isDeleted_idx` ON `role`;
DROP INDEX IF EXISTS `Service_categoryId_status_isDeleted_idx` ON `service`;
DROP INDEX IF EXISTS `ServiceCategory_status_isDeleted_idx` ON `servicecategory`;
DROP INDEX IF EXISTS `Testimonial_status_isDeleted_idx` ON `testimonial`;
DROP INDEX IF EXISTS `User_roleId_status_isDeleted_idx` ON `user`;

-- ─── Drop stale FKs (dropped by fix scripts, guard with IF EXISTS via procedure) ─
DROP PROCEDURE IF EXISTS drop_fk_if_exists;
DELIMITER $$
CREATE PROCEDURE drop_fk_if_exists(IN tbl VARCHAR(64), IN fk VARCHAR(64))
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.TABLE_CONSTRAINTS
    WHERE CONSTRAINT_SCHEMA = DATABASE()
      AND TABLE_NAME = tbl
      AND CONSTRAINT_NAME = fk
      AND CONSTRAINT_TYPE = 'FOREIGN KEY'
  ) THEN
    SET @sql = CONCAT('ALTER TABLE `', tbl, '` DROP FOREIGN KEY `', fk, '`');
    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
  END IF;
END$$
DELIMITER ;

CALL drop_fk_if_exists('blog',    'Blog_categoryId_fkey');
CALL drop_fk_if_exists('blog',    'Blog_authorId_fkey');
CALL drop_fk_if_exists('blog',    'blog_categoryId_fkey');
CALL drop_fk_if_exists('blog',    'blog_authorId_fkey');
CALL drop_fk_if_exists('service', 'Service_categoryId_fkey');
CALL drop_fk_if_exists('service', 'service_categoryId_fkey');
CALL drop_fk_if_exists('user',    'User_roleId_fkey');
CALL drop_fk_if_exists('user',    'user_roleId_fkey');

DROP PROCEDURE IF EXISTS drop_fk_if_exists;

-- ─── blog: VarChar constraints + new columns ──────────────────────────────────
ALTER TABLE `blog`
  MODIFY `title`           VARCHAR(300)  NOT NULL,
  MODIFY `slug`            VARCHAR(350)  NOT NULL,
  MODIFY `featuredImage`   VARCHAR(500)  NULL,
  MODIFY `metaTitle`       VARCHAR(160)  NULL,
  MODIFY `metaDescription` VARCHAR(320)  NULL,
  MODIFY `tags`            JSON          NOT NULL;

-- ─── category: VarChar constraints ────────────────────────────────────────────
ALTER TABLE `category`
  MODIFY `name` VARCHAR(150) NOT NULL,
  MODIFY `slug` VARCHAR(180) NOT NULL;

-- ─── faq: VarChar constraint ──────────────────────────────────────────────────
ALTER TABLE `faq`
  MODIFY `question` VARCHAR(500) NOT NULL;

-- ─── role: VarChar constraints ────────────────────────────────────────────────
ALTER TABLE `role`
  MODIFY `name`        VARCHAR(100) NOT NULL,
  MODIFY `slug`        VARCHAR(100) NOT NULL,
  MODIFY `permissions` JSON         NOT NULL;

-- ─── service: VarChar constraints + new columns ───────────────────────────────
ALTER TABLE `service`
  ADD COLUMN  `shortDesc`       VARCHAR(500) NULL         AFTER `slug`,
  ADD COLUMN  `ordering`        INT          NOT NULL DEFAULT 0 AFTER `metaDescription`,
  MODIFY      `title`           VARCHAR(300) NOT NULL,
  MODIFY      `slug`            VARCHAR(350) NOT NULL,
  MODIFY      `image`           VARCHAR(500) NULL,
  MODIFY      `metaTitle`       VARCHAR(160) NULL,
  MODIFY      `metaDescription` VARCHAR(320) NULL;

-- ─── servicecategory: new columns + VarChar constraints ───────────────────────
ALTER TABLE `servicecategory`
  ADD COLUMN `description` TEXT         NULL AFTER `slug`,
  ADD COLUMN `image`       VARCHAR(500) NULL AFTER `description`,
  MODIFY     `name`        VARCHAR(150) NOT NULL,
  MODIFY     `slug`        VARCHAR(180) NOT NULL;

-- ─── testimonial: new column + VarChar constraints ────────────────────────────
ALTER TABLE `testimonial`
  ADD COLUMN `company`     VARCHAR(150) NULL AFTER `designation`,
  MODIFY     `clientName`  VARCHAR(150) NOT NULL,
  MODIFY     `designation` VARCHAR(150) NULL,
  MODIFY     `image`       VARCHAR(500) NULL;

-- ─── user: VarChar constraints ────────────────────────────────────────────────
ALTER TABLE `user`
  MODIFY `name`         VARCHAR(150) NOT NULL,
  MODIFY `email`        VARCHAR(200) NOT NULL,
  MODIFY `password`     VARCHAR(255) NOT NULL,
  MODIFY `phone`        VARCHAR(20)  NULL,
  MODIFY `profileImage` VARCHAR(500) NULL;

-- ─── Rename unique indexes to lowercase convention ────────────────────────────
ALTER TABLE `blog`            RENAME INDEX `Blog_slug_key`            TO `blog_slug_key`;
ALTER TABLE `category`        RENAME INDEX `Category_slug_key`        TO `category_slug_key`;
ALTER TABLE `role`            RENAME INDEX `Role_name_key`            TO `role_name_key`;
ALTER TABLE `role`            RENAME INDEX `Role_slug_key`            TO `role_slug_key`;
ALTER TABLE `service`         RENAME INDEX `Service_slug_key`         TO `service_slug_key`;
ALTER TABLE `servicecategory` RENAME INDEX `ServiceCategory_slug_key` TO `servicecategory_slug_key`;
ALTER TABLE `user`            RENAME INDEX `User_email_key`           TO `user_email_key`;

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
