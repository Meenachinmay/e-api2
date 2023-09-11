import { AppEvent } from './event.type';

export type Comment = {
  id: number;
  content: string;
  rating: number;
  eventId: number;
  event: AppEvent;
  createdAt?: Date; // optional if you're not using it in your app
};
