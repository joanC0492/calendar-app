import { Button } from "react-bootstrap";
import { useUiStore, useCalendarStore } from "@/shared/hooks";
import "./FabAddNew.scss";
import { IEventsCalendar } from "@/app/calendarApp/domain";
import { addHours } from "date-fns";

const initEventCalendar: IEventsCalendar = {
  title: "",
  notes: "",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "#fafafa",
  user: {
    _id: "123",
    name: "Joan",
  },
};
export const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClickNewEvent = () => {
    setActiveEvent(initEventCalendar);
    openDateModal();
  };

  return (
    <>
      <Button
        variant="primary"
        type="button"
        className="fab rounded-circle"
        onClick={handleClickNewEvent}>
        <i className="fas fa-plus fs-2" />
      </Button>
    </>
  );
};
