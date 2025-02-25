import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Update this with your actual API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;