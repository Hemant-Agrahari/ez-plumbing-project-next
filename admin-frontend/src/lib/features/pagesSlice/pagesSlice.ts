// src/lib/features/pagesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { requestHandler } from '@/helper/requestHandler';

interface Page {
  id: number;
  title: string;
  slug: string;
}

interface PagesState {
  pages: Page[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: PagesState = {
  pages: [],
  status: 'idle',
};

export const fetchPages = createAsyncThunk('pages/fetchPages', async () => {
  const response = await requestHandler("/pages/list?pageIndex=1&pageSize=100&search=&type=pages", {}, 'get');
  return response.data || [];
});

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pages = action.payload;
      })
      .addCase(fetchPages.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default pagesSlice.reducer;
