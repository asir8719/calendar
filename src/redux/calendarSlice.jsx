import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: {
    goals: [],
    tasks: [],
  },
  selectedFilters: {
    goals: [],
    tasks: [],
  },
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    toggleFilter: (state, action) => {
        const { category, name } = action.payload;
        const selected = state.selectedFilters[category];
        const index = selected.indexOf(name);
        if (index >= 0) {
          selected.splice(index, 1); // remove
        } else {
          selected.push(name); // add
        }
      },
  },
});

export const { toggleFilter } = calendarSlice.actions;
export default calendarSlice.reducer;