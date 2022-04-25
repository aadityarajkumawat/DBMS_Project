-- CreateTable
CREATE TABLE "Consumer" (
    "c_id" TEXT NOT NULL,
    "mail_id" VARCHAR(100) NOT NULL,
    "password" TEXT NOT NULL,
    "f_name" VARCHAR(70) NOT NULL,
    "m_name" VARCHAR(70),
    "l_name" VARCHAR(70),
    "c_type" VARCHAR(70) NOT NULL,

    CONSTRAINT "Consumer_pkey" PRIMARY KEY ("c_id")
);

-- CreateTable
CREATE TABLE "DailyMeals" (
    "menu_id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "day" VARCHAR(15) NOT NULL,

    CONSTRAINT "DailyMeals_pkey" PRIMARY KEY ("menu_id")
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
    "dinner" VARCHAR(200) NOT NULL,
    "date" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MessStaff" (
    "staff_id" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "MessStaff_pkey" PRIMARY KEY ("staff_id")
);

-- CreateTable
CREATE TABLE "MealsSkipped" (
    "meal_skipped_id" TEXT NOT NULL,
    "c_id" TEXT NOT NULL,
    "meal_type" VARCHAR(3) NOT NULL,
    "skip_date" TEXT NOT NULL,

    CONSTRAINT "MealsSkipped_pkey" PRIMARY KEY ("meal_skipped_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wastage_meal_type_date_key" ON "Wastage"("meal_type", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Menu_menu_id_breakfast_lunch_key" ON "Menu"("menu_id", "breakfast", "lunch");

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "DailyMeals"("menu_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealsSkipped" ADD CONSTRAINT "MealsSkipped_c_id_fkey" FOREIGN KEY ("c_id") REFERENCES "Consumer"("c_id") ON DELETE RESTRICT ON UPDATE CASCADE;
