const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.json());

// Simple file database
const DB_FILE = 'database.json';
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ users: [] }));
}

// Helper to read database
function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE));
}

// Helper to save database
function saveDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data));
}

// Test route
app.get('/', (req, res) => {
  res.send('Mental Health App is running!');
});

// Register a new user
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const db = readDB();

  // Check if user already exists
  const exists = db.users.find(u => u.email === email);
  if (exists) {
    return res.json({ message: 'User already exists' });
  }

  // Save new user
  db.users.push({ name, email, password });
  saveDB(db);
  res.json({ message: 'Account created successfully!' });
});

// Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const db = readDB();

  const user = db.users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.json({ message: 'Wrong email or password' });
  }

  res.json({ message: 'Login successful!', user: { name: user.name, email: user.email } });
});

// Start server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
