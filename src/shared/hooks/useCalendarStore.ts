import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "@/store/calendar/calendarSlice";
import {
  IEventApiResponse,
  IEventsApiResponse,
  IEventsCalendar,
} from "@/app/calendarApp/domain";
import { calendarApi } from "@/shared/api";
import { getEventAdapter, getEventsAdapter } from "@/app/calendarApp/adapters";
import Swal from "sweetalert2";

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
    try {
      if (calendarEvent.id) {
        // Actualizando
        const res = await calendarApi.put(`/events/${calendarEvent.id}`, body);
        const data: IEventApiResponse = res.data;
        const event = getEventAdapter(data, user);
        dispatch(onUpdateEvent(event));
        return;
      }
      // creando
      // Le agregamos el _id
      const res = await calendarApi.post("/events", body);
      const data: IEventApiResponse = res.data;
      const event = getEventAdapter(data, user);
      dispatch(onAddNewEvent(event));
    } catch (error: any) {
      console.log({ error });
      Swal.fire(
        "Error al guardar",
        error.response.data.msg || "Error ---",
        "error"
      );
    }
  };

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent?.id}`);
      dispatch(onDeleteEvent());
    } catch (error: any) {
      console.log({ error });
      Swal.fire(
        "Error al eliminar",
        error.response.data.msg || "Error ---",
        "error"
      );
    }
  };

  const startLoadingEvents = async (): Promise<void> => {
    try {
      const res = await calendarApi.get("/events");
      const data: IEventsApiResponse = res.data;
      // Tener en cuenta que la api nos devuelve la fecha como tipo string
      // Por eso lo creamos esta funcion para parsearlo a objeto Date
      // const events = convertEventsToDateEvents(data.events);

      // Cambiamos el nombre de la funcion a getEventsAdapter ya que aqui adaptamos
      // la respuesta para que sea del mismo tipo que espera
      const events = getEventsAdapter(data.events);
      console.log({ events });
      dispatch(onLoadEvents(events));
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
