import express from 'express';
import cors from 'cors';
import db from './db.js';  // your MySQL connection

const app = express();
app.use(cors());
app.use(express.json());

// Test route for MySQL
app.get('/test-db', (req, res) => {
  db.query('SELECT NOW() AS currentTime', (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Database connection failed.');
    }
    res.send(`✅ Database connected! Current time: ${results[0].currentTime}`);
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
