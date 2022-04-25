-- CreateTable
CREATE TABLE "Consumer" (
    "c_id" TEXT NOT NULL,
    "mail_id" VARCHAR(100) NOT NULL,
    "f_name" VARCHAR(70) NOT NULL,
    "m_name" VARCHAR(70),
    "l_name" VARCHAR(70),
    "c_type" VARCHAR(70) NOT NULL,

    PRIMARY KEY ("c_id")
);
