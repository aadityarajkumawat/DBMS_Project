-- DropForeignKey
ALTER TABLE "DailyMeals" DROP CONSTRAINT "DailyMeals_menu_id_fkey";

-- DropForeignKey
ALTER TABLE "MealsSkipped" DROP CONSTRAINT "MealsSkipped_c_id_fkey";

-- AddForeignKey
ALTER TABLE "DailyMeals" ADD CONSTRAINT "DailyMeals_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "Menu"("menu_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealsSkipped" ADD CONSTRAINT "MealsSkipped_c_id_fkey" FOREIGN KEY ("c_id") REFERENCES "Consumer"("c_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "Menu.menu_id_unique" RENAME TO "Menu_menu_id_key";

-- RenameIndex
ALTER INDEX "Wastage.meal_type_date_unique" RENAME TO "Wastage_meal_type_date_key";
