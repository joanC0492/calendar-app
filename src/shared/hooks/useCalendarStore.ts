import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from "@/store/calendar/calendarSlice";
import {
  IEventApi,
  IEventApiResponse,
  IEventsApiResponse,
  IEventsCalendar,
} from "@/app/calendarApp/domain";
import { calendarApi } from "@/shared/api";
import { convertEventsToDateEvents } from "@/shared/helpers";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(
    (state: RootState) => state.calendar
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const setActiveEvent = (calendarEvent: IEventsCalendar) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (
    calendarEvent: IEventsCalendar
  ): Promise<void> => {
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
      const data: IEventApiResponse = res.data;

      console.log({ data });

      // dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
    }
  };

  const startDeletingEvent = () => {
    dispatch(onDeleteEvent());
  };

  const startLoadingEvents = async (): Promise<void> => {
    try {
      const res = await calendarApi.get("/events");
      const data: IEventsApiResponse = res.data;
      // Tener en cuenta que la api nos devuelve la fecha como tipo string
      // Por eso lo creamos esta funcion para parsearlo a objeto Date
      const events: IEventApi[] = convertEventsToDateEvents(data.events);
      console.log({ events });
    } catch (error) {
      console.log("Error cargando eventos");
      console.log({ error });
    }
  };

  return {
    // Properties
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,
    // Methods
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  };
};
