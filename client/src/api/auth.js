import axios from 'axios';

const API = 'http://localhost:4500/api';

export const registerRequest = (user) => axios.post(`${API}/auth/register`, user);