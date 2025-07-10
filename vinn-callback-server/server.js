const express = require('express');
const app = express();
const port = 3000;

// Middlewares
app.use(express.json());

// Routes
const callbackRoute = require('./routes/callback');
app.use('/api', callbackRoute);

// Server Start
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});