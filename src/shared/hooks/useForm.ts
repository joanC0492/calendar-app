import { useEffect, useMemo, useState } from "react";
import { IformValid, IformValidations, IinitialForm } from "@/app/auth/domain";

export const useForm = (
  initialForm = {} as IinitialForm,
  formValidations = {} as IformValidations
) => {
  // Objeto con el valor de las propiedades del form, podemos pasarle cualquier cosa
  const [formState, setFormState] = useState(initialForm);
  // Objeto con propiedades y con valor null o con un mensaje de error
  const [formValidation, setFormValidation] = useState({} as IformValid);

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  // Si hay almenos una propiedad nula devuelve falso
  // Si ninguno es null, entonces el form esta validado
  const isFormValid: boolean = useMemo(() => {
    for (const formValue of Object.keys(formValidation))
      if (formValidation[formValue] !== null) return false;
    return true;
  }, [formValidation]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => setFormState(initialForm);

  const createValidators = (): void => {
    const formCheckedValues = {} as IformValid;

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField];

      formCheckedValues[formField + "Valid"] = fn(
        formState[formField] as string
      )
        ? null
        : errorMessage;
    }

    setFormValidation(formCheckedValues);
  };

  return {
    // ...formState,
    formState,
    onInputChange,
    onResetForm,

    // ...formValidation,
    isFormValid,
  };
};

