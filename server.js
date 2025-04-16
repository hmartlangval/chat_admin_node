require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const fs = require('fs');

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-hashes'", "https://cdn.jsdelivr.net", "https://cdn.socket.io"],
      scriptSrcAttr: ["'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
      connectSrc: ["'self'", "wss:", "ws:", "https:", "http:"],
      imgSrc: ["'self'", "data:"],
      fontSrc: ["'self'", "https://cdn.jsdelivr.net"]
    }
  }
}));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Socket.IO - simplified configuration
const io = new Server(server);

// Routes - API
app.use('/api/status', require('./routes/api/status'));
app.use('/api/items', require('./routes/api/items'));
app.use('/api/items', require('./routes/api/items/id'));

// Routes - Pages
app.use('/', require('./routes/pages/index'));
app.use('/health', require('./routes/pages/health'));
app.use('/admin', require('./routes/pages/admin'));
app.use('/admin/services', require('./routes/pages/admin/services'));
app.use('/admin/users', require('./routes/pages/admin/users'));
app.use('/admin/settings', require('./routes/pages/admin/settings'));

// Socket.IO event handlers
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  socket.on('message', (data) => {
    console.log('Message received:', data);
    io.emit('message', data); // Broadcast to all clients
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Log all Socket.IO errors
io.engine.on("connection_error", (err) => {
  console.log('Socket.IO connection error:');
  console.log(err.req);      // the request object
  console.log(err.code);     // the error code, for example 1
  console.log(err.message);  // the error message, for example "Session ID unknown"
  console.log(err.context);  // some additional error context
});

// Fallback route - serve the frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Port configuration (default 3000 but can be changed via env var)
const PORT = process.env.PORT || 3000;

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Socket.IO is available at: ${PORT}/socket.io/socket.io.js`);
});

// For IIS integration - add instructions for URL Rewrite module in IIS
// See README.md for details on configuring IIS to proxy requests to this app 