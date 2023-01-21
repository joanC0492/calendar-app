import { Container, Row, Col, Form } from "react-bootstrap";
import css from "./Login.module.scss";
import { IformValidations, IinitialForm } from "@/app/auth/domain";
import { useAuthStore, useForm } from "@/shared/hooks";
import Swal from "sweetalert2";
import { useEffect, useMemo } from "react";

const loginFormFields: IinitialForm = {
  loginEmail: "",
  loginPassword: "",
};
const registerFormFields: IinitialForm = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerPassword2: "",
};

const formRegisterValidations: IformValidations = {
  registerName: [
    (value: string): boolean => value.trim().length > 0,
    "El nombre es obligatorio",
  ],
  registerEmail: [
    (value: string): boolean => value.includes("@"),
    "El correo debe de tener un arroba",
  ],
  registerPassword: [
    (value: string): boolean => value.length >= 6,
    "El password debe de tener al menos 6 letras",
  ],
  registerPassword2: [
    (value: string): boolean => value.length >= 6,
    "El password debe de tener al menos 6 letras",
  ],
};

export const Login = () => {
  const { startLogin, startRegister, status, errorMessage } = useAuthStore();

  const { formState: formLoginState, onInputChange: onLoginInputChange } =
    useForm(loginFormFields);
  const {
    formState: formRegisterState,
    onInputChange: onRegisterChange,
    isFormValid,
  } = useForm(registerFormFields, formRegisterValidations);

  const isCheckingAuthentication: boolean = useMemo(
    () => status === "checking",
    [status]
  );

  const loginSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Enviamos el usuario y password al hook
    startLogin({
      email: formLoginState.loginEmail,
      password: formLoginState.loginPassword,
    });
  };

  const registerSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // En caso algun input este mal
    if (!isFormValid) {
      Swal.fire("Error en el registro", "Revise los campos llenados", "error");
      return;
    }
    // La contraseña y la repetecion deben ser iguales
    if (
      formRegisterState.registerPassword !== formRegisterState.registerPassword2
    ) {
      Swal.fire("Error en el registro", "Contraseñas no son iguales", "error");
      return;
    }
    //
    // console.log(formRegisterState);
    startRegister({
      name: formRegisterState.registerName,
      email: formRegisterState.registerEmail,
      password: formRegisterState.registerPassword,
    });
  };

  useEffect(() => {
    console.log("errorMessage", errorMessage);
    if (errorMessage !== null) {
      Swal.fire("Error en la autenticación", errorMessage, "error");
    }
  }, [errorMessage]);
  // console.log("isCheckingAuthentication", isCheckingAuthentication);
  // console.log("isFormValid", isFormValid);
  
  return (
    <Container className={css["login-container"]}>
      <Row>
        <Col md={6} className={css["login-form-1"]}>
          <h3>Ingreso</h3>
          <Form onSubmit={loginSubmit}>
            <Form.Group className="mb-2">
              <Form.Control
                type="email"
                placeholder="Correo"
                name="loginEmail"
                value={formLoginState.loginEmail as string}
                onChange={onLoginInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                type="password"
                placeholder="Contraseña"
                name="loginPassword"
                value={formLoginState.loginPassword as string}
                onChange={onLoginInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                type="submit"
                className={css["btnSubmit"]}
                value="Login"
              />
            </Form.Group>
          </Form>
        </Col>

        <Col md={6} className={css["login-form-2"]}>
          <h3>Registro</h3>
          <Form onSubmit={registerSubmit}>
            <Form.Group className="mb-2">
              <Form.Control
                type="text"
                placeholder="Nombre"
                name="registerName"
                value={formRegisterState.registerName as string}
                onChange={onRegisterChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                type="email"
                placeholder="Correo"
                name="registerEmail"
                value={formRegisterState.registerEmail as string}
                onChange={onRegisterChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                type="password"
                placeholder="Contraseña"
                name="registerPassword"
                value={formRegisterState.registerPassword as string}
                onChange={onRegisterChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                type="password"
                placeholder="Repita la contraseña"
                name="registerPassword2"
                value={formRegisterState.registerPassword2 as string}
                onChange={onRegisterChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Control
                type="submit"
                className={css["btnSubmit"]}
                value="Crear cuenta"
                // disabled={isCheckingAuthentication || !isFormValid}
                disabled={!isFormValid}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
