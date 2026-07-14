import React, { useState } from 'react';
import './registration.css';

const COUNTRIES = [
  "United States", "Canada", "United Kingdom", "India", "Australia", 
  "Germany", "France", "Japan", "Brazil", "South Africa", "United Arab Emirates"
];

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
    age: '', gender: '', phone: '', city: '', country: '', dob: '', agreeTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!formData.agreeTerms) {
      alert("Please accept the Terms & Conditions.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          age: Number(formData.age),
          gender: formData.gender,
          phone: formData.phone,
          city: formData.city,
          country: formData.country,
          dob: formData.dob
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('User registered successfully!');
        window.location.href = '/login'; 
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Could not connect to the backend server.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group"><label>First Name</label><input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required /></div>
          <div className="input-group"><label>Last Name</label><input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required /></div>
          <div className="input-group"><label>Date of Birth</label><input type="date" name="dob" value={formData.dob} onChange={handleChange} required /></div>
          <div className="input-group"><label>Age</label><input type="number" name="age" min="1" value={formData.age} onChange={handleChange} required /></div>
          <div className="input-group">
            <label className="radio-main-label">Gender</label>
            <div className="radio-group">
              <label className="radio-label"><input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} required /> <span>Male</span></label>
              <label className="radio-label"><input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} /> <span>Female</span></label>
            </div>
          </div>
          <div className="input-group"><label>Phone Number</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} required /></div>
          <div className="input-group"><label>City</label><input type="text" name="city" value={formData.city} onChange={handleChange} required /></div>
          
          <div className="input-group">
            <label>Country</label>
            <select name="country" value={formData.country} onChange={handleChange} required className="custom-select">
              <option value="">-- Choose Country --</option>
              {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="input-group"><label>Email Address</label><input type="email" name="email" value={formData.email} onChange={handleChange} required /></div>
          <div className="input-group">
            <label>Password</label>
            <div className="password-field-container">
              <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} required />
              <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}>{showPassword ? '🙈' : '👁️'}</button>
            </div>
          </div>
          <div className="input-group">
            <label>Re-enter Password</label>
            <div className="password-field-container">
              <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
              <button type="button" className="password-toggle-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? '🙈' : '👁️'}</button>
            </div>
          </div>
          <div className="checkbox-group">
            <label><input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} /><span>I agree to the terms and privacy conditions</span></label>
          </div>
          <button type="submit" className="register-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
