/*
  Warnings:

  - Added the required column `title` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nick_name` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `posts` ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `profile` ADD COLUMN `nick_name` VARCHAR(191) NOT NULL;
