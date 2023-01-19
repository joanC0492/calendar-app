import { Container, Row, Col, Form } from "react-bootstrap";
import css from "./Login.module.scss";

export const Login = () => {
  const handleFormLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <Container className={css["login-container"]}>
      <Row>
        <Col md={6} className={css["login-form-1"]}>
          <h3>Ingreso</h3>
          <Form onSubmit={handleFormLogin}>
            <Form.Group className="mb-2">
              <Form.Control type="email" placeholder="Correo" required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control type="password" placeholder="Contraseña" required />
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
          <Form>
            <Form.Group className="mb-2">
              <Form.Control type="text" placeholder="Nombre" required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control type="email" placeholder="Correo" required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control type="password" placeholder="Contraseña" required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                type="password"
                placeholder="Repita la contraseña"
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
