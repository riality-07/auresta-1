# AURESTA AI Agent

## Overview

The AURESTA AI Agent is a backend AI module designed to assist users with event planning and general AURESTA-related queries.

The agent can help users with event planning, vendors, packages, bookings, budgets, services, and other event-related requirements.

The AI Agent is implemented independently within the backend and can be extended with custom tools and platform services.

## Architecture

The AI Agent follows a modular backend architecture:

Frontend / API Request
        ↓
AI Controller
        ↓
AURESTA AI Agent
        ↓
AI Model
        ↓
Response

## Components

### agent.js

Handles communication with the AI model and executes the main agent logic.

### prompt.js

Contains the system instructions and behavioural guidelines for the AURESTA AI Agent.

### tools.js

Defines tools that can be made available to the AI agent for handling specific tasks.

## API Endpoint

POST `/api/ai/chat`

### Request

```json
{
  "message": "Help me plan a birthday party for 30 people."
}
### Response

```json
{
  "success": true,
  "response": "..."
}
