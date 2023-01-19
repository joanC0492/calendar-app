import { Button } from "react-bootstrap";
import { useCalendarStore, useUiStore } from "@/shared/hooks";
import "../FabAddNew/FabAddNew.scss";

export const FabDelete = () => {
  const { hasEventSelected, startDeletingEvent } = useCalendarStore();
  const { isDateModalOpen } = useUiStore();

  const handleDeleteEvent = () => {
    startDeletingEvent();
  };

  return (
    <>
      <Button
        variant="danger"
        type="button"
        className={`fab-danger rounded-circle ${
          hasEventSelected && !isDateModalOpen ? "d-block" : "d-none"
        }`}
        onClick={handleDeleteEvent}>
        <i className="fas fa-trash-alt fs-5" />
      </Button>
    </>
  );
};



