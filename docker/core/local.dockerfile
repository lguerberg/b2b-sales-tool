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

ENV NODE_ENV development
RUN pnpm install

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

# Generate prisma client
RUN pnpm prisma generate

# Run the app in development mode
CMD pnpm run --prefix apps/api dev
