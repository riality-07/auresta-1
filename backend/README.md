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
- PostgreSQL database (users table) with a migration runner
- Email/password authentication (signup, login) with bcrypt + JWT
- Google Sign-In (verifies Google ID tokens server-side)
- Security headers (helmet), rate limiting on auth routes

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

---

## Authentication API

| Method | Route              | Auth required | Description                          |
| ------ | ------------------ | -------------- | ------------------------------------- |
| POST   | `/api/auth/signup`  | No             | Create an account with name/email/password |
| POST   | `/api/auth/login`   | No             | Log in with email/password, returns a JWT |
| POST   | `/api/auth/google`  | No             | Log in/sign up with a Google ID token, returns a JWT |
| GET    | `/api/auth/me`      | Yes (Bearer token) | Returns the currently authenticated user |

Successful signup/login/google responses look like:

```json
{ "success": true, "token": "<jwt>", "user": { "id": "...", "name": "...", "email": "...", "role": "consumer" } }
```

Send the token back on subsequent requests as `Authorization: Bearer <jwt>`.

### Setting up Google Sign-In

1. Go to the [Google Cloud Console](https://console.cloud.google.com/apis/credentials) and create a project (if you don't have one).
2. **Credentials → Create Credentials → OAuth Client ID → Application type: Web application.**
3. Under **Authorized JavaScript origins**, add the URL the frontend is served from (e.g. `http://localhost:5500` or your deployed domain).
4. Copy the generated Client ID (ends in `.apps.googleusercontent.com`).
5. Paste it into `backend/.env` as `GOOGLE_CLIENT_ID`.
6. Paste the same Client ID into `index.html`, replacing `window.AURESTA_GOOGLE_CLIENT_ID`.

The frontend never sees a Google client secret — only the ID token from Google's Identity Services button, which the backend verifies against Google's servers before issuing its own JWT.

### Running locally end-to-end

```bash
cp backend/.env.example backend/.env   # fill in DATABASE_URL, JWT_SECRET, GOOGLE_CLIENT_ID
npm install
npm run migrate                        # creates the users table
npm run dev                            # starts the API on http://localhost:5000
```

Then open `index.html` (e.g. via VS Code's Live Server) and update `window.AURESTA_API_BASE_URL` if the backend isn't on `localhost:5000`.
