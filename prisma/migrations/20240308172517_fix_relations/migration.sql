/*
  Warnings:

  - You are about to drop the column `itemTypeId` on the `item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `Item_itemTypeId_fkey`;

-- AlterTable
ALTER TABLE `item` DROP COLUMN `itemTypeId`;
