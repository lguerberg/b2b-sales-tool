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

To run the project.
```bash
pnpm api:dev
```

When you are not using it anymore.
```bash
pnpm api:down
```

### Seeding the database
Run `pnpm seed` to seed your local database. 
Keep in mind that you need to change the `DATABASE_URL` env variable to point to localhost.

### Running APP
Before running the APP, you need to create a `.env` file in the `apps/app` directory.

1. Navigate to `apps/app`.
2. Create a file named `.env`.
3. Use `.env.example` as base secrets.

To run the project.
```bash
pnpm app:dev
```

## Project information

* [Tech documentation](https://www.notion.so/Tech-b830771c75b94393b7636d35b86a9ab3)
* [Product documentation](https://www.notion.so/Product-6b602039b30447329e58e7f147ed2199)
* [Demo walktrough](https://www.notion.so/Demo-a4c84e8cb6794538a67ea75fd14928f2)



