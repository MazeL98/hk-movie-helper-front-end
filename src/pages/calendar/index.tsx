import {Calendar,dayjsLocalizer }  from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.scss"
import { useState } from 'react';
import dayjs from 'dayjs';
import Forbidden from '@/components/StatusPages/Forbidden';
// const localizer = dayjsLocalizer(dayjs)
// const getEvents = () => {
//   return [{
//     start: new Date('2025-03-12T18:30:00'),
//     end: new Date('2025-03-12T20:45:00'),
//     title: '加奈子的幸福杀手生活'
//   }]
// }

const FilmCalendar = () => {

  // const [events,setEvents] = useState(getEvents())
  return (
    <div className="calendar-container">
      {/* <div className="top-container">
        1122
      </div>
      <div className="calendar-container">
        <Calendar
          events={events}
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="week"
          style={{ height: 600 }}

        />
        </div> */}
        <Forbidden />
    </div>
  )
}

export default FilmCalendar