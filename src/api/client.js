import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://eventify-backend-fh2o.onrender.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
