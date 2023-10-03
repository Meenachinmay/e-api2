-- CreateTable
CREATE TABLE "SavedEvent" (
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "SavedEvent_pkey" PRIMARY KEY ("userId","eventId")
);

-- CreateIndex
CREATE INDEX "SavedEvent_userId_idx" ON "SavedEvent"("userId");

-- CreateIndex
CREATE INDEX "SavedEvent_eventId_idx" ON "SavedEvent"("eventId");
