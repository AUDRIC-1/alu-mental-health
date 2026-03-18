import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [page, setPage] = useState('home');
  const [message, setMessage] = useState('');

  // Register function
  async function handleRegister(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await axios.post('http://localhost:5000/register', { name, email, password });
    setMessage(res.data.message);
  }

  // Login function
  async function handleLogin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await axios.post('http://localhost:5000/login', { email, password });
    setMessage(res.data.message);
  }

  return (
    <div style={{ fontFamily: 'Arial', maxWidth: '600px', margin: 'auto', padding: '20px' }}>

      {/* Navigation */}
      <nav style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => setPage('home')}>Home</button>
        <button onClick={() => setPage('register')}>Register</button>
        <button onClick={() => setPage('login')}>Login</button>
      </nav>

      {/* Message */}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      {/* Home Page */}
      {page === 'home' && (
        <div>
          <h1>ALU Mental Health Support</h1>
          <p>A safe and private place for ALU students to get mental health support.</p>
        </div>
      )}

      {/* Register Page */}
      {page === 'register' && (
        <form onSubmit={handleRegister}>
          <h2>Create Account</h2>
          <input name="name" placeholder="Your Name" style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }} />
          <input name="email" placeholder="Email" style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }} />
          <input name="password" placeholder="Password" type="password" style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }} />
          <button type="submit">Register</button>
        </form>
      )}

      {/* Login Page */}
      {page === 'login' && (
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <input name="email" placeholder="Email" style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }} />
          <input name="password" placeholder="Password" type="password" style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }} />
          <button type="submit">Login</button>
        </form>
      )}

    </div>
  );
}

export default App;
