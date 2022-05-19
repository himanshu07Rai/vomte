/*
  Warnings:

  - The primary key for the `Vote` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the column `option_id` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the `Option` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `option` to the `Vote` table without a default value. This is not possible if the table is not empty.
  - The required column `vote_id` was added to the `Vote` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_poll_id_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_option_id_fkey";

-- AlterTable
ALTER TABLE "Poll" ADD COLUMN     "options" TEXT[];

-- AlterTable
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_pkey",
DROP COLUMN "id",
DROP COLUMN "option_id",
ADD COLUMN     "option" TEXT NOT NULL,
ADD COLUMN     "vote_id" TEXT NOT NULL,
ADD CONSTRAINT "Vote_pkey" PRIMARY KEY ("vote_id");

-- DropTable
DROP TABLE "Option";
