import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    mobile: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = 'user-' + Date.now(); // ✅ Generate a simple unique ID

    try {
      const response = await fetch('http://localhost:8000/api/signup/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userId }), // ✅ Send to backend
      });

      const data = await response.json();
      if (response.ok) {
        alert('Signup Successful!');

        // ✅ Store loggedInUser for local session use
        const loggedInUser = {
          firstName: formData.first_name,
          lastName: formData.last_name,
          email: formData.email,
          mobile: formData.mobile,
          userId: userId,
        };
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

        navigate('/signin');
      } else {
        alert('Signup Failed: ' + JSON.stringify(data));
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="text-center">Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="first_name" placeholder="First Name" className="form-control my-2" onChange={handleChange} required />
        <input type="text" name="last_name" placeholder="Last Name" className="form-control my-2" onChange={handleChange} required />
        <input type="text" name="mobile" placeholder="Mobile Number" className="form-control my-2" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" className="form-control my-2" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="form-control my-2" onChange={handleChange} required />
        <button type="submit" className="btn btn-success w-100 mt-2">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
