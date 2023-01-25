import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IcalendarState, IEventsCalendar } from "@/app/calendarApp/domain";

const initialState: IcalendarState = {
  // events: [tempEvent],
  isLoadingEvents: true, // Nos dira si esta cargando los eventos o ya se muestran
  events: [],
  activeEvent: null,
};
export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    onSetActiveEvent: (state, action: PayloadAction<IEventsCalendar>) => {
      state.activeEvent = action.payload as IEventsCalendar;
      // Error
      /*
        react_devtools_backend.js:4012 A non-serializable value was detected in an action, in the path: `payload.start`. Value: Sat Jan 14 2023 19:16:19 GMT-0500 (hora estándar de Perú) 
        Take a look at the logic that dispatched this action:  
      */
    },
    onAddNewEvent: (state, action: PayloadAction<IEventsCalendar>) => {
      state.events.push(action.payload);
      // Cuando se crea un evento ninguno debe estar activo
      state.activeEvent = null;
    },
    onUpdateEvent: (state, action: PayloadAction<IEventsCalendar>) => {
      // * Recorremos los eventos almacenados
      state.events = state.events.map((event) => {
        // * Si algun evento tiene el mismo codigo significa
        // que encontramos el evento a modificar
        // asi que le asignamos su nuevo valor
        if (event.id === action.payload.id) return action.payload;
        // *En caso de no ser el evento a modificar
        // retornamos su valor original
        return event;
      });
    },
    onDeleteEvent: (state) => { 
      // Solo si existe el elemento activo
      if (state.activeEvent) {
        state.events = state.events.filter(
          // (event) => event._id !== state.activeEvent?._id
          (event) => event.id !== state.activeEvent?.id
        );
        state.activeEvent = null;
      }
    },
    
    onLoadEvents: (state, action: PayloadAction<IEventsCalendar[]>) => {
      // state.events = action.payload; // Podriamos usar esto pero haremos algo mejor
      action.payload.forEach((event) => {
        // * state.events son los eventos que ya tenemos
        // * ¿El evento "n" de lo que mandamos por parametro
        // ya existe en los eventos que ya tenemos?
        const eventExists = state.events.some(
          (dbEvent) => dbEvent.id === event.id
        );
        // Si no existe es porque es nuevo y debemos agregarlo
        if (!eventExists) state.events.push(event);
      });

      state.isLoadingEvents = false; //False porque ya tenemos los eventos
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
} = calendarSlice.actions;
