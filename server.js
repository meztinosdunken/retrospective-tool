const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// Initialize the Express application
const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

const PORT = process.env.PORT || 3000;

// Check MongoDB URI
if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is not set in the environment variables');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error(err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to the Retrospective Tool API!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});