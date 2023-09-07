#!/bin/sh

# Run migrations for development
npx prisma migrate dev --name init

# Start your application
npm run start:dev

