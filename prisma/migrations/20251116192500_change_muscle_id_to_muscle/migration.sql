/*
  Warnings:

  - You are about to drop the column `muscleId` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `comment` on the `ExerciseRecord` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `ExerciseRecord` table. All the data in the column will be lost.
  - You are about to drop the `Muscle` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `muscle` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_muscleId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "muscleId",
ADD COLUMN     "muscle" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ExerciseRecord" DROP COLUMN "comment",
DROP COLUMN "weight";

-- DropTable
DROP TABLE "Muscle";
