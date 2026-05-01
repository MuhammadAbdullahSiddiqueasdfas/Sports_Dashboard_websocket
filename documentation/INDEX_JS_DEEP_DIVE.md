# Deep Dive: `src/index.js`

The `index.js` file is the **entry point** of our application. It sets up the environment, configures the server, and connects all the different pieces (routes, security, websockets).

## Line-by-Line Breakdown:

### 1. Imports (Lines 1-6)
We import the necessary frameworks:
- `express`: For handling HTTP requests.
- `http`: To create a base server that both Express and WebSockets can share.
- `matchesRouter` & `commentaryRouter`: These are our modular API handlers.
- `attachWebSocketServer`: Our custom function to handle real-time updates.
- `securityMiddleware`: Our Arcjet-powered protection.

### 2. Port & Host Configuration (Lines 8-13)
The code looks for a `PORT` in your `.env` file. If it doesn't find one, it defaults to `8000`. This makes the code flexible for local testing or cloud deployment.

### 3. App Initialization (Lines 14-18)
- `const app = express()`: Creates the Express application.
- `app.use(express.json())`: A "middleware" that allows our server to understand JSON data sent in the body of requests.
- `const server = http.createServer(app)`: Wraps our Express app in a standard HTTP server.

### 4. Middleware & Routes (Lines 20-27)
- `app.get("/")`: A simple "Hello World" route to check if the server is alive.
- `app.use(securityMiddleware())`: Every request to our API must first pass through Arcjet security.
- `app.use("/matches", ...)`: Directs all traffic starting with `/matches` to our matches logic.

### 5. WebSocket Integration (Lines 29-31)
This is where the magic happens:
- We call `attachWebSocketServer(server)` to start listening for WebSocket connections.
- We save the `broadcast` functions into `app.locals`. This allows our Express routes (like `matches.js`) to call these functions whenever a new goal or match is created!

### 6. Starting the Server (Lines 33-38)
Finally, `server.listen` tells the server to start accepting connections. It logs the URLs to the terminal so you know exactly where to connect.
