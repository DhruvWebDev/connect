/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "VideoStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Editor" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Editor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Youtuber" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "hashedAccessCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Youtuber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "videoId" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "youtuberId" TEXT NOT NULL,
    "editorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "VideoStatus" NOT NULL DEFAULT 'NOT_STARTED',

    CONSTRAINT "Video_pkey" PRIMARY KEY ("videoId")
);

-- CreateTable
CREATE TABLE "EditedVideo" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "editorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EditedVideo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Editor_username_key" ON "Editor"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Editor_email_key" ON "Editor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Youtuber_username_key" ON "Youtuber"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Youtuber_email_key" ON "Youtuber"("email");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_youtuberId_fkey" FOREIGN KEY ("youtuberId") REFERENCES "Youtuber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_editorId_fkey" FOREIGN KEY ("editorId") REFERENCES "Editor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EditedVideo" ADD CONSTRAINT "EditedVideo_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("videoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EditedVideo" ADD CONSTRAINT "EditedVideo_editorId_fkey" FOREIGN KEY ("editorId") REFERENCES "Editor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
