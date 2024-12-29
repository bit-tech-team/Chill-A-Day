import { Form, Icon } from "semantic-ui-react";
import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

import { PrimaryButton } from "../PrimaryButton";

import { initialValues, validationSchema } from "./LoginForm.data";
import { BackendClient } from "../../utils/backendClient";

import useAuth from "../../hooks/useAuth";

import "./loginForm.scss";

export const LoginForm = (props) => {
  const { openRegister, goBack } = props;
  const { setAuth, updateToken } = useAuth();

  const client = new BackendClient();
  const [showPassword, setShowPassword] = useState(false);

  const onShowHidenPassword = () => setShowPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { data } = await client.post("/api/users/login", formValue);
        updateToken(data.token);
        setAuth(data);
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          const { msg } = error.response.data;
          toast.error(msg);
        } else {
          toast.error("Ha ocurrido un error inesperado");
        }
      }
    },
  });

  return (
    <div className="login-form">
      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          name="email"
          type="text"
          placeholder="Email"
          icon="mail outline"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Form.Input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          icon={
            <Icon
              name={showPassword ? "eye slash" : "eye"}
              link
              onClick={onShowHidenPassword}
            />
          }
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}
        />
        <div className="w-full flex justify-center">
          <PrimaryButton type="submit" text="Iniciar Sesión"></PrimaryButton>
        </div>
      </Form>

      <div className="login-form__options">
        <p onClick={goBack}>Volver</p>
        <p>
          ¿No tienes cuenta? <span onClick={openRegister}>Regístrarse</span>
        </p>
      </div>
    </div>
  );
};
