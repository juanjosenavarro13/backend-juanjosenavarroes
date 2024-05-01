-- CreateTable
CREATE TABLE "Portfolio_experience" (
    "id" SERIAL NOT NULL,
    "language" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "url" TEXT,

    CONSTRAINT "Portfolio_experience_pkey" PRIMARY KEY ("id")
);
