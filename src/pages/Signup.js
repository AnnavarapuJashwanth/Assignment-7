import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    otp: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step === 1 && formData.firstName && formData.lastName && formData.mobile) {
      setStep(2);
    } else if (step === 2 && formData.otp.length === 6) {
      setStep(3);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Signup Successful!');
    navigate('/signin');
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="text-center">Sign Up</h3>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <input type="text" name="firstName" placeholder="First Name" className="form-control my-2" onChange={handleChange} required />
            <input type="text" name="lastName" placeholder="Last Name" className="form-control my-2" onChange={handleChange} required />
            <input type="text" name="mobile" placeholder="Mobile Number" className="form-control my-2" onChange={handleChange} required />
            <button type="button" className="btn btn-primary w-100 mt-2" onClick={handleNext}>Send OTP</button>
          </>
        )}

        {step === 2 && (
          <>
            <input type="text" name="otp" placeholder="Enter 6-digit OTP" className="form-control my-2" onChange={handleChange} required />
            <button type="button" className="btn btn-primary w-100 mt-2" onClick={handleNext}>Verify OTP</button>
          </>
        )}

        {step === 3 && (
          <>
            <input type="password" name="password" placeholder="Create Password" className="form-control my-2" onChange={handleChange} required />
            <button type="submit" className="btn btn-success w-100 mt-2">Sign Up</button>
          </>
        )}
      </form>
    </div>
  );
}

export default Signup;
