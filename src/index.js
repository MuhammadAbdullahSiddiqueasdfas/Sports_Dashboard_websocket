import express from 'express';
import { createServer } from 'http';
import { createWebSocketServer } from './ws/server.js';
import { createMatchesRouter } from './routes/matches.js';
import { securityMiddleware } from './arcjet.js';
import 'dotenv/config';


const PORT = Number(process.env.PORT||8000);
const HOST = process.env.HOST || '0.0.0.0';


const app = express();
const server = createServer(app);

// Use JSON middleware
app.use(express.json());

// Root GET route
app.get('/', (req, res) => {
  res.send('Welcome to the Sports Dashboard!');
});

app.use(securityMiddleware());

const { broadcast } = createWebSocketServer(server);
const matchesRouter = createMatchesRouter({ broadcast });
app.use('/matches', matchesRouter);


// Start the HTTP + WebSocket server
server.listen(PORT, () => {
  const baseUrl = HOST === '0.0.0.0' ? `http://localhost:${PORT}` : `http://${HOST}:${PORT}`;

  console.log(`Server running at ${baseUrl}`);
  console.log(`WebSocket endpoint: ${baseUrl.replace('http', 'ws')}/ws`);
});
