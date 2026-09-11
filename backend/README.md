# AURESTA Backend

## Overview

The backend of AURESTA is responsible for handling server-side operations, processing application data, managing API requests, and supporting future database integration.

The backend is built using Node.js and Express.js.

---

## Current Features

- Express.js server setup
- CORS configuration
- JSON request handling
- Environment variable configuration
- Backend health-check API
- Modular folder structure for future development

---

## Project Structure

### config
Contains application and database configuration files.

### controllers
Contains the logic used to process requests and generate responses.

### middleware
Contains middleware functions for request processing, authentication, error handling, and other backend operations.

### models
Contains data models and schemas for future database integration.

### routes
Contains API route definitions.

### services
Contains business logic and reusable backend services.

### tests
Contains files used for backend testing.

### utils
Contains reusable utility and helper functions.

### validators
Contains request validation logic.

---

## Server

The backend server is configured in:

`server.js`

The server currently provides the following health-check endpoint:

`GET /api/health`

A successful response confirms that the backend server is running correctly.

---

## Environment Variables

The project uses a `.env` file for environment-specific configuration. Copy `.env.example` to `.env` and fill in real values:

```bash
cp backend/.env.example backend/.env
```

Example:

```env
PORT=5000
NODE_ENV=development
```

---

## Database Setup (PostgreSQL)

1. Get a PostgreSQL database. Either run one locally, or use a free hosted instance (e.g. [Neon](https://neon.tech) or [Supabase](https://supabase.com) — both give you a ready-to-use `DATABASE_URL` in seconds).
2. Paste that connection string into `backend/.env` as `DATABASE_URL`. If your host requires SSL (Neon/Supabase do), set `PGSSLMODE=require`.
3. Run the migration to create the tables:

```bash
npm run migrate
```

This executes `backend/config/schema.sql` against your database. It is safe to re-run (all statements use `IF NOT EXISTS`).

The connection pool lives in `backend/config/db.js` and is reused by every model.
