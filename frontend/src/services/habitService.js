import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const habitApi = axios.create({
  baseURL: `${API_URL}/api/habit`,
  withCredentials: true,
});

export const getAllHabits = async () => {
  const response = await habitApi.get('/');

  return response.data;
};

export const createHabit = async (habitName) => {
  const response = await habitApi.post('/', {
    habitName,
  });

  return response.data;
};

export const updateHabit = async (id, habitName) => {
  const response = await habitApi.put(`/${id}`, {
    habitName,
  });

  return response.data;
};

export const deleteHabit = async (id) => {
  const response = await habitApi.delete(`/${id}`);

  return response.data;
};
