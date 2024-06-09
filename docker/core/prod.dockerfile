# Installer stage: installs dependencies
FROM node:20-slim AS installer

WORKDIR /app

# Install pnpm globally
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Copy all needed package jsons from all workspaces
COPY ./pnpm-lock.yaml /app/pnpm-lock.yaml
COPY ./pnpm-workspace.yaml /app/pnpm-workspace.yaml
COPY ./package.json /app/package.json
COPY ./tsconfig.json /app/tsconfig.json
COPY ./apps/api/package.json /app/apps/api/package.json

ENV NODE_ENV production
RUN pnpm install

# Builder stage: builds the application
FROM node:20-slim AS builder

WORKDIR /app

# Copy all needed files
COPY --from=installer /app /app

# Install pnpm globally
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Install nestjs cli
RUN pnpm add -g @nestjs/cli

# Copy source files
COPY . /app

# Build the application (adjust according to your build command)
RUN pnpm run --prefix apps/api build

# Runner stage: prepares the final image
FROM node:20-slim AS runner

# Install OpenSSL
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

# Install pnpm globally
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Install nestjs cli
RUN pnpm add -g @nestjs/cli
RUN pnpm add -g prisma

# Copy all needed package jsons from all workspaces
COPY package.json /app/package.json
COPY pnpm-lock.yaml /app/pnpm-lock.yaml
COPY apps/api/package.json /app/apps/api/package.json

# Copy all needed files from all workspaces
COPY ./tsconfig.json /app/tsconfig.json
COPY apps/api/prisma /app/apps/api/prisma
COPY apps/api/tsconfig.json /app/apps/api/tsconfig.json

# Copy all needed node_modules from all workspaces
COPY --from=installer /app/apps/api/node_modules /app/apps/api/node_modules
COPY --from=installer /app/node_modules /app/node_modules

# Copy the build output from the builder stage
COPY --from=builder /app/apps/api/dist /app/apps/api/dist

# Generate prisma client
RUN cd apps/api && pnpm prisma generate

# Remove prisma seed
RUN rm -rf apps/api/prisma/seed

# Run the app in production mode
CMD pnpm run --prefix apps/api start
