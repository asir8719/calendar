import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from '../features/events/eventSlice';
import goalsReducer from '../features/goals/goalSlice';
import tasksReducer from '../features/tasks/taskSlice';
import calendarReducer from './calendarSlice';

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    goals: goalsReducer,
    tasks: tasksReducer,
    calendar: calendarReducer,
  },
});
