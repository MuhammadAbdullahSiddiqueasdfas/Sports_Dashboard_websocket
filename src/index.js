import express from 'express';
import { createServer } from 'http';
import { createWebSocketServer } from './ws/server.js';
import { createMatchesRouter } from './routes/matches.js';

const app = express();
const PORT = 8000;

// Use JSON middleware
app.use(express.json());

// Root GET route
app.get('/', (req, res) => {
  res.send('Welcome to the Sports Dashboard!');
});

const server = createServer(app);
const { broadcast } = createWebSocketServer(server);
const matchesRouter = createMatchesRouter({ broadcast });
app.use('/matches', matchesRouter);

// Start the HTTP + WebSocket server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`WebSocket endpoint: ws://localhost:${PORT}/ws`);
});
