import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style.css';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  }); 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
      setSuccess('User registered successfully. Please login.');
      alert('User registered successfully. Please login.');
      // Redirect to the sign-in page immediately
      navigate('/signin', { state: { message: 'User registered successfully. Please login.' } });
    } catch (err) {
      console.log(err.response);
      if (err.response && err.response.data.message === 'User already exists') {
        alert('User already exists, So login with previously provided credentials');
        // Redirect to the sign-in page immediately
        navigate('/signin', { state: { message: 'User already exists. Please login.' } });
      } else {
        setError(err.response ? err.response.data.message : 'An error occurred');
        setSuccess('');
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div id='authentication-container'>
      <h2>Sign Up</h2>
      <form className='signup-form'>
        <div className='input-container'>
          <label htmlFor='username'>Username:</label>
          <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className='input-container'>
          <label htmlFor='password'>Password:</label>
          <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className='signup-button' onClick={handleSubmit}>Signup</button>
      </form>
      <p className='bottom-link'>
        Already have an account? <Link to="/signin">Sign in</Link>
      </p>
    </div>
  );
}

export default Signup;