/*
  Warnings:

  - You are about to drop the column `itemEntryid` on the `item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `Item_itemTypeId_fkey`;

-- AlterTable
ALTER TABLE `item` DROP COLUMN `itemEntryid`,
    MODIFY `itemTypeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_itemTypeId_fkey` FOREIGN KEY (`itemTypeId`) REFERENCES `ItemType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
