import { IEventsCalendar } from "@/app/calendarApp/domain";

interface IProps {
  // continuesAfter: boolean;
  // continuesPrior: boolean;
  event: IEventsCalendar;
  // isAllDay: null;
  // localizer: Object;
  // slotEnd: Date;
  // slotStart: Date;
  // title: string;
}

export const CalendarEvent: React.FC<IProps> = ({ event }) => {
  const { title, user } = event;
  return (
    <>
      <strong>{title}</strong>
      <span> - [{user.name}]</span>
    </>
  );
};
