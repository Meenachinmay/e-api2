export type AppEvent = {
  id: number;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  activities: string[];
  omiyage: string[];
  snsLinks: string[];
  city: string;
  prefecture: string;
  createdAt?: Date; // optional if you're not using it in your app
};
