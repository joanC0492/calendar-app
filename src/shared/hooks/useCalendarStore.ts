import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from "@/store/calendar/calendarSlice";
import { IEventsCalendar } from "@/app/calendarApp/domain";
import { calendarApi } from "@/shared/api";

interface IEventponse {
  ok: boolean;
  event: {
    title: string;
    notes: string;
    start: Date;
    end: Date;
    user: string;
    id: string;
  };
}

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(
    (state: RootState) => state.calendar
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const setActiveEvent = (calendarEvent: IEventsCalendar) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent: IEventsCalendar) => {
    // Si no lo pasamos a numero me da un error
    const body = {
      ...calendarEvent,
      start: calendarEvent.start.getTime(),
      end: calendarEvent.end.getTime(),
    };
    // TODO: llegar al backend
    // Todo Bien
    // if (calendarEvent._id) {
    if (calendarEvent.id) {
      // Actualizando
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      // creando
      // Le agregamos el _id
      const res = await calendarApi.post("/events", body);
      const data: IEventponse = res.data;

      console.log({ data });

      // dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
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
