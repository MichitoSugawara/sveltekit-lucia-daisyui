# sveltekit-lucia-daisyui

## Quick setup dev environment

### Using devcontainer

1. Open devcontainer
2. Run `$ cp .env.devcontainer .env` to set environment variables
3. Run `$ pnpm run init` to resolve project dependencies and create the database
4. Run `$ pnpm run dev` to execute this app

### Using compose file (DB container only)

1. Run `$ docker-compose up -d` to up DB container.
2. Run `$ cp .env.devcontainer .env` to set environment variables
3. Run `$ pnpm run init` to resolve project dependencies and create the database
4. Run `$ pnpm run dev` to execute this app
