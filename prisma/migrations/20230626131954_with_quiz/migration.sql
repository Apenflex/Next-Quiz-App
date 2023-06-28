/*
  Warnings:

  - You are about to drop the column `correctAnswer` on the `QuizEntry` table. All the data in the column will be lost.
  - You are about to drop the column `difficulty` on the `QuizEntry` table. All the data in the column will be lost.
  - You are about to drop the column `incorrectAnswers` on the `QuizEntry` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `QuizEntry` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `QuizEntry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QuizEntry" DROP COLUMN "correctAnswer",
DROP COLUMN "difficulty",
DROP COLUMN "incorrectAnswers",
DROP COLUMN "question",
DROP COLUMN "type";

-- CreateTable
CREATE TABLE "Quiz" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "incorrectAnswers" TEXT[],
    "quizEntryId" TEXT NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Quiz_quizEntryId_idx" ON "Quiz"("quizEntryId");
