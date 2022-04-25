-- DropForeignKey
ALTER TABLE "DailyMeals" DROP CONSTRAINT "DailyMeals_menu_id_fkey";

-- AlterTable
ALTER TABLE "DailyMeals" ALTER COLUMN "date" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "DailyMeals"("menu_id") ON DELETE RESTRICT ON UPDATE CASCADE;
