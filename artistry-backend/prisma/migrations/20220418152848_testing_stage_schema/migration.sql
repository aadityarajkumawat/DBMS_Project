-- CreateTable
CREATE TABLE "DailyMeals" (
    "menu_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "day" VARCHAR(15) NOT NULL,

    PRIMARY KEY ("menu_id")
);

-- CreateTable
CREATE TABLE "Wastage" (
    "meal_type" VARCHAR(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "total_wastage" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "Menu" (
    "menu_id" TEXT NOT NULL,
    "breakfast" VARCHAR(200) NOT NULL,
    "lunch" VARCHAR(200) NOT NULL,
    "snacks" VARCHAR(200) NOT NULL,
    "dinner" VARCHAR(200) NOT NULL
);

-- CreateTable
CREATE TABLE "MessStaff" (
    "staff_id" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    PRIMARY KEY ("staff_id")
);

-- CreateTable
CREATE TABLE "MealsSkipped" (
    "meal_skipped_id" TEXT NOT NULL,
    "c_id" TEXT NOT NULL,
    "meal_type" VARCHAR(3) NOT NULL,
    "skip_date" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("meal_skipped_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wastage.meal_type_date_unique" ON "Wastage"("meal_type", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Menu.menu_id_unique" ON "Menu"("menu_id");

-- AddForeignKey
ALTER TABLE "DailyMeals" ADD FOREIGN KEY ("menu_id") REFERENCES "Menu"("menu_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealsSkipped" ADD FOREIGN KEY ("c_id") REFERENCES "Consumer"("c_id") ON DELETE CASCADE ON UPDATE CASCADE;
