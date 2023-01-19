import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IcalendarState, IEventsCalendar } from "@/app/calendarApp/domain";
import { addHours } from "date-fns";

const tempEvent: IEventsCalendar = {
  _id: new Date().getTime(),
  title: "Cumpleaños del Jefe",
  notes: "Hay que comprar el pastel",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "#fafafa",
  user: {
    _id: "123",
    name: "Joan",
  },
};

const initialState: IcalendarState = {
  events: [tempEvent],
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
      state.events = state.events.map((event) => {
        if (event._id === action.payload._id) return action.payload;
        return event;
      });
    },
    onDeleteEvent: (state) => {
      // Solo si existe el elemento activo
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event._id !== state.activeEvent?._id
        );
        state.activeEvent = null;
      }
    },
  },
});
// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } =
  calendarSlice.actions;
