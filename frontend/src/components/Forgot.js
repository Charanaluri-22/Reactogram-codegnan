import React, { useState} from 'react';
import Swal from 'sweetalert2';
import { API_BASE_URL } from "../config"
import { useNavigate } from 'react-router-dom';
import './Forgot.css'
import axios from 'axios';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Verify that the new password and confirm password match
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'New password and confirm password do not match.',
      });
      return;
    }
    
    setIsLoading(true);
    const requestData = {
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword
    };
  
    axios.post(`${API_BASE_URL}/forgotpassword`, requestData)
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false);
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Password changed successfully",
          });
          navigate('/login')
          
        } else {
          Swal.fire({
            title: "Error Occurred, try again",
            icon: "error",
          });
          
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          title: error.response.data.error,
        });
        
      });
      setTimeout(() => {
        // Reset form fields and loading state
        setEmail('');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setIsLoading(false);
      }, 2000);
    
  };
  


  return (
    <div className="forget-password-form">
      <h2>Forget Password</h2>
      {isLoading ? (
        <div className="loading-spinner"></div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br /><br />
          <label htmlFor="old_password">Old Password:</label>
          <input
            type="password"
            id="old_password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          /><br /><br />
          <label htmlFor="new_password">New Password:</label>
          <input
            type="password"
            id="new_password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          /><br /><br />
          <label htmlFor="confirm_password">Confirm Password:</label>
          <input
            type="password"
            id="confirm_password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          /><br /><br />
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default Forgot;
