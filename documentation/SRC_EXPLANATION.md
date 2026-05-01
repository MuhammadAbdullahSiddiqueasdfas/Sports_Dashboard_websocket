# Detailed `src` Folder Explanation

The `src` directory contains the core logic of the application. Here is a breakdown of each file and its responsibility.

## 1. `src/index.js` (The Heart)
- **Role**: Starts the HTTP server and the WebSocket server.
- **Key Logic**:
  - Connects to the database.
  - Sets up Express middleware (JSON, Arcjet).
  - Mounts routes (`/matches`, `/commentary`).
  - Broadcasts events to WebSockets when a new match or commentary is created.

## 2. `src/db/` (The Database)
- **`schema.js`**: Defines the "blueprint" of our data. It uses Drizzle to describe the `matches` and `commentary` tables, including their columns (id, sport, teams, score, etc.) and relationships.
- **`db.js`**: Initializes the connection to PostgreSQL using `node-postgres` (Pool). It exports a `db` object we use to run queries.

## 3. `src/routes/` (The Endpoints)
- **`matches.js`**: 
  - `GET /matches`: Fetches a list of matches from the DB.
  - `POST /matches`: Creates a new match, validates it with Zod, and broadcasts it to WebSocket clients.
- **`commentary.js`**:
  - `GET /matches/:id/commentary`: Fetches all commentary items for a specific match.
  - `POST /matches/:id/commentary`: Adds a new live event (like a goal) and broadcasts it to subscribed WebSocket clients.

## 4. `src/ws/` (Real-time)
- **`server.js`**: 
  - Manages WebSocket connections.
  - Implements **Subscriptions**: Clients can send a message like `{"type": "subscribe", "matchId": 4}` to only receive updates for a specific match.
  - Handles "Cleanup": When a user disconnects, it removes them from all subscription lists.

## 5. `src/validation/` (The Gatekeeper)
- **`matches.js` & `commentary.js`**: Contain Zod schemas. These schemas ensure that if someone sends a request to our API, the data is exactly what we expect (e.g., `minute` must be a positive integer).

## 6. `src/utils/` (The Helpers)
- **`match-status.js`**: A smart helper that looks at the `startTime` and `endTime` of a match and automatically tells us if the match is "Scheduled", "Live", or "Finished".

## 7. `src/arcjet.js` (The Guard)
- **Role**: Configures the Arcjet security client. It defines rules for blocking bots and limiting how fast users can hit our API to prevent abuse.
