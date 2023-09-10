# Development stage
# FROM node:18-alpine as development

# WORKDIR /usr/src/app

# RUN npm install -g typescript @nestjs/cli

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npx prisma generate

# RUN npx prisma migrate deploy --preview-feature

# # Copy the entrypoint script into the image
# #COPY docker-entrypoint.sh /usr/local/bin/

# # Make the script executable
# #RUN chmod +x /usr/local/bin/docker-entrypoint.sh
# #RUN chmod +x docker-entrypoint.sh

# # Development runtime command
# #ENTRYPOINT ["docker-entrypoint.sh"]

# CMD [ "npm", "start" ]


# Base stage for both development and production
FROM node:18-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

# Development stage
FROM base AS development
RUN npm install -g typescript @nestjs/cli
RUN npx prisma generate
CMD ["npm", "run", "start:dev"]

# Build stage for production
FROM base AS build
RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /usr/src/app
COPY package*.json ./
# Install only production dependencies
RUN npm install --only=production
# Copy built app from the build stage
COPY --from=build /usr/src/app/dist ./dist
# Generate Prisma Client
RUN npx prisma generate
CMD ["npm", "start"]
