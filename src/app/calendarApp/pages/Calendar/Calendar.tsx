import { Calendar as BigCalendar, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Container from "react-bootstrap/Container";
import {
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
  NavBar,
} from "@/app/calendarApp/shared/components";
import { getMessagesES, localizer } from "@/app/calendarApp/shared/helpers";
import { useState } from "react";
import { useCalendarStore, useUiStore } from "@/shared/hooks";
import { IEventsCalendar } from "@/app/calendarApp/domain";

export const Calendar = () => {
  const { openDateModal } = useUiStore();
  const { events: myEventsList, setActiveEvent } = useCalendarStore();
  const localLastView: View = (localStorage.getItem("LAST_VIEW") ||
    "agenda") as View;
  const [lastView, setLastView] = useState(localLastView);

  const eventStyleGetter = (
    event: IEventsCalendar,
    start: Date,
    end: Date,
    isSelected: boolean
  ) => {
    // console.log({ event, start, end, isSelected });
    // Estilos para el evento agendado
    const style = {
      backgroundColor: "#347cf7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };
  const handleDoubleClick = (e: IEventsCalendar) => {
    // console.log({ handleDoubleClick, e });
    openDateModal();
  };
  const handleSelect = (e: IEventsCalendar) => {
    setActiveEvent(e);
  };
  const handleViewChanged = (e: View) => {
    localStorage.setItem("LAST_VIEW", e);
    setLastView(e);
  };
  return (
    <>
      <NavBar />
      <Container className="mt-5">
        <BigCalendar
          culture="es" // Busca en el objeto locales - los dias y el mes pasan a español
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "calc(100vh - 56px - 6rem)" }}
          messages={getMessagesES()} // Se cambian los mensajes en ingles que vienen por default
          eventPropGetter={eventStyleGetter}
          components={{
            event: CalendarEvent,
          }}
          onDoubleClickEvent={handleDoubleClick}
          onSelectEvent={handleSelect}
          onView={handleViewChanged}
          defaultView={lastView}
        />
      </Container>
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
