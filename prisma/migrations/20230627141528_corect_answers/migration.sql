/*
  Warnings:

  - You are about to drop the column `userAnswers` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "userAnswers";

-- AlterTable
ALTER TABLE "QuizEntry" ADD COLUMN     "userAnswers" TEXT[];
