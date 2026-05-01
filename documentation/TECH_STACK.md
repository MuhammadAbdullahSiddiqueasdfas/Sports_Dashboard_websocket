# Technology Stack & Libraries

This project is a real-time Sports Dashboard built with modern web technologies. Below is a detailed explanation of each tool used and why it was chosen.

## 1. Core Runtime & Framework
- **Node.js**: The JavaScript runtime that allows us to run JavaScript on the server.
- **Express.js**: A minimal and flexible web application framework for Node.js. It handles our HTTP routes (like `/matches`).

## 2. Database Layer
- **PostgreSQL**: A powerful, open-source relational database. We use it to store matches, scores, and commentary.
- **Drizzle ORM**: A "TypeScript-first" Object Relational Mapper. It allows us to interact with the database using JavaScript objects instead of writing raw SQL strings, which prevents errors and provides type safety.
- **Drizzle Kit**: A CLI tool used for database migrations. It tracks changes in our `schema.js` and updates the database structure automatically.
- **pg (node-postgres)**: The low-level driver that allows Node.js to talk to the PostgreSQL database.

## 3. Real-time Communication
- **ws (WebSocket)**: A library that enables two-way communication between the server and the client. Unlike HTTP (where the client must ask for data), WebSockets allow the server to "push" updates (like a new goal) to the client instantly.

## 4. Security & Protection
- **Arcjet**: A security layer used for:
  - **Bot Detection**: Blocking malicious bots from scraping the dashboard.
  - **Rate Limiting**: Preventing a single user from making too many requests in a short time (e.g., to stop DDoS attacks).
  - **Shield**: Protecting against common web attacks.

## 5. Data Validation
- **Zod**: A schema declaration and validation library. We use it to ensure that data coming from users (like when creating a match) is in the correct format (e.g., scores must be numbers, teams must be strings).

## 6. Utilities & Development Tools
- **Dotenv**: Loads environment variables from a `.env` file into `process.env`. This keeps sensitive data like your Database URL out of the source code.
- **Nodemon**: A development tool that automatically restarts the server whenever you save a file.
- **tsx**: Allows us to run TypeScript or modern ES Modules in Node.js easily during development.
