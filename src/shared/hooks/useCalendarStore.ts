import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from "@/store/calendar/calendarSlice";
import { IEventsCalendar } from "@/app/calendarApp/domain";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(
    (state: RootState) => state.calendar
  );

  const setActiveEvent = (calendarEvent: IEventsCalendar) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent: IEventsCalendar) => {
    // TODO: llegar al backend
    // Todo Bien
    if (calendarEvent._id) {
      // Actualizando
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      // creando
      // Le agregamos el _id
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  const startDeletingEvent = () => {
    dispatch(onDeleteEvent());
  };

  return {
    // Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    // Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};



