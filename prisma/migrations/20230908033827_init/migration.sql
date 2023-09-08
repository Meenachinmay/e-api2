-- CreateTable
CREATE TABLE "TestPost" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "TestPost_pkey" PRIMARY KEY ("id")
);
