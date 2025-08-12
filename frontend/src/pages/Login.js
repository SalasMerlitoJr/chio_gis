//import React, {useState} from 'react';
//import api from '../api';
//export default function Login(){
 // const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  //const submit = async e => { e.preventDefault(); try{ const r = await api.post('/login',{email,password}); alert('Logged in (stub)'); }catch(err){ alert('Login failed (use backend)'); }}
  //return (<div><h3>Login</h3>
    //<form onSubmit={submit}><input placeholder='email' value={email} onChange={e=>setEmail(e.target.value)} />
    //<input placeholder='password' value={password} onChange={e=>setPassword(e.target.value)} />
    //<button>Login</button></form>
  //</div>)
//}
import React, { useState } from 'react';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('Logging in...');
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Login successful!');
        // Save token or redirect as needed
      } else {
        setMessage(data.message || 'Login failed.');
      }
    } catch (err) {
      setMessage('Error connecting to server.');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage('Signing up...');
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: signupName, email: signupEmail, password: signupPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Sign up successful! You can now log in.');
        setIsSignUp(false);
      } else {
        setMessage(data.message || 'Sign up failed.');
      }
    } catch (err) {
      setMessage('Error connecting to server.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f5f6fa',
      transition: 'background 0.5s'
    }}>
      <div style={{
        width: 700,
        maxWidth: '95vw',
        minHeight: 400,
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
        display: 'flex',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Slider Panel */}
        <div style={{
          width: '50%',
          background: isSignUp
            ? 'linear-gradient(135deg, #1976d2 60%, #42a5f5 100%)'
            : 'linear-gradient(135deg, #43cea2 60%, #185a9d 100%)',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 40,
          transition: 'background 0.5s'
        }}>
          <h2 style={{ marginBottom: 20 }}>
            {isSignUp ? 'Dikasure' : 'Dimosure'}
          </h2>
          <p style={{ marginBottom: 30 }}>
            {isSignUp
              ? 'Developed by MemaSaba. Rawrr'
              : 'Developed by MeMaSaba. Rawrr '}
          </p>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            style={{
              padding: '10px 32px',
              borderRadius: 20,
              border: 'none',
              background: '#fff',
              color: isSignUp ? '#1976d2' : '#185a9d',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
        {/* Forms */}
        <div style={{
          width: '50%',
          padding: '40px 30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fff',
          transition: 'all 0.5s'
        }}>
          {isSignUp ? (
            <form style={{ width: '100%' }} onSubmit={handleSignup}>
              <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Create Account</h2>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontWeight: 500 }}>Name</label>
                <input
                  type="text"
                  value={signupName}
                  onChange={e => setSignupName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '.75rem',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontSize: '1rem'
                  }}
                  placeholder="Your Name"
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontWeight: 500 }}>Email</label>
                <input
                  type="email"
                  value={signupEmail}
                  onChange={e => setSignupEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '.75rem',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontSize: '1rem'
                  }}
                  placeholder="you@email.com"
                />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontWeight: 500 }}>Password</label>
                <input
                  type="password"
                  value={signupPassword}
                  onChange={e => setSignupPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '.75rem',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontSize: '1rem'
                  }}
                  placeholder="Password"
                />
              </div>
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '.75rem',
                  borderRadius: '4px',
                  border: 'none',
                  background: '#1976d2',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
                Sign Up
              </button>
            </form>
          ) : (
            <form style={{ width: '100%' }} onSubmit={handleLogin}>
              <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Sign In</h2>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontWeight: 500 }}>Email</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '.75rem',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontSize: '1rem'
                  }}
                  placeholder="you@email.com"
                />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontWeight: 500 }}>Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '.75rem',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontSize: '1rem'
                  }}
                  placeholder="Password"
                />
              </div>
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '.75rem',
                  borderRadius: '4px',
                  border: 'none',
                  background: '#1976d2',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
                Login
              </button>
            </form>
          )}
          {/* Message */}
          {message && (
            <div style={{
              position: 'absolute',
              bottom: 24,
              left: 0,
              width: '100%',
              textAlign: 'center',
              color: message.includes('success') ? '#388e3c' : '#d32f2f',
              fontWeight: 500
            }}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}