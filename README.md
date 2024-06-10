# B2B Sales App - Silver.dev Challenge

This project is a B2B Sales App Dashboard designed for BDRs. It leverages pnpm workspaces for efficient package management.

## Prerequisites
Ensure you have Docker and Docker Compose installed on your system.

## Setup and Run

### Install Dependencies
In the root folder, run:
```bash
pnpm install
```

### Running API
Before running the API, you need to create a `.env` file in the `apps/api` directory.

1. Navigate to `apps/api`.
2. Create a file named `.env`.
3. Use `.env.example` as base secrets.
4. Run `pnpm api:dev` to run the project.
5. Run `pnpm:api:down` when you are not using it anymore.

### Seeding the database
Run `pnpm seed` to seed your local database. 
Keep in mind that you need to change the `DATABASE_URL` env variable to point to localhost.

### Running APP
Before running the APP, you need to create a `.env` file in the `apps/app` directory.

1. Navigate to `apps/app`.
2. Create a file named `.env`.
3. Use `.env.example` as base secrets.
4. Run `pnpm app:dev` to run the project.

