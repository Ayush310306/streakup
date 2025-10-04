import React, { useState } from 'react';
import { User, Mail, Lock, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import axios from 'axios';
import { appContent } from '../context/appContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [state, setState] = useState('sign up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { backendurl, setIsLoggedIn, getUserData } = useContext(appContent);

  const onSubmithandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      if (state === 'sign up') {
        const { data } = await axios.post(`${backendurl}/api/auth/register`, { username: name, email, password });
        console.log(data);
        if (data.success) {
          setIsLoggedIn(true);
          await getUserData();
          navigate('/');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendurl}/api/auth/login`, { username: name, password });
        console.log(data);
        if (data.success) {
          setIsLoggedIn(true);
          navigate('/');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #e9d5ff, #c4b5fd, #a78bfa)' }}>
      <nav style={{ backgroundColor: '#0f172a', padding: '1rem 1.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ backgroundColor: '#4f46e5', padding: '0.5rem', borderRadius: '0.5rem' }}>
            <Flame size={20} color="white" />
          </div>
          <span onClick={() => navigate('/')} style={{ color: 'white', fontSize: '1.25rem', fontWeight: 'bold' }}>
            Streak Up
          </span>
        </div>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 72px)', padding: '1rem' }}>
        <div style={{ width: '100%', maxWidth: '28rem', backgroundColor: '#0f172a', borderRadius: '1.5rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', padding: '2rem' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>
              {state === 'sign up' ? 'Create Account' : 'Login'}
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
              {state === 'sign up' ? 'Create your account' : 'Login to your account'}
            </p>
          </div>

          <form onSubmit={onSubmithandler}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Username Input */}
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                  <User size={20} color="#94a3b8" />
                </div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={e => setName(e.target.value)}
                  value={name}
                  style={{
                    width: '100%',
                    backgroundColor: '#1e293b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '1rem 1.5rem 1rem 3rem',
                    outline: 'none',
                    fontSize: '1rem',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #4f46e5'}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                />
              </div>

              {/* Email Input - Only for Sign Up */}
              {state === 'sign up' && (
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                    <Mail size={20} color="#94a3b8" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Id"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    style={{
                      width: '100%',
                      backgroundColor: '#1e293b',
                      color: 'white',
                      border: 'none',
                      borderRadius: '9999px',
                      padding: '1rem 1.5rem 1rem 3rem',
                      outline: 'none',
                      fontSize: '1rem',
                      transition: 'all 0.3s'
                    }}
                    onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #4f46e5'}
                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                  />
                </div>
              )}

              {/* Password Input */}
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                  <Lock size={20} color="#94a3b8" />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  style={{
                    width: '100%',
                    backgroundColor: '#1e293b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '1rem 1.5rem 1rem 3rem',
                    outline: 'none',
                    fontSize: '1rem',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #4f46e5'}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                />
              </div>

              {/* Forgot Password Link - Only for Login */}
              {state === 'login' && (
                <div style={{ textAlign: 'left' }}>
                  <button
                    style={{ color: '#818cf8', fontSize: '0.875rem', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
                    onClick={() => { navigate('/reset-password'); }}
                    onMouseOver={(e) => e.target.style.color = '#a5b4fc'}
                    onMouseOut={(e) => e.target.style.color = '#818cf8'}
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                style={{
                  width: '100%',
                  backgroundColor: '#4f46e5',
                  color: 'white',
                  fontWeight: '600',
                  borderRadius: '9999px',
                  padding: '1rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'all 0.3s',
                  boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.5)'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#4338ca';
                  e.target.style.transform = 'scale(1.02)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#4f46e5';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                {state === 'sign up' ? 'Sign Up' : 'Login'}
              </button>
            </div>
          </form>

          {/* Toggle State Link */}
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
              {state === 'sign up' ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => setState(state === 'sign up' ? 'login' : 'sign up')}
                style={{ color: '#818cf8', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseOver={(e) => e.target.style.color = '#a5b4fc'}
                onMouseOut={(e) => e.target.style.color = '#818cf8'}
              >
                {state === 'sign up' ? 'Login here' : 'Sign up here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
