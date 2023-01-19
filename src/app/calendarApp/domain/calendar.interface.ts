export interface IEventsCalendar {
  _id?: number;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgColor: string;
  user: {
    _id: string;
    name: string;
  };
}

export interface IcalendarState {
  events: IEventsCalendar[];
  activeEvent: IEventsCalendar | null;
}
