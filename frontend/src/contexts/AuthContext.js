import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/user');
      setCurrentUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      logout();
      setLoading(false);
    }
  };

  const register = async (name, email, password, passwordConfirmation) => {
    const response = await axios.post('/api/register', {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation
    });
    
    setToken(response.data.token);
    localStorage.setItem('token', response.data.token);
    setCurrentUser(response.data.user);
    return response.data;
  };

  const login = async (email, password) => {
    const response = await axios.post('/api/login', {
      email,
      password
    });
    
    setToken(response.data.token);
    localStorage.setItem('token', response.data.token);
    setCurrentUser(response.data.user);
    return response.data;
  };

  const logout = async () => {
    if (token) {
      try {
        await axios.post('/api/logout');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }
    
    localStorage.removeItem('token');
    setToken(null);
    setCurrentUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    currentUser,
    token,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}