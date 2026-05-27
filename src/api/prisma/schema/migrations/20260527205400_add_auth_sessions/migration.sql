CREATE TABLE `auth_session` (
  `id` VARCHAR(191) NOT NULL,
  `userId` INTEGER NOT NULL,
  `refreshTokenHash` VARCHAR(255) NOT NULL,
  `userAgent` VARCHAR(500) NULL,
  `ipAddress` VARCHAR(45) NULL,
  `expiresAt` DATETIME(3) NOT NULL,
  `revokedAt` DATETIME(3) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,

  INDEX `auth_session_userId_revokedAt_expiresAt_idx`(`userId`, `revokedAt`, `expiresAt`),
  INDEX `auth_session_expiresAt_idx`(`expiresAt`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `auth_session`
  ADD CONSTRAINT `auth_session_userId_fkey`
  FOREIGN KEY (`userId`) REFERENCES `user`(`id`)
  ON DELETE CASCADE ON UPDATE CASCADE;
