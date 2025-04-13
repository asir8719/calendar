// src/pages/CalendarPage.jsx
import EventModal from '../components/EventModal';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Calendar, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer } from '../utils/calendarUtils';
import { createEvent, fetchEvents, updateEvent } from '../features/events/eventSlice';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const CalendarPage = () => {
  const allEvents = useSelector((state) => state.events.items || []);
  
  const { selectedFilters = { goals: [], tasks: [] } } = useSelector((state) => state.calendar || {});
  const filteredEvents = (allEvents || []).filter((e) => {
    if (e.category === 'goal') {
      return selectedFilters.goals.length === 0 || selectedFilters.goals.includes(e.subtype);
    }
    if (e.category === 'task') {
      return selectedFilters.tasks.length === 0 || selectedFilters.tasks.includes(e.subtype);
    }
    return true;
  });
  const DnDCalendar = withDragAndDrop(Calendar);
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.items);

  const [isModalOpen, setModalOpen] = useState(false);
const [selectedSlot, setSelectedSlot] = useState(null);

const handleSaveEvent = (eventData) => {
  console.log("Save event:", eventData);
  dispatch(createEvent(eventData));
};

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleDrop = (e) => {
    e.preventDefault();
    const taskData = JSON.parse(e.dataTransfer.getData('task'));
  
    // Ask user to drop on a date slot (later: convert mouse position to calendar time)
    setSelectedSlot({
      title: taskData.name,
      category: 'work', // or use mapping
      color: taskData.goalColor,
      date: new Date().toISOString().split('T')[0], // fallback: today
      start: '12:00',
      end: '12:30',
    });
    setModalOpen(true);
  };
  

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>📅 My Calendar</h2>
      <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <Calendar
        localizer={localizer}
        events={filteredEvents} // Pass the filtered events to the calendar
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
      />
        <DnDCalendar
          localizer={localizer}
          events={events.map(event => ({
            ...event,
            start: new Date(event.start), // Ensure Date object
            end: new Date(event.end),     // Ensure Date object
          }))}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          defaultView={Views.WEEK}
          views={['month', 'week', 'day']}
          selectable
          onSelectSlot={(slotInfo) => {
            console.log("Selected slot:", slotInfo);
            setSelectedSlot({
              date: slotInfo.start.toISOString().split('T')[0],
              start: slotInfo.start.toTimeString().slice(0, 5),
              end: slotInfo.end.toTimeString().slice(0, 5),
            });
            setModalOpen(true);
          }}
          onEventDrop={({ event, start, end }) => {
            const updatedEvent = { ...event, start, end };
            dispatch(updateEvent(updatedEvent));
          }}
          />
        </div>
      {isModalOpen && (
        <EventModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveEvent}
          slotInfo={selectedSlot}
        />
      )}
    </div>
  );
};

export default CalendarPage;
