import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// axios.defaults.baseURL = 'https://orange-red-kangaroo-ring.cyclic.app/api';
// axios.defaults.baseURL = 'http://localhost:3001/api';
axios.defaults.baseURL = 'https://wallet-backend.fly.dev/';

export const addTransaction = createAsyncThunk(
  '/transactions/addTransaction',
  async (body, thunkAPI) => {
    try {
      const res = await axios.post('/transactions', body);

      const { sum, category, comment, date, type, _id } = res.data.data;

      return { sum, category, comment, date, type, _id };
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const editTransaction = createAsyncThunk(
  '/transactions/editTransaction',
  async (data, thunkAPI) => {
    const { sum, date, comment, category } = data;
    const body = { sum, date, comment, category };

    try {
      const res = await axios.patch(`/transactions/${data.id}`, body);

      const { sum, category, comment, date, type, _id } = res.data.data;

      return { sum, category, comment, date, type, _id };
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  '/transactions/deleteTransaction',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/transactions/${id}`);

      return id;
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  '/users/fetchTransactions',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/users/transactions');

      return res.data;
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);
