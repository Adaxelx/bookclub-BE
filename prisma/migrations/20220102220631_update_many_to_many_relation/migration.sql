/*
  Warnings:

  - You are about to drop the `_BookGroupToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BookGroupToUser" DROP CONSTRAINT "_BookGroupToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookGroupToUser" DROP CONSTRAINT "_BookGroupToUser_B_fkey";

-- DropTable
DROP TABLE "_BookGroupToUser";

-- CreateTable
CREATE TABLE "BookGroupsToUsers" (
    "bookGroupId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "BookGroupsToUsers_pkey" PRIMARY KEY ("userId","bookGroupId")
);

-- AddForeignKey
ALTER TABLE "BookGroupsToUsers" ADD CONSTRAINT "BookGroupsToUsers_bookGroupId_fkey" FOREIGN KEY ("bookGroupId") REFERENCES "BookGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookGroupsToUsers" ADD CONSTRAINT "BookGroupsToUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
