// db.js
import mysql from 'mysql2';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create the MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,     // e.g., 'localhost'
  user: process.env.DB_USER,     // e.g., 'root'
  password: process.env.DB_PASSWORD, // your MySQL password
  database: process.env.DB_NAME  // e.g., 'my_database'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('❌ Database connection failed:', err.stack);
    return;
  }
  console.log('✅ Connected to MySQL as ID', db.threadId);
});

export default db;
