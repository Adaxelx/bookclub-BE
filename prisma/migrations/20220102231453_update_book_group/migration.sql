/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `BookGroup` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BookGroup_name_key" ON "BookGroup"("name");
