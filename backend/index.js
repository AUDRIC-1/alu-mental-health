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
// Save a mental health check-in
app.post('/checkin', (req, res) => {
  const { email, mood, feeling, sleep } = req.body;
  const db = readDB();

  // Add checkins array if it doesn't exist
  if (!db.checkins) db.checkins = [];

  // Save the checkin
  db.checkins.push({ email, mood, feeling, sleep, date: new Date().toLocaleDateString() });
  saveDB(db);

  // Give feedback based on mood
  let feedback = '';
  if (mood <= 3) {
    feedback = 'It seems you are having a tough time. Please consider talking to a counselor.';
  } else if (mood <= 7) {
    feedback = 'You are doing okay! Keep using the resources available to you.';
  } else {
    feedback = 'You are doing great! Keep it up! 🎉';
  }

  res.json({ message: 'Check-in saved!', feedback });
});
// Book a counseling session
app.post('/booking', (req, res) => {
  const { email, date, reason } = req.body;
  const db = readDB();

  // Add bookings array if it doesn't exist
  if (!db.bookings) db.bookings = [];

  // Save the booking
  db.bookings.push({ email, date, reason, status: 'pending' });
  saveDB(db);

  res.json({ message: 'Session requested successfully! A counselor will get back to you.' });
});

// Start server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
