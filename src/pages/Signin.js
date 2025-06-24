import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.mobile === mobile && u.password === password);

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      alert('Login Successful!');
      navigate('/');
    } else {
      alert('Invalid mobile or password');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="text-center">Sign In</h3>
      <input type="text" placeholder="Mobile Number" className="form-control my-2" value={mobile} onChange={(e) => setMobile(e.target.value)} />
      <input type="password" placeholder="Password" className="form-control my-2" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="btn btn-primary w-100" onClick={handleLogin}>Sign In</button>
    </div>
  );
}

export default Signin;
