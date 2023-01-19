import { Calendar } from "@/app/calendarApp/pages";

export enum CALENDAR_ROUTES {
  CALENDAR = "calendar",
}

interface Iroutes {
  path: string;
  component: () => JSX.Element;
  name: string;
  to?: string;
}

export const routes: Iroutes[] = [
  {
    path: "",
    component: Calendar,
    name: CALENDAR_ROUTES.CALENDAR,
  },
];