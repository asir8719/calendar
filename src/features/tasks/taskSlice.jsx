import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTasksByGoal = createAsyncThunk('tasks/fetchByGoal', async (goalId) => {
  const res = await axios.get(`https://calendarbackend-u7tr.onrender.com/api/goals/${goalId}/tasks`);
  return res.data;
});

const initialState = {
  filters: {
    tasks: [],
  },
  selectedFilters: {
    tasks: [],
  }
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasksByGoal.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  }
});

export const { addTask, removeTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;