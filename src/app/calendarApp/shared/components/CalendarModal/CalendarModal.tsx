import React, { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import "./CalendarModal.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addHours, differenceInSeconds } from "date-fns";
import es from "date-fns/locale/es";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import { useCalendarStore, useUiStore } from "@/shared/hooks";
import { IEventsCalendar } from "@/app/calendarApp/domain";

registerLocale("es", es);

Modal.setAppElement("#root");

const initFormValues = {
  title: "",
  notes: "",
  start: new Date(),
  end: addHours(new Date(), 2),
};
export const CalendarModal = () => {
  const { activeEvent, startSavingEvent } = useCalendarStore();
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formValues, setFormValues] = useState(
    initFormValues as IEventsCalendar
  );

  const titleClass: string = useMemo(() => {
    // Si es falso entonces no entro al submit
    if (!formSubmitted) return "";
    // Esto se empieza a evaluar cuando hemos hecho almenos un submit
    // Si tiene texto es valido sino invalido
    return formValues.title.length > 0 ? "" : "is-invalid";
  }, [formValues.title, formSubmitted]);

  const onInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChanged = (e: Date, changing: string) => {
    setFormValues({
      ...formValues,
      [changing]: e,
    });
  };

  const onCloseModal = () => {
    // setIsModalOpen(false);
    closeDateModal();
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);

    // La fecha final no puede ser menor que la inicial
    const difference = differenceInSeconds(formValues.end, formValues.start);
    console.log({ difference });
    if (isNaN(difference) || difference <= 0) {
      console.log("Error en fechas");
      Swal.fire("Error en fechas", "Revisar las fechas ingresadas", "error");
      return;
    }
    if (formValues.title.length === 0) {
      console.log("Titulo incorrecto");
      Swal.fire("Titulo incorrecto", "", "error");
      return;
    }
    // console.log(formValues);
    // TODO
    await startSavingEvent(formValues);
    // Cerrar Modal
    closeDateModal();
    setFormSubmitted(false);
  };

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      // style={customStyles}
      className="modal py-3 pb-4"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}>
      <h1 className="h2 ps-3"> Nuevo evento </h1>
      <hr />
      <Form className="container" onSubmit={onSubmitForm}>
        <Form.Group className="mb-2">
          <Form.Label>Fecha y hora inicio</Form.Label>
          <DatePicker
            className="form-control"
            selected={formValues.start}
            onChange={(event: Date) => onDateChanged(event, "start")}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Fecha y hora fin</Form.Label>
          <DatePicker
            className="form-control"
            minDate={formValues.start}
            selected={formValues.end}
            onChange={(date: Date) => onDateChanged(date, "end")}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </Form.Group>
        <hr />
        <Form.Group className="mb-2">
          <Form.Label>Titulo y notas</Form.Label>
          <Form.Control
            className={titleClass}
            type="text"
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChanged}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            as="textarea"
            placeholder="Notas"
            rows={5}
            name="notes"
            style={{ height: "100px" }}
            value={formValues.notes}
            onChange={onInputChanged}
          />
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </Form.Group>
        <Button type="submit" variant="outline-primary" className="mt-3">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </Button>
      </Form>
    </Modal>
  );
};
