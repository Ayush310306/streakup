import React, { useState, useRef, useContext } from 'react';
import { Mail, Lock, ArrowRight, Check, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { appContent } from '../context/appContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PasswordResetFlow() {
  const { backendurl } = useContext(appContent);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [isemailsent, setisemailsent] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const inputRefs = useRef([]);

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // ✅ STEP 1 - Send OTP
  const onSubmmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendurl}/api/auth/send-reset-otp`, { email });
      if (data.success) {
        toast.success(data.message);
        setisemailsent(true);
        setStep(2)
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ STEP 2 - Verify OTP
  // ✅ STEP 2 - Submit OTP and move to Step 3 only if backend accepts OTP
// ✅ STEP 2 - Verify OTP
  const submitOtp = async (e) => {
  e.preventDefault();

  // Collect OTP digits from inputs safely
  const otpArray = (inputRefs.current || []).map(el => el?.value || '');
  
  if (otpArray.some(d => d === '')) {
    toast.error('Please enter all 6 digits');
    return;
  }

  const otpString = otpArray.join(''); // join digits to a string
  

  console.log('Sending OTP to backend:', otpString); // ✅ Debug

  try {
    const { data } = await axios.post(`${backendurl}/api/auth/verify-reset-otp`, {
      email,
      otp: otpString
    });

    if (data.success) {
      toast.success('OTP verified. You can now reset your password.');
      setIsOtpSubmitted(true);
      setStep(3);
    } else {
      toast.error(data.message || 'Invalid OTP');
    }
  } catch (error) {
    toast.error(error.response?.data?.message || 'OTP verification failed');
  }
};

  // ✅ STEP 3 - Reset Password
  const onsubmitnew = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error('Please fill in both password fields');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const { data } = await axios.post(`${backendurl}/api/auth/reset-password`, {
        email,
        otp: otp.join(''),
        newPassword: password,
      });

      if (data.success) {
        toast.success(data.message);
        navigate('/login');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Password reset failed');
    }
  };

  return (
    <div style={{ overflow: 'hidden' }}>
      <nav style={{ backgroundColor: '#0f172a', padding: '1rem 1.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', ZIndex: '1' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ backgroundColor: '#4f46e5', padding: '0.5rem', borderRadius: '0.5rem' }}>
            <Flame size={20} color="white" />
          </div>
          <span onClick={() => navigate('/')} style={{ color: 'white', fontSize: '1.25rem', fontWeight: 'bold' }}>
            Streak Up
          </span>
        </div>
      </nav>

      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #a78bfa 0%, #c4b5fd 50%, #93c5fd 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px',
        }}
      >
        <div style={{ width: '100%', maxWidth: '500px' }}>
          {/* Progress Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '30px',
              marginTop: '-50',
              gap: '10px',
            }}
          >
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                style={{
                  height: '6px',
                  width: s === step ? '50px' : '30px',
                  backgroundColor: s === step ? '#4f46e5' : '#c7d2fe',
                  borderRadius: '10px',
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </div>

          {/* Step 1: Email */}
          {!isemailsent && step === 1 && (
            <div
              
              style={{
                backgroundColor: '#1e293b',
                borderRadius: '24px',
                padding: '40px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* unchanged UI */}
              <h2 style={{ color: 'white', fontSize: '28px', fontWeight: '700', marginBottom: '12px' }}>Reset password</h2>
              <p style={{ color: '#94a3b8', fontSize: '15px', marginBottom: '32px' }}>Enter your registered email address</p>
              <div style={{ position: 'relative', marginBottom: '24px' }}>
                <Mail style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', width: '20px', height: '20px' }} />
                <input
                  type="email"
                  placeholder="Email id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') onSubmmitEmail(e);
                  }}
                  style={{
                    width: '100%',
                    backgroundColor: '#334155',
                    color: 'white',
                    paddingLeft: '48px',
                    paddingRight: '20px',
                    paddingTop: '14px',
                    paddingBottom: '14px',
                    borderRadius: '12px',
                    border: '1px solid #475569',
                    fontSize: '15px',
                    outline: 'none',
                  }}
                />
              </div>

              <button
                onClick={onSubmmitEmail}
                style={{
                  width: '100%',
                  backgroundColor: '#4f46e5',
                  color: 'white',
                  fontWeight: '600',
                  padding: '14px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                Submit
                <ArrowRight style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
          )}

          {/* Step 2: OTP */}
          {!isOtpSubmitted && isemailsent && step === 2 && (
            <div
              
              style={{
                backgroundColor: '#1e293b',
                borderRadius: '24px',
                padding: '40px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* unchanged UI */}
              <h2 style={{ color: 'white', fontSize: '28px', fontWeight: '700', marginBottom: '12px' }}>Reset password OTP</h2>
              <p style={{ color: '#94a3b8', fontSize: '15px', marginBottom: '32px' }}>Enter the 6-digit code sent to your email id</p>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', justifyContent: 'center' }}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    ref={(el) => (inputRefs.current[index] = el)}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    style={{
                      width: '50px',
                      height: '60px',
                      backgroundColor: '#334155',
                      color: 'white',
                      textAlign: 'center',
                      fontSize: '24px',
                      fontWeight: '700',
                      borderRadius: '12px',
                      border: '1px solid #475569',
                      outline: 'none',
                    }}
                  />
                ))}
              </div>

              <button
                onClick={submitOtp}
                style={{
                  width: '100%',
                  backgroundColor: '#4f46e5',
                  color: 'white',
                  fontWeight: '600',
                  padding: '14px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                Submit
                <ArrowRight style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
          )}

          {/* Step 3: New Password */}
          {isOtpSubmitted && isemailsent && step === 3 && (
            <div
          
              style={{
                backgroundColor: '#1e293b',
                borderRadius: '24px',
                padding: '40px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* unchanged UI */}
              <h2 style={{ color: 'white', fontSize: '28px', fontWeight: '700', marginBottom: '12px' }}>New password</h2>
              <p style={{ color: '#94a3b8', fontSize: '15px', marginBottom: '32px' }}>Enter the new password for your account</p>

              <div style={{ position: 'relative', marginBottom: '16px' }}>
                <Lock style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', width: '20px', height: '20px' }} />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: '#334155',
                    color: 'white',
                    paddingLeft: '48px',
                    paddingRight: '20px',
                    paddingTop: '14px',
                    paddingBottom: '14px',
                    borderRadius: '12px',
                    border: '1px solid #475569',
                    fontSize: '15px',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ position: 'relative', marginBottom: '24px' }}>
                <Lock style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', width: '20px', height: '20px' }} />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') onsubmitnew(e);
                  }}
                  style={{
                    width: '100%',
                    backgroundColor: '#334155',
                    color: 'white',
                    paddingLeft: '48px',
                    paddingRight: '20px',
                    paddingTop: '14px',
                    paddingBottom: '14px',
                    borderRadius: '12px',
                    border: '1px solid #475569',
                    fontSize: '15px',
                    outline: 'none',
                  }}
                />
              </div>

              {password && confirmPassword && password !== confirmPassword && (
                <p style={{ color: '#f87171', fontSize: '14px', marginBottom: '16px' }}>Passwords do not match</p>
              )}

              <button
                onClick={onsubmitnew}
                style={{
                  width: '100%',
                  backgroundColor: '#4f46e5',
                  color: 'white',
                  fontWeight: '600',
                  padding: '14px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                Submit
                <Check style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
