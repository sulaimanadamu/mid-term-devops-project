const express = require('express');
const { Pool } = require('pg');
const app = express();

// Use environment variables set by Ansible/PM2
const pool = new Pool({
  host: process.env.DATABASE_HOST || 'localhost',
  user: process.env.DATABASE_USER || 'devops',
  password: process.env.DATABASE_PASSWORD || 'password',
  database: process.env.DATABASE_NAME || 'sharedappdb',
  port: process.env.DATABASE_PORT || 5432
});

// ... (rest of your app logic)
app.get('/', async (req, res) => {
  const result = await pool.query('SELECT name FROM devs');
  const names = result.rows.map(row => `<li>${row.name}</li>`).join('');
  res.send(`<h1>Node.js app with shared DB is up and running!</h1><ul>${names}</ul>`);
});

app.listen(3000, () => console.log('Node.js app listening on port 3000'));
