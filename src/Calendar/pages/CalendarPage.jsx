import 'react-big-calendar/lib/css/react-big-calendar.css';

import { useState } from 'react';
import {Calendar} from 'react-big-calendar';
import { NavBar,CalendarEvent,CalendarModal } from "../"
import { addHours} from "date-fns/esm";
import { localizer,getMessagesES } from '../../helpers';


const events=[{
  title:"Cumpleaños del jefe",
  notes:"Comprar el pastel",
  start:new Date(),
  end: addHours(new Date(),2),
  bgColor:'#fafafa',
  user:{
    _id:123,
    name:"Mario"
  }
}]


export const CalendarPage = () => {

  const [lastView, setlastView] = useState(localStorage.getItem('lastView')||"week");
  const eventStyleGetter =(event,start,end,isSelected)=>{
    
    const style={
      backgroundColor:"#347CF7",
      borderRadius:'0px',
      opacity:0.8,
      color:'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = (event)=>{
    console.log("Double click ",event)
  }

  const onSelect = (event)=>{
    console.log("Click: ",event);
  }

  const onViewChange=(event)=>{
    localStorage.setItem('lastView',event);
    setlastView(event);
  }

  return (
   <>
    <NavBar/>

    <Calendar
      culture='es'
      localizer={localizer}
      defaultView={lastView}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc(100vh - 80px)' }}
      messages={getMessagesES()}
      eventPropGetter={eventStyleGetter}
      components={{
        event:CalendarEvent
      }}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent = {onSelect}
      onView={onViewChange}
    />

    <CalendarModal/>
   </>
  )
}
