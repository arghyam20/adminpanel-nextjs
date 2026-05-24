-- Step 1: Update any existing uppercase values to TitleCase for all tables

UPDATE `Blog`            SET `status` = 'Active'   WHERE `status` = 'ACTIVE';
UPDATE `Blog`            SET `status` = 'Inactive' WHERE `status` = 'INACTIVE';
UPDATE `Blog`            SET `status` = 'Active'   WHERE `status` = 'DRAFT';
UPDATE `Blog`            SET `status` = 'Active'   WHERE `status` = 'PUBLISHED';

UPDATE `Category`        SET `status` = 'Active'   WHERE `status` = 'ACTIVE';
UPDATE `Category`        SET `status` = 'Inactive' WHERE `status` = 'INACTIVE';
UPDATE `Category`        SET `status` = 'Active'   WHERE `status` = 'DRAFT';
UPDATE `Category`        SET `status` = 'Active'   WHERE `status` = 'PUBLISHED';

UPDATE `Faq`             SET `status` = 'Active'   WHERE `status` = 'ACTIVE';
UPDATE `Faq`             SET `status` = 'Inactive' WHERE `status` = 'INACTIVE';
UPDATE `Faq`             SET `status` = 'Active'   WHERE `status` = 'DRAFT';
UPDATE `Faq`             SET `status` = 'Active'   WHERE `status` = 'PUBLISHED';

UPDATE `Role`            SET `status` = 'Active'   WHERE `status` = 'ACTIVE';
UPDATE `Role`            SET `status` = 'Inactive' WHERE `status` = 'INACTIVE';
UPDATE `Role`            SET `status` = 'Active'   WHERE `status` = 'DRAFT';
UPDATE `Role`            SET `status` = 'Active'   WHERE `status` = 'PUBLISHED';

UPDATE `ServiceCategory` SET `status` = 'Active'   WHERE `status` = 'ACTIVE';
UPDATE `ServiceCategory` SET `status` = 'Inactive' WHERE `status` = 'INACTIVE';
UPDATE `ServiceCategory` SET `status` = 'Active'   WHERE `status` = 'DRAFT';
UPDATE `ServiceCategory` SET `status` = 'Active'   WHERE `status` = 'PUBLISHED';

UPDATE `Service`         SET `status` = 'Active'   WHERE `status` = 'ACTIVE';
UPDATE `Service`         SET `status` = 'Inactive' WHERE `status` = 'INACTIVE';
UPDATE `Service`         SET `status` = 'Active'   WHERE `status` = 'DRAFT';
UPDATE `Service`         SET `status` = 'Active'   WHERE `status` = 'PUBLISHED';

UPDATE `Testimonial`     SET `status` = 'Active'   WHERE `status` = 'ACTIVE';
UPDATE `Testimonial`     SET `status` = 'Inactive' WHERE `status` = 'INACTIVE';
UPDATE `Testimonial`     SET `status` = 'Active'   WHERE `status` = 'DRAFT';
UPDATE `Testimonial`     SET `status` = 'Active'   WHERE `status` = 'PUBLISHED';

UPDATE `User`            SET `status` = 'Active'   WHERE `status` = 'ACTIVE';
UPDATE `User`            SET `status` = 'Inactive' WHERE `status` = 'INACTIVE';
UPDATE `User`            SET `status` = 'Active'   WHERE `status` = 'DRAFT';
UPDATE `User`            SET `status` = 'Active'   WHERE `status` = 'PUBLISHED';

-- Step 2: Alter ENUM column definitions to only accept 'Active' and 'Inactive'

ALTER TABLE `Blog`            MODIFY `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active';
ALTER TABLE `Category`        MODIFY `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active';
ALTER TABLE `Faq`             MODIFY `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active';
ALTER TABLE `Role`            MODIFY `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active';
ALTER TABLE `ServiceCategory` MODIFY `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active';
ALTER TABLE `Service`         MODIFY `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active';
ALTER TABLE `Testimonial`     MODIFY `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active';
ALTER TABLE `User`            MODIFY `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active';
