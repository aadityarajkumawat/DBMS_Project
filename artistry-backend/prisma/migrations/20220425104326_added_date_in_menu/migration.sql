/*
  Warnings:

  - Added the required column `date` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "date" TEXT NOT NULL;
