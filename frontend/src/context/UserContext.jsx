import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// 1. Create the context
export const UserContext = createContext();

// 2. Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('popx_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await axios.post('https://reactlogin-backend.onrender.com/api/login', {
        email,
        password,
      });

      
      if (res.data.success === 'true') {
        setUser(res.data.user);
        localStorage.setItem('popx_user', JSON.stringify(res.data.user));
        return { success: true, message: res.data.message };
      } else {
        
        return { success: false, error: res.data.error || 'Login failed with an unknown reason.' };
      }
    } catch (err) {
      console.error('Login Error:', err); 

      if (err.response && err.response.data && err.response.data.error) {
        return { success: false, error: err.response.data.error };
      }
      
      return { success: false, error: 'Network error or unexpected response. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      const res = await axios.post('https://reactlogin-backend.onrender.com/api/register', userData);
      if (res.data.success === 'true') {
        setUser(res.data.user);
        localStorage.setItem('popx_user', JSON.stringify(res.data.user));
        return { success: true, message: res.data.message };
      } else {
        return { success: false, error: res.data.error || 'Registration failed with an unknown reason.' };
      }
    } catch (err) {
      console.error('Register Error:', err);

      
      if (err.response?.status === 409) {
        return {
          success: false,
          error: err.response.data?.error || "User already exists. Try logging in.",
        };
      }
      // Handle other backend errors (like 400 for validation) by extracting the message
      if (err.response && err.response.data && err.response.data.error) {
          return { success: false, error: err.response.data.error };
      }

      // Fallback for network errors or unhandled server errors
      return {
        success: false,
        error: 'Something went wrong during registration. Please try again.',
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('popx_user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Custom hook
export const useUser = () => useContext(UserContext);
