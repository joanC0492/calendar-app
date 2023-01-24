export interface IEventApiResponse {
  ok: boolean;
  event: {
    end: Date;
    id: string;
    notes: string;
    start: Date;
    title: string;
    user: string;
  };
}

// La API lo devuelve el "start" y el "end" como string
export interface IEventApi {
  end: Date;
  id: string;
  notes: string;
  start: Date;
  title: string;
  user: {
    _id: string;
    name: string;
  };
}

export interface IEventsApiResponse {
  ok: boolean;
  events: IEventApi[];
}


