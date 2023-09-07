export enum UserRole {
  ADMIN,
  USER,
  EVENT_ORGRANIZER,
}

export type User = {
  name: string;
  email: string;
  password?: string;
};
