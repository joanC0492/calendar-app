import { Iuser } from "@/app/auth/domain";

export interface IEventsCalendar {
  id?: string;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgColor: string;
  user: Iuser;
}

export interface IcalendarState {
  events: IEventsCalendar[];
  activeEvent: IEventsCalendar | null;
}

