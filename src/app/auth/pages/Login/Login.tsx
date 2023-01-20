import { Container, Row, Col, Form } from "react-bootstrap";
import css from "./Login.module.scss";
import { IinitialForm } from "@/app/auth/domain";
import { useAuthStore, useForm } from "@/shared/hooks";

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

export const Login = () => {
  const { startLogin } = useAuthStore();

  const { formState: formLoginState, onInputChange: onLoginInputChange } =
    useForm(loginFormFields);
  const { formState: formRegisterState, onInputChange: onRegisterChange } =
    useForm(registerFormFields);

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
    console.log(formRegisterState);
  };

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
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
