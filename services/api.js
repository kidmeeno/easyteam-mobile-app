// src/services/api.js
import { BASE_URL } from '../config/api';

export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      return data;  // Return the signed token.
    } else {
      throw new Error(data.message || 'Authentication failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
