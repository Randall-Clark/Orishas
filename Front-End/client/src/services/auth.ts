import api from '../api/axios';

export const loginUser = async (email: string, password: string) => {
  const res = await api.post('/auth/login', { email, password });
  return res.data;
};

export const registerUser = async (user: {
  email: string;
  username: string;
  password: string;
}) => {
  const response = await api.post('/auth/register', user);
  return response.data;
};