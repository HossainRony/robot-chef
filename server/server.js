require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.JWT_SECRET || 'your_default_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
const userRoutes = require('./routes/user');
const recipeRoutes = require('./routes/recipes');
app.use('/user', userRoutes);
app.use('/recipes', recipeRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server with error handling
const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Trying a different port...`);
    app.listen(port + 1, () => {
      console.log(`Server is running on port: ${port + 1}`);
    });
  } else {
    console.error('Server error:', err);
  }
});
