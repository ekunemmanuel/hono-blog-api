# Hono Blog API

A modern, type-safe blog API built with Hono, OpenAPI, and Prisma.

## Features

- 🚀 Built with [Hono](https://hono.dev/) for high-performance routing
- 📝 Type-safe API documentation with [@hono/zod-openapi](https://github.com/honojs/middleware/tree/main/packages/zod-openapi)
- 📚 Interactive API documentation with [@scalar/hono-api-reference](https://github.com/scalar/scalar/tree/main/packages/hono-api-reference)
- 📊 Database management with [Prisma](https://www.prisma.io/)
- 🔍 Structured logging with [pino](https://getpino.io/) / [hono-pino](https://www.npmjs.com/package/hono-pino)
- ✨ Type-safe schemas and environment variables with [zod](https://zod.dev/)
- 🧪 Testing with [vitest](https://vitest.dev/)
- 🎨 Code formatting and linting with [@antfu/eslint-config](https://github.com/antfu/eslint-config)

## Prerequisites

- Node.js (v18 or higher)
- Bun (for development)
- A database (configured in your .env file)

## Setup

1. Clone the repository:
```bash
git clone https://github.com/ekunemmanuel/hono-blog-api.git
cd hono-blog-api
```

2. Install dependencies:
```bash
bun install
```

3. Set up your environment variables:
```bash
cp .env.example .env
```
Edit the `.env` file with your database credentials and other configuration.

4. Set up the database:
```bash
bunx prisma generate
bunx prisma db push
```

## Development

Start the development server:
```bash
bun run dev
```

The API will be available at `http://localhost:3000`

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build the project
- `bun run start` - Start production server
- `bun run test` - Run tests
- `bun run lint` - Run linter
- `bun run lint:fix` - Fix linting issues
- `bun run typecheck` - Run TypeScript type checking

## API Documentation

- OpenAPI Specification: `http://localhost:3000/doc`
- Interactive API Documentation: `http://localhost:3000/reference`

## Project Structure

```
src/
├── app.ts              # Main application setup
├── index.ts           # Application entry point
├── env.ts             # Environment configuration
├── db/                # Database configuration
├── lib/               # Shared utilities
├── middlewares/       # Custom middleware
└── routes/            # API routes
    ├── articles/      # Article-related endpoints
    └── index.route.ts # Route configuration
```

## License

MIT
