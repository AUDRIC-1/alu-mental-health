import React, { useState } from 'react';
import axios from 'axios';

const API = 'https://alu-mental-health.onrender.com';

function App() {
  const [page, setPage] = useState('home');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  // Register
  async function handleRegister(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const res = await axios.post(`${API}/register`, { name, email, password });
    setMessage(res.data.message);
  }

  // Login
  async function handleLogin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const res = await axios.post(`${API}/login`, { email, password });
    setMessage(res.data.message);
    if (res.data.user) {
      setUserEmail(res.data.user.email);
      setLoggedIn(true);
      setPage('checkin');
    }
  }

  // Check-in
  async function handleCheckin(e) {
    e.preventDefault();
    const mood = e.target.mood.value;
    const feeling = e.target.feeling.value;
    const sleep = e.target.sleep.value;
    const res = await axios.post(`${API}/checkin`, { email: userEmail, mood, feeling, sleep });
    setFeedback(res.data.feedback);
  }

  // Booking
  async function handleBooking(e) {
    e.preventDefault();
    const date = e.target.date.value;
    const reason = e.target.reason.value;
    const res = await axios.post(`${API}/booking`, { email: userEmail, date, reason });
    setMessage(res.data.message);
  }

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', background: '#f0f4f8', minHeight: '100vh', padding: '20px' }}>

      {/* Header */}
      <div style={{ background: '#4CAF50', padding: '20px', borderRadius: '10px', marginBottom: '20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', margin: 0 }}>🌿 ALU Mental Health Support</h1>
        <p style={{ color: 'white', margin: '5px 0 0' }}>A safe and private space for ALU students</p>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => setPage('home')} style={navBtn}>Home</button>
        <button onClick={() => setPage('register')} style={navBtn}>Register</button>
        <button onClick={() => setPage('login')} style={navBtn}>Login</button>
        {loggedIn && <button onClick={() => setPage('checkin')} style={navBtn}>Check-in</button>}
        {loggedIn && <button onClick={() => setPage('resources')} style={navBtn}>Resources</button>}
        {loggedIn && <button onClick={() => setPage('booking')} style={navBtn}>Book Counselor</button>}
      </div>

      {/* Card */}
      <div style={{ background: 'white', borderRadius: '10px', padding: '30px', maxWidth: '500px', margin: 'auto', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>

        {/* Message */}
        {message && (
          <p style={{ background: '#e8f5e9', color: '#2e7d32', padding: '10px', borderRadius: '5px', textAlign: 'center' }}>
            {message}
          </p>
        )}

        {/* Home Page */}
        {page === 'home' && (
          <div style={{ textAlign: 'center' }}>
            <h2>Welcome 👋</h2>
            <p>This platform helps ALU students manage their mental health through check-ins, resources, peer support, and counseling connections.</p>
            <button onClick={() => setPage('register')} style={greenBtn}>Get Started</button>
          </div>
        )}

        {/* Register Page */}
        {page === 'register' && (
          <form onSubmit={handleRegister}>
            <h2 style={{ textAlign: 'center' }}>Create Account</h2>
            <input name="name" placeholder="Your Name" style={inputStyle} />
            <input name="email" placeholder="Email" style={inputStyle} />
            <input name="password" placeholder="Password" type="password" style={inputStyle} />
            <button type="submit" style={greenBtn}>Register</button>
          </form>
        )}

        {/* Login Page */}
        {page === 'login' && (
          <form onSubmit={handleLogin}>
            <h2 style={{ textAlign: 'center' }}>Login</h2>
            <input name="email" placeholder="Email" style={inputStyle} />
            <input name="password" placeholder="Password" type="password" style={inputStyle} />
            <button type="submit" style={greenBtn}>Login</button>
          </form>
        )}

        {/* Check-in Page */}
        {page === 'checkin' && (
          <form onSubmit={handleCheckin}>
            <h2 style={{ textAlign: 'center' }}>Daily Check-in 🧠</h2>
            <p style={{ textAlign: 'center', color: '#666' }}>How are you feeling today?</p>
            <label>Mood (1-10)</label>
            <input name="mood" type="number" min="1" max="10" placeholder="Rate your mood" style={inputStyle} />
            <label>How are you feeling?</label>
            <select name="feeling" style={inputStyle}>
              <option>Happy</option>
              <option>Anxious</option>
              <option>Sad</option>
              <option>Stressed</option>
              <option>Tired</option>
              <option>Okay</option>
            </select>
            <label>Hours of sleep last night</label>
            <input name="sleep" type="number" min="0" max="24" placeholder="Hours of sleep" style={inputStyle} />
            <button type="submit" style={greenBtn}>Submit Check-in</button>
            {feedback && (
              <p style={{ background: '#e8f5e9', color: '#2e7d32', padding: '10px', borderRadius: '5px', marginTop: '15px', textAlign: 'center' }}>
                {feedback}
              </p>
            )}
          </form>
        )}

        {/* Resources Page */}
        {page === 'resources' && (
          <div>
            <h2 style={{ textAlign: 'center' }}>📚 Self-Help Resources</h2>
            <p style={{ color: '#666', textAlign: 'center' }}>Helpful articles and videos for your wellbeing</p>
            {[
              { title: 'How to manage stress as a student', link: 'https://www.mind.org.uk/information-support/types-of-mental-health-problems/stress/' },
              { title: 'Understanding anxiety and how to cope', link: 'https://www.helpguide.org/articles/anxiety/anxiety-disorders-and-anxiety-attacks.htm' },
              { title: 'Tips for better sleep', link: 'https://www.sleepfoundation.org/sleep-hygiene' },
              { title: 'Mindfulness and meditation for beginners', link: 'https://www.headspace.com/mindfulness' },
              { title: 'How to talk about mental health', link: 'https://www.mentalhealth.org.uk/explore-mental-health/a-z-topics/talking-about-mental-health' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#f0f4f8', borderRadius: '8px', padding: '15px', marginBottom: '10px' }}>
                <a href={item.link} target="_blank" rel="noreferrer" style={{ color: '#4CAF50', fontWeight: 'bold', textDecoration: 'none' }}>
                  📖 {item.title}
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Booking Page */}
        {page === 'booking' && (
          <form onSubmit={handleBooking}>
            <h2 style={{ textAlign: 'center' }}>📅 Book a Counselor</h2>
            <p style={{ textAlign: 'center', color: '#666' }}>Request a session with an ALU counselor</p>
            <label>Preferred Date</label>
            <input name="date" type="date" style={inputStyle} />
            <label>Reason for booking</label>
            <textarea name="reason" placeholder="Briefly describe what you would like to talk about" style={{ ...inputStyle, height: '100px' }} />
            <button type="submit" style={greenBtn}>Request Session</button>
          </form>
        )}

      </div>
    </div>
  );
}

const navBtn = {
  padding: '10px 20px',
  background: 'white',
  border: '2px solid #4CAF50',
  borderRadius: '5px',
  cursor: 'pointer',
  color: '#4CAF50',
  fontWeight: 'bold'
};

const greenBtn = {
  width: '100%',
  padding: '12px',
  background: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  marginTop: '10px'
};

const inputStyle = {
  display: 'block',
  width: '100%',
  marginBottom: '15px',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '14px',
  boxSizing: 'border-box'
};

export default App;
