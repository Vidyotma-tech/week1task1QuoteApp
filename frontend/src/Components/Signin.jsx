import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style.css';

function Signin() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
      const response = await axios.post('http://localhost:5000/api/auth/signin', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/quote');
    } catch (err) {
      if (err.response) {
        const message = err.response.data.message;
        if (message === 'User not found') {
          alert('Username does not exist. Signup first...');
          navigate('/');
        } else if (message === 'Password incorrect') {
          alert('Incorrect password. Please try again.');
          setFormData({ ...formData, password: '' });
        } else {
          alert(message);
        }
      } else {
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div id='authentication-container'>
      <h2>Sign In</h2>
      <form className='signup-form'>
        <div className='input-container'>
          <label htmlFor='username'>Username:</label>
          <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className='input-container'>
          <label htmlFor='password'>Password:</label>
          <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className='signup-button' onClick={handleSubmit}>Login</button>
      </form>
      <p className='bottom-link'>
        Don't have Account? <Link to="/">Sign up</Link>
      </p>
    </div>
  );
}

export default Signin;