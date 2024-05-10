-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "stack" TEXT,
    "country" TEXT,
    "candidates" TEXT,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Job_url_key" ON "Job"("url");
