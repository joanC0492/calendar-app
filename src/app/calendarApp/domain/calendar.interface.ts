import { Iuser } from "@/app/auth/domain";

export interface IEventsCalendar {
  // bgColor: string;
  end: Date;
  id?: string;
  notes: string;
  start: Date;
  title: string;
  user: Iuser;
}

export interface IcalendarState {
  isLoadingEvents: boolean;
  events: IEventsCalendar[];
  activeEvent: IEventsCalendar | null;
}

