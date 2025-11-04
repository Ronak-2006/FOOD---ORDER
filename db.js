// db.js
import mysql from 'mysql2';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create the MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,        // e.g., 'localhost'
  user: process.env.DB_USER,        // e.g., 'root'
  password: process.env.DB_PASSWORD, // your MySQL password
  database: process.env.DB_NAME      // e.g., 'my_database'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('❌ Database connection failed:', err.stack);
    return;
  }

  console.log('✅ Connected to MySQL as ID', db.threadId);
});

// Optional: handle unexpected disconnects gracefully
db.on('error', err => {
  console.error('⚠️ MySQL error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('🔄 Reconnecting to database...');
    // Optionally recreate the connection here
  } else {
    throw err;
  }
});

export default db;


