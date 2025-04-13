import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const res = await axios.get('https://calendarbackend-u7tr.onrender.com/api/events');
  return res.data;
});

export const createEvent = createAsyncThunk('events/createEvent', async (eventData) => {
    const res = await axios.post('https://calendarbackend-u7tr.onrender.com/api/events', eventData);
    return res.data;
  });

export const updateEvent = createAsyncThunk('events/updateEvent', async (eventData) => {
    const res = await axios.put(`https://calendarbackend-u7tr.onrender.com/api/events/${eventData._id}`, eventData);
    return res.data;
  });

export const deleteEvent = createAsyncThunk('events/deleteEvent', async (id) => {
    await axios.delete(`https://calendarbackend-u7tr.onrender.com/api/events/${id}`);
    return id;
  });
  
  

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const idx = state.items.findIndex(e => e._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })      
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.items = state.items.filter(e => e._id !== action.payload);
      });      
  },
});

export default eventSlice.reducer;
