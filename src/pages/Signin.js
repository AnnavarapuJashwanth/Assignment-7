// ✅ UPDATED Signin.js (uses user.id instead of user.userId)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handlePasswordLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/signin/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('loggedInUser', JSON.stringify(data));

        const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        const userBookings = allBookings.filter(b => b.userId === data.id);
        localStorage.setItem('userBookings', JSON.stringify(userBookings));

        alert('Login Successful!');
        navigate('/');
      } else {
        alert(data.error || 'Invalid mobile or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong!');
    }
  };

  const handleSendOtp = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/send-otp/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('OTP sent to your registered email');
        setStep(2);
      } else {
        alert(data.error || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('OTP Send Error:', error);
      alert('Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/verify-otp/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, otp }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('loggedInUser', JSON.stringify(data));

        const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        const userBookings = allBookings.filter(b => b.userId === data.id);
        localStorage.setItem('userBookings', JSON.stringify(userBookings));

        alert('OTP Verified. Login Successful!');
        navigate('/');
      } else {
        alert(data.error || 'Invalid OTP');
      }
    } catch (error) {
      console.error('OTP Verify Error:', error);
      alert('Failed to verify OTP');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="text-center">Sign In</h3>
      <input type="text" placeholder="Mobile Number" className="form-control my-2" value={mobile} onChange={(e) => setMobile(e.target.value)} />

      {step === 1 && (
        <>
          <input type="password" placeholder="Password" className="form-control my-2" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="btn btn-primary w-100 mb-2" onClick={handlePasswordLogin}>Login with Password</button>
          <button className="btn btn-secondary w-100" onClick={handleSendOtp}>Login with OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <input type="text" placeholder="Enter OTP" className="form-control my-2" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <button className="btn btn-success w-100" onClick={handleVerifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
}

export default Signin;
