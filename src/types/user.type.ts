import { UserRole } from '@prisma/client';

export type User = {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
};
