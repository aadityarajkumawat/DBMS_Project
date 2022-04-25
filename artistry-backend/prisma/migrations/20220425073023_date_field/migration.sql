/*
  Warnings:

  - A unique constraint covering the columns `[menu_id,breakfast,lunch]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Menu_menu_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Menu_menu_id_breakfast_lunch_key" ON "Menu"("menu_id", "breakfast", "lunch");
