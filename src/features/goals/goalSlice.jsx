import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  filters: {
    goals: [],
  },
  selectedFilters: {
    goals: [],
  }
};

export const fetchGoals = createAsyncThunk('goals/fetchGoals', async () => {
  const res = await axios.get('http://localhost:5000/api/goals');
  return res.data;
});

const goalSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    addGoal: (state, action) => {
      state.goals.push(action.payload);
    },
    removeGoal: (state, action) => {
      state.goals = state.goals.filter(goal => goal.id !== action.payload);
    },
    updateGoal: (state, action) => {
      const index = state.goals.findIndex(goal => goal.id === action.payload.id);
      if (index !== -1) {
        state.goals[index] = action.payload;
      }
    },
    setSelectedGoal: (state, action) => {
      state.selectedGoal = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGoals.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  }
});

export const { addGoal, removeGoal, updateGoal, setSelectedGoal } = goalSlice.actions;
export default goalSlice.reducer;