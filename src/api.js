import axios from 'axios';

const api = axios.create({
  baseURL: 'https://20231212003216.azurewebsites.net',
});

// Add a request interceptor

export default api;