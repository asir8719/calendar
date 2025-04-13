import moment from 'moment';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';

export const localizer = momentLocalizer(moment);

// const events = [
//     {
//       title: 'Meeting',
//       start: new Date(2025, 3, 13, 10, 0), // Example event
//       end: new Date(2025, 3, 13, 12, 0),
//     },
//     {
//       title: 'Lunch Break',
//       start: new Date(2025, 3, 13, 13, 0),
//       end: new Date(2025, 3, 13, 14, 0),
//     },
//   ];
  
// <BigCalendar
//   localizer={localizer}
//   events={events}
//   startAccessor="start"
//   endAccessor="end"
//   style={{ height: 600 }}
// />
