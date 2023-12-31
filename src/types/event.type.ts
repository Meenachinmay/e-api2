import { Prisma } from '@prisma/client';

export type AppEvent = {
  id: number;
  title: string;
  description: string;
  images: Prisma.JsonArray; // Changed from string[]
  tags: Prisma.JsonArray; // Update this if needed
  activities: Prisma.JsonArray; // Update this if needed
  omiyage: Prisma.JsonArray; // Update this if needed
  snsLinks: Prisma.JsonArray; // Update this if needed
  city: string;
  prefecture: string;
  comments?: Comment[];
  createdAt?: Date; // optional if you're not using it in your app
};
