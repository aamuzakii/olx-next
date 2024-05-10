-- CreateTable
CREATE TABLE "House" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "price" INTEGER,
    "Published" TIMESTAMP(3),
    "Deleted" BOOLEAN,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "House_url_key" ON "House"("url");
