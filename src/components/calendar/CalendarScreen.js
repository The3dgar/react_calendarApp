import React, { useEffect, useState } from "react";
import { Navbar } from "../ui/Navbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { messages } from "../../helper/calendar-messages-es";

import moment from "moment";
import "moment/locale/es";

import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from "../../actions/events";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";

moment.locale("es");
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  // eventos para interactuar con el calendario
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);

  // estilos de los eventos del calendario
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: (uid === event.user._id) ?"Blue" : "Orange",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };

    // if (isSelected) style.backgroundColor = "Blue" 
    // else style.backgroundColor = "Orange"
    return {
      style,
    };
  };

  useEffect(() => {
    dispatch(eventStartLoading())
  }, [dispatch])

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const onDoubleClick = (event) => {
    // aqui podemos disparar un modal
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (event) => {
    // mostrar un boton para interacturar con el evento (borrar)
    dispatch(eventSetActive(event));
  };

  const onViewChange = (event) => {
    setLastView(event);
    localStorage.setItem("lastView", event);
  };

  const onSelectSlot = e =>{
    // eventStyleGetter(e, e.start, e.end, false)
    dispatch(eventClearActiveEvent())
  }

  return (
    <div>
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        selectable={true}
        onView={onViewChange}
        view={lastView}
      />
      {activeEvent && <DeleteEventFab />}
      <AddNewFab />
      <CalendarModal />
    </div>
  );
};
