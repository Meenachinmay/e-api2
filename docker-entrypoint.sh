#!/bin/sh

echo "Running migrations..."

# Run migrations for development
# npx prisma migrate dev --name init --preview-feature
# npx prisma migrate deploy --preview-feature

echo "Ran the migrations"

# Start your application
npm run start:prod