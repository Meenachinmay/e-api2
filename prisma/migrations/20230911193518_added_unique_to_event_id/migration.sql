/*
  Warnings:

  - The `images` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tags` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `activities` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `omiyage` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `snsLinks` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[id]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "images",
ADD COLUMN     "images" JSONB,
DROP COLUMN "tags",
ADD COLUMN     "tags" JSONB,
DROP COLUMN "activities",
ADD COLUMN     "activities" JSONB,
DROP COLUMN "omiyage",
ADD COLUMN     "omiyage" JSONB,
DROP COLUMN "snsLinks",
ADD COLUMN     "snsLinks" JSONB;

-- CreateIndex
CREATE UNIQUE INDEX "Event_id_key" ON "Event"("id");
