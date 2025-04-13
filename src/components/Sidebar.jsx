import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoals, setSelectedGoal } from '../features/goals/goalSlice';
import { fetchTasksByGoal } from '../features/tasks/taskSlice';
import { toggleFilter } from '../redux/calendarSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
//   const goals = useSelector((state) => state.goals.items);
  const selectedGoal = useSelector((state) => state.goals.selectedGoal);
//   const tasks = useSelector((state) => state.tasks.items);
  const { goals, tasks } = useSelector(state => state.calendar.filters);

  useEffect(() => {
    dispatch(fetchGoals());
  }, [dispatch]);

  const handleGoalClick = (goal) => {
    dispatch(setSelectedGoal(goal));
    dispatch(fetchTasksByGoal(goal._id));
  };

  const renderItem = (item, category) => (
    <button
      key={item}
      onClick={() => dispatch(toggleFilter({ category, name: item }))}
      className={`sidebar-btn ${selected[category].includes(item) ? 'active' : ''}`}
    >
      <span>📌 {item}</span>
    </button>
  );

  return (
    <div className="sidebar">
      <h3>GOALS</h3>
      {goals.map(g => renderItem(g, 'goals'))}
      <h3>TASKS</h3>
      {tasks.map(t => renderItem(t, 'tasks'))}
    </div>
  );
};

export default Sidebar;
