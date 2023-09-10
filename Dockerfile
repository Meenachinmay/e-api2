# ---- Builder Stage ----
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

RUN npm install -g typescript @nestjs/cli

COPY package*.json ./

RUN npm install

COPY . .

# Generate Prisma Client
RUN npx prisma generate

RUN npm run build

# ---- Production Stage ----
FROM node:18-alpine as production

WORKDIR /usr/src/app

# Copy only production node_modules
COPY --from=builder /usr/src/app/package*.json ./
RUN npm ci --only=production

# Copy compiled JavaScript code
COPY --from=builder /usr/src/app/dist ./dist

# Copy generated Prisma Client
# COPY --from=builder /usr/src/app/node_modules/.prisma ./
COPY --from=builder /usr/src/app/node_modules/@prisma/client /usr/src/app/node_modules/@prisma/client
COPY --from=builder /usr/src/app/prisma ./prisma


# Copy other required files and set production environment
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENV DATABASE_URL='postgres://oeapi:BEBe02JFAnVH7Yjg0aOc69k0EZ5b5p3t@dpg-cju5nc7hdsdc738ss7ig-a.oregon-postgres.render.com/db_hm19'

ENTRYPOINT ["docker-entrypoint.sh"]