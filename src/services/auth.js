import axios from 'axios';

const API_URL = 'http://192.168.15.13:3000';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/teacher/login`, { email, password });
    return response.data; 
  } catch (error) {
    console.error('Erro no login:', error.response?.data || error.message);
    throw error;
  }
};
