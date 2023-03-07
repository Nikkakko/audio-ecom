import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../services/productApi';

export const getAllProducts = createAsyncThunk(
  'product/getAllProducts',
  async () => {
    const response = await instance.get('b/63fd8e32ebd26539d0869bd9');
    return response.data;
  }
);
