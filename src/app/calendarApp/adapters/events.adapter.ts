import { parseISO } from "date-fns";
import {
  IEventApi,
  IEventsCalendar,
  IEventApiResponse,
} from "@/app/calendarApp/domain";
import { Iuser } from "@/app/auth/domain";

export const getEventsAdapter = (events: IEventApi[]): IEventsCalendar[] => {
  return events.map((event) => {
    return {
      end: parseISO(`${event.end}`),
      id: event.id,
      notes: event.notes,
      start: parseISO(`${event.start}`),
      title: event.title,
      user: {
        uid: event.user._id,
        name: event.user.name,
      },
    };
  });
};

export const getEventAdapter = (
  event: IEventApiResponse,
  user: Iuser
): IEventsCalendar => {
  return {
    end: parseISO(`${event.event.end}`),
    id: event.event.id,
    notes: event.event.notes,
    start: parseISO(`${event.event.start}`),
    title: event.event.title,
    user: user,
  };
};

