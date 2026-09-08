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

The project uses a `.env` file for environment-specific configuration.

Example:

```env
PORT=5000
NODE_ENV=development
