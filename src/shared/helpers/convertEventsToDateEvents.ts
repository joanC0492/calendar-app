import { parseISO } from "date-fns";
import { IEventApi } from "@/app/calendarApp/domain";

export const convertEventsToDateEvents = (events: IEventApi[]) => {
  return events.map((event) => {
    event.start = parseISO(`${event.start}`);
    event.end = parseISO(`${event.end}`);
    return event;
  });
};


