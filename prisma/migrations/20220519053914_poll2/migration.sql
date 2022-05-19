/*
  Warnings:

  - The primary key for the `Option` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `pollId` on the `Option` table. All the data in the column will be lost.
  - The primary key for the `Poll` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Poll` table. All the data in the column will be lost.
  - You are about to drop the column `userUser_id` on the `Poll` table. All the data in the column will be lost.
  - You are about to drop the column `optionId` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the column `pollId` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the column `userUser_id` on the `Vote` table. All the data in the column will be lost.
  - The required column `poll_id` was added to the `Option` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `poll_id` was added to the `Poll` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `user_id` to the `Poll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option_id` to the `Vote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poll_id` to the `Vote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_pollId_fkey";

-- DropForeignKey
ALTER TABLE "Poll" DROP CONSTRAINT "Poll_userUser_id_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_optionId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_pollId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_userUser_id_fkey";

-- AlterTable
ALTER TABLE "Option" DROP CONSTRAINT "Option_pkey",
DROP COLUMN "id",
DROP COLUMN "pollId",
ADD COLUMN     "poll_id" TEXT NOT NULL,
ADD CONSTRAINT "Option_pkey" PRIMARY KEY ("poll_id");

-- AlterTable
ALTER TABLE "Poll" DROP CONSTRAINT "Poll_pkey",
DROP COLUMN "id",
DROP COLUMN "userUser_id",
ADD COLUMN     "poll_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "Poll_pkey" PRIMARY KEY ("poll_id");

-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "optionId",
DROP COLUMN "pollId",
DROP COLUMN "userUser_id",
ADD COLUMN     "option_id" TEXT NOT NULL,
ADD COLUMN     "poll_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_poll_id_fkey" FOREIGN KEY ("poll_id") REFERENCES "Poll"("poll_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_poll_id_fkey" FOREIGN KEY ("poll_id") REFERENCES "Poll"("poll_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "Option"("poll_id") ON DELETE RESTRICT ON UPDATE CASCADE;
