-- Step 1: Update any existing uppercase values to TitleCase for all tables

UPDATE `blog`            SET `status` = 'Active'   WHERE `status` = 'ACTIVE';
UPDATE `blog`            SET `status` = 'Inactive' WHERE `status` = 'INACTIVE';
UPDATE `blog`            SET `status` = 'Active'   WHERE `status` = 'DRAFT';
UPDATE `blog`            SET `status` = 'Active'   WHERE `status` = 'PUBLISHED';

UPDATE `category`        SET `status` = 'Active'   WHERE `status` = 'ACTIVE';
UPDATE `category`        SET `status` = 'Inactive' WHERE `status` = 'INACTIVE';
UPDATE `category`        SET `status` = 'Active'   WHERE `status` = 'DRAFT';
UPDATE `category`        SET `status` = 'Active'   WHERE `status` = 'PUBLISHED';

UPDATE `faq`             SET `status` = 'Active'   WHERE `status` = 'ACTIVE';
UPDATE `faq`             SET `status` = 'Inactive' WHERE `status` = 'INACTIVE';
UPDATE `faq`             SET `status` = 'Active'   WHERE `status` = 'DRAFT';
UPDATE `faq`             SET `status` = 'Active'   WHERE `status` = 'PUBLISHED';

UPDATE `role`            SET `status` = 'Active'   WHERE `status` = 'ACTIVE';
UPDATE `role`            SET `status` = 'Inactive' WHERE `status` = 'INACTIVE';
UPDATE `role`            SET `status` = 'Active'   WHERE `status` = 'DRAFT';
UPDATE `role`            SET `status` = 'Active'   WHERE `status` = 'PUBLISHED';

UPDATE `servicecategory` SET `status` = 'Active'   WHERE `status` = 'ACTIVE';
UPDATE `servicecategory` SET `status` = 'Inactive' WHERE `status` = 'INACTIVE';
UPDATE `servicecategory` SET `status` = 'Active'   WHERE `status` = 'DRAFT';
UPDATE `servicecategory` SET `status` = 'Active'   WHERE `status` = 'PUBLISHED';

UPDATE `service`         SET `status` = 'Active'   WHERE `status` = 'ACTIVE';
UPDATE `service`         SET `status` = 'Inactive' WHERE `status` = 'INACTIVE';
UPDATE `service`         SET `status` = 'Active'   WHERE `status` = 'DRAFT';
UPDATE `service`         SET `status` = 'Active'   WHERE `status` = 'PUBLISHED';

UPDATE `testimonial`     SET `status` = 'Active'   WHERE `status` = 'ACTIVE';
UPDATE `testimonial`     SET `status` = 'Inactive' WHERE `status` = 'INACTIVE';
UPDATE `testimonial`     SET `status` = 'Active'   WHERE `status` = 'DRAFT';
UPDATE `testimonial`     SET `status` = 'Active'   WHERE `status` = 'PUBLISHED';

UPDATE `user`            SET `status` = 'Active'   WHERE `status` = 'ACTIVE';
UPDATE `user`            SET `status` = 'Inactive' WHERE `status` = 'INACTIVE';
UPDATE `user`            SET `status` = 'Active'   WHERE `status` = 'DRAFT';
UPDATE `user`            SET `status` = 'Active'   WHERE `status` = 'PUBLISHED';

-- Step 2: Alter ENUM column definitions to only accept 'Active' and 'Inactive'

ALTER TABLE `blog`            MODIFY `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active';
ALTER TABLE `category`        MODIFY `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active';
ALTER TABLE `faq`             MODIFY `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active';
ALTER TABLE `role`            MODIFY `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active';
ALTER TABLE `servicecategory` MODIFY `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active';
ALTER TABLE `service`         MODIFY `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active';
ALTER TABLE `testimonial`     MODIFY `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active';
ALTER TABLE `user`            MODIFY `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active';
