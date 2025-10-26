
import React from 'react';
import { useState, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import { Flame } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import {useEffect} from 'react';
import { appContent } from '../context/appContext';

const EmailVerify = () => {
  
  const { backendurl, isLoggedIn,userData,setIsLoggedIn, getUserData } = useContext(appContent);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const navigate = useNavigate();
  const handleChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);

    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex].focus();
  };

  const handleVerify = async() => {
    const otpValue = otp.join('');
    console.log('OTP to verify:', otpValue);
    const {data} = await axios.post(backendurl + '/api/auth/verify-account', { otp: otpValue })
    if(data.success){
      toast.success(data.message);
      getUserData();
      navigate('/');
    } else {
      toast.error(data.message);
    }
  };

  useEffect(()=>{
    isLoggedIn && userData && userData.isAccountVerified && navigate('/')
  },[isLoggedIn,userData])

  axios.defaults.withCredentials = true;


  return (
    <div>
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
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom right, #c084fc, #a78bfa, #8b5cf6)',
        padding: '20px'
      }}>
       
        <div style={{
          backgroundColor: '#1e293b',
          borderRadius: '20px',
          padding: '50px 40px',
          width: '100%',
          maxWidth: '450px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          <h1 style={{
            color: 'white',
            fontSize: '28px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '10px'
          }}>
            Email Verify OTP
          </h1>
          
          <p style={{
            color: '#94a3b8',
            textAlign: 'center',
            marginBottom: '30px',
            fontSize: '14px'
          }}>
            Enter the 6-digit code sent to your email id.
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '30px'
          }} onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#334155',
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: '600',
                  textAlign: 'center',
                  borderRadius: '10px',
                  border: 'none',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #6366f1'}
                onBlur={(e) => e.target.style.boxShadow = 'none'}
              />
            ))}
          </div>

          <button
            onClick={handleVerify}
            style={{
              width: '100%',
              backgroundColor: '#6366f1',
              color: 'white',
              fontWeight: '500',
              padding: '14px',
              borderRadius: '25px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#4f46e5'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#6366f1'}
          >
            Verify email
          </button>
        </div>
      </div>
    </div>
    );
}

export default EmailVerify;