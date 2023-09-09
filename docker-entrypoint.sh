#!/bin/sh

echo "Running migrations..."

# Run migrations for development
npx prisma migrate dev --name init --preview-feature

echo "Ran the migrations"

# Start your application
npm run start:dev